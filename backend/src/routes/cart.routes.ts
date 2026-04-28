import { Router } from "express";
import { validation } from "../middlewares/validation.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { CartController } from "../controlers/cart.controller";
import { addToCartSchema, removeFromCartSchema, updateQuantitySchema } from "../validations/cart.validation";

export class CartRoutes {
  public router = Router();
  public path = '/cart'
  private controller = new CartController();

  constructor() {
    this.init();
  }

  private init() {
    this.router.get(`${this.path}/list`, authMiddleware, this.controller.listCart);
    this.router.post(`${this.path}/add-to-cart`, authMiddleware, validation(addToCartSchema), this.controller.addToCart);
    this.router.delete(`${this.path}/remove-from-cart/:cart_item_id/`, authMiddleware, validation(removeFromCartSchema, 'params'), this.controller.removeFromCart);
    this.router.patch(`${this.path}/update-quantity`, authMiddleware, validation(updateQuantitySchema), this.controller.updateCartItemQuantity)
  }
}