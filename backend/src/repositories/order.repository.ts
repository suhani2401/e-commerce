import db from "../models";
import { BaseRepository } from "./base.repository";
import { OrderAttributesType, RequiredOrderAttributesType } from "../models/types/order.types";
import Order from "../models/order.model";
import { User } from "../models/users.model";
import { CartRepository } from "./cart.repository";
import { stripe } from "../utils";
import CartItem from "../models/cart_items.model";
import { FRONTEND_URL, WEBHOOK_ENDPOINT_SECRET_KEY } from "../config";
import { OrderItem, Transaction } from "sequelize";
import OrderedItems from "../models/order_items.model";
import Products from "../models/products.model";
import Payment from "../models/payment.model";
import { RequiredOrderItemsAttributesType } from "../models/types/order_items.types";
import { RequiredPaymentAttributesType } from "../models/types/payment.types";

export class OrderRepository extends BaseRepository<Order, OrderAttributesType, RequiredOrderAttributesType> {
    private cartRepo = new CartRepository();
    constructor() {
        super(Order);
    }

    async addOrder(
        orderDetail: RequiredOrderAttributesType,
        options?: { transaction: Transaction }
    ): Promise<Order> {
        try {
            return await this.create(orderDetail, options);
        } catch (error) {
            throw new Error(`Failed to add order: ${error}`);
        }
    }

    async addOrderItems(
        items: RequiredOrderItemsAttributesType,
        options?: { transaction: Transaction }
    ): Promise<OrderedItems> {
        try {
            return await OrderedItems.create(items, options);
        } catch (error) {
            throw new Error(`Failed to add order items: ${error}`);
        }
    }

    async addPayment(
        paymentDetail: RequiredPaymentAttributesType,
        options?: { transaction: Transaction }
    ): Promise<Payment> {
        try {
            return await Payment.create(paymentDetail, options);
        } catch (error) {
            throw new Error(`Failed to add payment: ${error}`);
        }
    }

    async listOrders(user_id: string) {
        try {
            return await this.findAll({
                where: { user_id },
                include: [
                    {
                        model: OrderedItems,
                        include: [{ model: Products, required: false }],
                    },
                ],
            });
        } catch (error) {
            throw new Error(`Failed to list orders: ${error}`);
        }
    }

    async viewAllOrders() {
        try {
            return await this.findAll({
                include: [
                    {
                        model: OrderedItems,
                        include: [{ model: Products, required: false }],
                    },
                    {
                        model: User,
                    }
                ],
            });
        } catch (error) {
            throw new Error(`Failed to list orders: ${error}`);
        }
    }

    async handleCheckout(user: User) {
        try {
            const cart = await this.cartRepo.listCart(user.id);
            return await stripe.checkout.sessions.create({
                submit_type: "pay",
                mode: "payment",
                billing_address_collection: "auto",
                shipping_options: [{ shipping_rate: "shr_1RvBYrR3Fm5NQV5LkOd6unUz" }],
                customer_email: user.email,
                metadata: {
                    userId: user.id!,
                    cartId: cart[0].id,
                },
                line_items: cart[0].cart_items.map((item: CartItem) => {
                    return {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: item.product.name,
                                images: [item.product.image],
                                metadata: {
                                    productId: item.product_id,
                                },
                            },
                            unit_amount: Math.round(item.product.price * 100),
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.quantity,
                    };
                }),
                success_url: `${FRONTEND_URL}/orders`,
                cancel_url: `${FRONTEND_URL}/cancel`,
            });
        } catch (error) {
            throw new Error(`Handle checkout has an Error: ${error}`);
        }
    }

    async handleWebHook(data: any) {
        const t = await db.sequelize.transaction();
        try {
            const endpointSecret = WEBHOOK_ENDPOINT_SECRET_KEY!;
            const header = stripe.webhooks.generateTestHeaderString({
                payload: JSON.stringify(data),
                secret: endpointSecret,
            });
            let event;
            try {
                event = stripe.webhooks.constructEvent(
                    JSON.stringify(data),
                    header,
                    endpointSecret
                );
            } catch (error) {
                console.log("⚠️ Webhook signature verification failed:", error);
            }
            console.log(event?.type, "event type")
            if (event?.type === "checkout.session.completed") {
                const session = event.data.object;
                const shipping_cost = await stripe.shippingRates.retrieve(
                    session.shipping_options[0].shipping_rate as string
                );
                const order: RequiredOrderAttributesType = {
                    user_id: session.metadata?.userId,
                    final_price: session.amount_total,
                    shipping_cost: shipping_cost.fixed_amount!.amount,
                };
                const newOrder = await this.addOrder(order, {
                    transaction: t,
                });

                const product_data = await stripe.checkout.sessions.listLineItems(
                    session.id
                );
                const orderItem: RequiredOrderItemsAttributesType[] = [];
                for (const item of product_data.data) {
                    const p = await stripe.products.retrieve(
                        item.price?.product as string
                    );
                    orderItem.push({
                        order_id: newOrder.id,
                        product_id: p.metadata.productId,
                        quantity: item.quantity,
                    });
                }

                for (const item of orderItem) {
                    await this.addOrderItems(item, { transaction: t });
                }

                const payment: RequiredPaymentAttributesType = {
                    transaction_id: session.payment_intent as string,
                    charge_id: session.id,
                    amount: session.amount_total,
                    payable_id: newOrder.id,
                    status: session.payment_status === "paid" ? "completed" : "pending",
                };
                await this.addPayment(payment, { transaction: t });

                const cart_id = session.metadata?.cartId as string;
                await this.cartRepo.removeCartItems(cart_id, t);
                await this.cartRepo.removeCart(cart_id, t);
                await t.commit();

                return newOrder;
            } else {
                console.log(`Unhandled event type: ${event?.type}`);
                await t.rollback();

            }
        } catch (error) {
            await t.rollback();
            throw new Error(`Webhook has an Error: ${error}`);
        }
    }
}