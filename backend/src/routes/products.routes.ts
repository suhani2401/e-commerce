import { Router } from "express";
import { ProductController } from "../controlers/products.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validation } from "../middlewares/validation.middleware";
import { createProductSchema, updateProductStockSchema } from "../validations/products.middleware";

export class ProductRoutes {
  public router = Router();
  public path = '/products'
  private controller = new ProductController();

  constructor() {
    this.init();
  }

  private init() {
    this.router.get(`${this.path}/list`, authMiddleware, this.controller.getProducts);
    this.router.post(`${this.path}/add`, authMiddleware, validation(createProductSchema), this.controller.createProduct);
    this.router.patch(`${this.path}/update-stock`, authMiddleware, validation(updateProductStockSchema), this.controller.updateStock)
  }
}