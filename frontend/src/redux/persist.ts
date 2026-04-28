import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { rootReducer } from "./reducers/root.reducers";

const persistConfig = {
  key: "root",
  storage: storage.default,
};

export const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);