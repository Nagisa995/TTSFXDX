import axios from "axios";
import {
  getMatchingOrdersURL,
  getMyOrdersURL,
  getOrdersInfoURL,
  isDataNotEmpty,
} from "../helpers/utils";
import {
  dataFetchingReducerSlice,
  ORDER_FETCHING,
} from "../store/reducers/data_fetching";
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

export const getMyOrdersInfo =
  (wallet: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(dataFetchingReducerSlice.actions.changeMyOrdersFetchingStatus());

      const myOrdersInfo = await axios.get<IOrderData[]>(
        getMyOrdersURL(wallet)
      );

      dispatch(
        dataFetchingReducerSlice.actions.saveMyOrdersInfo(myOrdersInfo.data)
      );
    } catch (error) {
      dispatch(dataFetchingReducerSlice.actions.saveMyOrdersInfo([]));
    }
  };

export const getOrdersInfo =
  (tokenA: string, tokenB: string, operation: ORDER_OPERATION) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(
        dataFetchingReducerSlice.actions.changeOrderInfoFetchingStatus(
          ORDER_FETCHING.FETCHING
        )
      );

      const ordersInfo = await axios.get<IOrderData[]>(
        getOrdersInfoURL(tokenA, tokenB, operation)
      );

      dispatch(
        dataFetchingReducerSlice.actions.saveTokensOrderInfo(ordersInfo.data)
      );
    } catch (error) {
      dispatch(dataFetchingReducerSlice.actions.saveTokensOrderInfo([]));
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

      dispatch(
        dataFetchingReducerSlice.actions.saveMatchingOrders(matchingOrders.data)
      );

      const haveMatchingOrders = isDataNotEmpty(matchingOrders.data);

      if (haveMatchingOrders) {
        const ordersInfo = await axios.get<IOrderData[]>(
          getOrdersInfoURL(tokenA, tokenB, operation)
        );

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
