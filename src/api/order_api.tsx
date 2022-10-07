import axios from "axios";
import {
  getAllOrdersURL,
  getMatchingOrdersURL,
  getOrdersInfoURL,
} from "../helpers/utils";
import { dataFetchingReducerSlice } from "../store/reducers/data_fetching";
import {
  orderReducerSlice,
  ORDER_EXECUTION_STAGE,
  ORDER_OPERATION,
  ORDER_TYPE,
} from "../store/reducers/order_reducer";
import { AppDispatch } from "../store/store";

export interface IOrderData {
  amountA: string;
  amountB: string;
  amountLeftToFill: string;
  blockNumber: number;
  id: string;
  isCanceled: boolean;
  tokenA: string;
  tokenB: string;
  user: string;
}

export const getAllOrders = async () => {
  try {
    const orders = await axios.get<IOrderData[]>(getAllOrdersURL());
    console.log(orders.data);
  } catch (error) {
    console.log(error);
  }
};

export const getMatchingOrders =
  (
    tokenA: string,
    tokenB: string,
    amountA: string,
    amountB: string,
    operation: ORDER_OPERATION,
    orderType: ORDER_TYPE
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(dataFetchingReducerSlice.actions.changeDataFetchingStatus());

      const matchingOrders = await axios.get<string[]>(
        getMatchingOrdersURL(
          tokenA,
          tokenB,
          amountA,
          amountB,
          operation,
          orderType
        )
      );

      console.log(matchingOrders.data);

      dispatch(
        dataFetchingReducerSlice.actions.saveMatchingOrders(matchingOrders.data)
      );

      const haveMatchingOrders = matchingOrders.data.length !== 0;

      if (haveMatchingOrders) {
        const ordersInfo = await axios.get<IOrderData[]>(
          getOrdersInfoURL(tokenA, tokenB, operation)
        );

        console.log(ordersInfo.data);

        dispatch(
          dataFetchingReducerSlice.actions.saveTokensOrderInfo(ordersInfo.data)
        );
      }

      dispatch(dataFetchingReducerSlice.actions.changeDataFetchingStatus());

      dispatch(
        orderReducerSlice.actions.orderStageChange(
          ORDER_EXECUTION_STAGE.EXECUTION_ORDER
        )
      );
    } catch (error) {
      alert("Something went wrong try again later");

      dispatch(dataFetchingReducerSlice.actions.changeDataFetchingStatus());
    }
  };
