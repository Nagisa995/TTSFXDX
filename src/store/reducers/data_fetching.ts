import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrderData } from "../../api/order_api";

export enum ORDER_FETCHING {
  NOT_LOADED = "Not loaded",
  FETCHING = "Fetching",
  LOADED = "Loaded",
}

interface IFetchingData {
  isFetchingMatchingOrders: boolean;
  orderInfoFetchingStatus: ORDER_FETCHING;
  matchingOrders: string[];
  tokensOrderInfo: IOrderData[];
}

export const defaultFetchingData: IFetchingData = {
  isFetchingMatchingOrders: false,
  orderInfoFetchingStatus: ORDER_FETCHING.NOT_LOADED,
  matchingOrders: [],
  tokensOrderInfo: [],
};

export const dataFetchingReducerSlice = createSlice({
  name: "fetchingData",
  initialState: defaultFetchingData,
  reducers: {
    changeDataFetchingStatus(state) {
      state.isFetchingMatchingOrders = !state.isFetchingMatchingOrders;
    },
    changeOrderInfoFetchingStatus(
      state,
      action: PayloadAction<ORDER_FETCHING>
    ) {
      state.orderInfoFetchingStatus = action.payload;
    },
    saveMatchingOrders(state, action: PayloadAction<string[]>) {
      state.matchingOrders = action.payload;
    },
    saveTokensOrderInfo(state, action: PayloadAction<IOrderData[]>) {
      state.tokensOrderInfo = action.payload;
      state.orderInfoFetchingStatus = ORDER_FETCHING.LOADED;
    },
  },
});

export default dataFetchingReducerSlice.reducer;
