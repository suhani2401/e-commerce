import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils";
import { CartRepository } from "../repositories/cart.repository";
import Products from "../models/products.model";

export class CartController {
    private cartRepo = new CartRepository();

    addToCart = async (req: Request, res: Response) => {
        try {
            const user_id = req.user?.id;
            const { product_id, quantity } = req.body;
            const product = await Products.findByPk(product_id);
            if (product.stock < quantity) {
                return successResponse(res, "Product out of stock", {}, 400);
            }
            const cart = await this.cartRepo.addToCart(user_id, product_id, quantity);
            return successResponse(res, "Product added to cart successfully", cart, 200);
        } catch (error) {
            return errorResponse(res, `Something went wrong! ${error}`, 500)
        }
    };

    listCart = async (req: Request, res: Response) => {
        try {
            const user_id = req.user?.id;
            const cartList = await this.cartRepo.listCart(user_id);
            return successResponse(res, "Cart Listed Successfully", cartList, 200);
        } catch (error) {
            return errorResponse(res, `Something went wrong! ${error}`, 500)
        }
    };

    removeFromCart = async (req: Request, res: Response) => {
        try {
            const { cart_item_id } = req.params;
            const response = await this.cartRepo.removeCartItem(String(cart_item_id))
            return successResponse(res, "Item removed from Cart Successfully", response, 200);
        } catch (error) {
            return errorResponse(res, `Something went wrong! ${error}`, 500)
        }
    }

    updateCartItemQuantity = async (req: Request, res: Response) => {
        try {
            const response = await this.cartRepo.updateCartItemQuantity(req.body)
            return successResponse(res, "Cart item quantity updated Successfully", response, 200);
        } catch (error) {
            return errorResponse(res, `Something went wrong! ${error}`, 500)
        }
    }
}