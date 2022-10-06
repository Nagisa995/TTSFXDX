import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ORDER_TYPE {
  LIMIT = "Limit",
  MARKET = "Market",
}

export enum ORDER_OPERATION {
  BUY = "Buy",
  SELL = "Sell",
}

interface IOrderData {
  type: ORDER_TYPE;
  operation: ORDER_OPERATION;
}

export const defaultOrderData: IOrderData = {
  type: ORDER_TYPE.LIMIT,
  operation: ORDER_OPERATION.BUY,
};

export const orderReducerSlice = createSlice({
  name: "orderData",
  initialState: defaultOrderData,
  reducers: {
    orderTypeChange(state, action: PayloadAction<ORDER_TYPE>) {
      state.type = action.payload;
    },
    orderOperationChange(state, action: PayloadAction<ORDER_OPERATION>) {
      state.operation = action.payload;
    },
  },
});

export default orderReducerSlice.reducer;
