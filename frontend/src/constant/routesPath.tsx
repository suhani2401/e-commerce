import { lazy } from "react";

const Register = lazy(() => import("../pages/Registration"));
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Cart = lazy(() => import("../pages/Cart"));
const Orders = lazy(() => import("../pages/Orders"));
const Cancel = lazy(() => import("../pages/Cancel"));

export type RoutesType = {
  [key in
  | "LOGIN"
  | "REGISTER"
  | "DASHBOARD"
  | "CART"
  | "ORDERS"
  | "CANCEL"
  ]: {
    path: string;
    isPrivate?: boolean;
    element: React.ComponentType;
    roles?: string[];
  };
};

export const ROUTES: RoutesType = {
  LOGIN: {
    path: "/login",
    isPrivate: false,
    element: Login,
  },
  REGISTER: {
    path: "/register",
    isPrivate: false,
    element: Register,
  },
  DASHBOARD: {
    path: "/",
    isPrivate: true,
    element: Dashboard,
    roles: ['user']
  },
  CART: {
    path: "/cart",
    isPrivate: true,
    element: Cart,
    roles: ['user']
  },
  ORDERS: {
    path: "/orders",
    isPrivate: true,
    element: Orders,
    roles: ['user']
  },
  CANCEL: {
    path: "/cancel",
    isPrivate: true,
    element: Cancel,
    roles: ['user']
  },
};
