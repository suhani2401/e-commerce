import persistReducer from "redux-persist/es/persistReducer";
import { rootReducer } from "./reducers/root.reducers";
import storage from "./storage";

const persistConfig = {
  key: "e-commerce",
  storage,
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
