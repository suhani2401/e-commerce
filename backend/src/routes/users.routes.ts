import { Router } from "express";
import { UsersController } from "../controlers/users.controller";
import { validation } from "../middlewares/validation.middleware";
import { loginSchema, registerSchema } from "../validations/users.validation";

export class UserRoutes {
  public router = Router();
  public path = '/auth'
  private controller = new UsersController();

  constructor() {
    this.init();
  }

  private init() {
    this.router.post(`${this.path}/login`, validation(loginSchema), this.controller.login);
    this.router.post(`${this.path}/register`, validation(registerSchema), this.controller.register);
  }
}