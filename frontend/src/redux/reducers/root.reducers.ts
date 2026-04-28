import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth.slice";
import cartReducer from "./cart.slice";

export const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});