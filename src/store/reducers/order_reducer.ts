import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ORDER_TYPE {
  LIMIT = "Limit",
  MARKET = "Market",
}

export enum ORDER_OPERATION {
  BUY = "Buy",
  SELL = "Sell",
}

export enum ORDER_EXECUTION_STAGE {
  DATA_COLLECTION = "Collection",
  EXECUTION_ORDER = "Execution",
  ORDER_ISSUED = "Issued",
}

interface IOrderData {
  type: ORDER_TYPE;
  operation: ORDER_OPERATION;
  stage: ORDER_EXECUTION_STAGE;
}

export const defaultOrderData: IOrderData = {
  type: ORDER_TYPE.LIMIT,
  operation: ORDER_OPERATION.BUY,
  stage: ORDER_EXECUTION_STAGE.DATA_COLLECTION,
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
    orderStageChange(state, action: PayloadAction<ORDER_EXECUTION_STAGE>) {
      state.stage = action.payload;
    },
  },
});

export default orderReducerSlice.reducer;
