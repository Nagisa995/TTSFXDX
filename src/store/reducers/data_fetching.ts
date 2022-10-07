import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrderData } from "../../api/order_api";

interface IFetchingData {
  isFetchingMatchingOrders: boolean;
  matchingOrders: string[];
  tokensOrderInfo: IOrderData[];
}

export const defaultFetchingData: IFetchingData = {
  isFetchingMatchingOrders: false,
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
    saveMatchingOrders(state, action: PayloadAction<string[]>) {
      state.matchingOrders = action.payload;
    },
    saveTokensOrderInfo(state, action: PayloadAction<IOrderData[]>) {
      state.tokensOrderInfo = action.payload;
    },
  },
});

export default dataFetchingReducerSlice.reducer;
