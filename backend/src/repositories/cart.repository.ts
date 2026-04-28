import { Transaction } from "sequelize";
import db from "../models";
import Cart from "../models/cart.model";
import CartItem from "../models/cart_items.model";
import Products from "../models/products.model";
import { CartAttributesType, RequiredCartAttributesType } from "../models/types/cart.types";
import { BaseRepository } from "./base.repository";

export class CartRepository extends BaseRepository<Cart, CartAttributesType, RequiredCartAttributesType> {
    constructor() {
        super(Cart);
    }
    async addToCart(user_id: string, product_id: string, quantity: number): Promise<Cart> {
        const transaction = await db.sequelize.transaction();
        try {
            const isCartExistForUser = await this.findOne({ where: { user_id } });
            if (!isCartExistForUser) {
                const cart = await this.create({ user_id }, { transaction });
                await CartItem.create({ cart_id: cart.id, product_id, quantity }, { transaction });

                await transaction.commit();
                return await this.findById(cart.id);
            }
            await CartItem.create({ cart_id: isCartExistForUser.id, product_id, quantity }, { transaction });
            await transaction.commit();
            return await this.findById(isCartExistForUser.id);
        } catch (error) {
            await transaction.rollback();
            throw new Error(`Add to cart proccess failed: ${error}`);
        }
    }

    async listCart(user_id: string): Promise<Cart[]> {
        try {
            return await this.findAll({
                where: { user_id },
                include: [
                    {
                        model: CartItem,
                        include: [{ model: Products, required: false }],
                    },
                ],
            });
        } catch (error) {
            throw new Error(`Failed to list Cart: ${error}`);
        }
    }

    // Remove all items in a cart (used after checkout)
    async removeCartItems(cart_id: string, transaction?: Transaction): Promise<number> {
        try {
            return await CartItem.destroy({
                where: { cart_id },
                transaction,        // must be inside the transaction
            });
        } catch (error) {
            throw new Error(`Failed to remove cart items: ${error}`);
        }
    }

    // Remove single item (used in remove-from-cart route)
    async removeCartItem(cart_item_id: string): Promise<number> {
        try {
            const cartItem = await CartItem.findByPk(cart_item_id);

            if (!cartItem) throw new Error("Cart item not found");

            return await CartItem.destroy({
                where: { id: cartItem.id }
            });
        } catch (error) {
            throw new Error(`Failed to remove cart: ${error}`);
        }
    }

    // Remove cart itself
    async removeCart(
        cart_id: string,
        transaction?: Transaction
    ): Promise<number> {
        try {
            return await this.delete({
                where: { id: cart_id },
                transaction,
            });
        } catch (error) {
            throw new Error(`Failed to remove cart: ${error}`);
        }
    }

    async updateCartItemQuantity(data: { quantity: number; cart_item_id: string }) {
        try {
            const { quantity, cart_item_id } = data;
            const item = await CartItem.findOne({ where: { id: cart_item_id, deleted_at: null } });
            if (!item) throw new Error("Cart item not found");

            return await CartItem.update({ quantity }, { where: { id: cart_item_id } })
        } catch (error) {
            throw new Error(`Failed to update cart item quantity: ${error}`);
        }
    }
}