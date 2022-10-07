import { combineReducers, configureStore } from "@reduxjs/toolkit";
import walletReducer from "./reducers/wallet-reducer";
import orderReducer from "./reducers/order_reducer";
import fetchingReducer from "./reducers/data_fetching";

const rootReducer = combineReducers({
  walletReducer,
  orderReducer,
  fetchingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
