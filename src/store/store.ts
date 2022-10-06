import { combineReducers, configureStore } from "@reduxjs/toolkit";
import walletReducer from "./reducers/wallet-reducer";
import orderReducer from "./reducers/order_reducer";

const rootReducer = combineReducers({
  walletReducer,
  orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
