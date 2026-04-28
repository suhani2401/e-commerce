import { CartRoutes } from "./cart.routes";
import { OrderRoutes } from "./order.routes";
import { ProductRoutes } from "./products.routes";
import { UserRoutes } from "./users.routes";

export const routes = [
  new ProductRoutes(),
  new UserRoutes(),
  new CartRoutes(),
  new OrderRoutes()
];