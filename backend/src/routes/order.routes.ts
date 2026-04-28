import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { OrderController } from "../controlers/order.controller";
import express from "express";


export class OrderRoutes {
  public router = Router();
  public path = '/orders'
  private controller = new OrderController();

  constructor() {
    this.init();
  }

  private init() {
    this.router.post(`${this.path}/create-checkout-session`, authMiddleware, this.controller.handleCheckout);
    this.router.post(`${this.path}/webhook`, express.raw({ type: "application/json" }), this.controller.handleWebhook);
    this.router.get(`${this.path}/list`, authMiddleware, this.controller.listOrders)
  }
}