import { IOrderData } from "../api/order_api";
import { ORDER_OPERATION, ORDER_TYPE } from "../store/reducers/order_reducer";
import { defaultWalletData } from "../store/reducers/wallet-reducer";
import { backendURL, correctNetwork, fee } from "./const";

export const walletConnected = (wallet: string): boolean => {
  return wallet !== defaultWalletData.wallet;
};

export const isDataNotEmpty = (array: any[]): boolean => {
  return array.length !== 0;
};

export const getMyOrdersURL = (user: string): string => {
  return backendURL + `/getOrders?user=${user}`;
};

export const getOpacityValue = (index: number): number => {
  return 1 - 0.2 * index;
};

export const getWidthValue = (index: number): number => {
  return 80 - 15 * index;
};

export const sortedOrders = (
  orders: IOrderData[],
  isOperationBuy: boolean
): IOrderData[] => {
  return orders
    .slice()
    .sort((orderA: IOrderData, orderB: IOrderData) =>
      sorted(orderA, orderB, isOperationBuy)
    )
    .slice(0, 5);
};

const sorted = (
  orderA: IOrderData,
  orderB: IOrderData,
  isOperationBuy: boolean
): number => {
  const ethA = isOperationBuy ? orderA.amountB : orderA.amountA;
  const ethB = isOperationBuy ? orderB.amountB : orderB.amountA;

  return +ethA - +ethB;
};

export const getOrdersInfoURL = (
  tokenA: string,
  tokenB: string,
  operation: string
): string => {
  const isBuyOperation = operation === ORDER_OPERATION.BUY;

  if (isBuyOperation) {
    return backendURL + `/getOrders?tokenA=${tokenB}&tokenB=${tokenA}`;
  } else {
    return backendURL + `/getOrders?tokenA=${tokenA}&tokenB=${tokenB}`;
  }
};

export const getMatchingOrdersURL = (
  tokenA: string,
  tokenB: string,
  amountA: string,
  amountB: string,
  operation: ORDER_OPERATION,
  orderType: ORDER_TYPE
): string => {
  const isBuyOperation = operation === ORDER_OPERATION.BUY;
  const isMarket = orderType === ORDER_TYPE.MARKET;
  const expectedPrice = +amountB * +amountA;

  if (isBuyOperation) {
    return `${backendURL}/getMatchingOrders?tokenA=${tokenA}&tokenB=${tokenB}&amountA=${convertNumber(
      amountA
    )}&amountB=${convertNumber(expectedPrice)}&isMarket=${isMarket}`;
  } else {
    return `${backendURL}/getMatchingOrders?tokenA=${tokenB}&tokenB=${tokenA}&amountA=${convertNumber(
      expectedPrice
    )}&amountB=${convertNumber(amountA)}&isMarket=${isMarket}`;
  }
};

export const getNumber = (number: string): number => {
  return +number / Math.pow(10, 18);
};

export const convertNumber = (number: string | number): number => {
  return +number * Math.pow(10, 18);
};

export const isTokenValid = (token: string): boolean => {
  return token.length >= 42;
};

export const isAmountAndPriceValid = (value: string): boolean => {
  return +value > 0;
};

export const isAllDataValid = (
  tokenA: string,
  tokenB: string,
  amountA: string,
  limitPrice: string
): boolean => {
  return (
    isTokenValid(tokenA) &&
    isTokenValid(tokenB) &&
    isAmountAndPriceValid(amountA) &&
    isAmountAndPriceValid(limitPrice)
  );
};

export const calculationExpectedPrice = (
  amountA: string,
  limitPrice: string
): string => {
  const expectedPrice = +amountA * +limitPrice;
  return `${expectedPrice} Token B (including fee ${fee}%)`;
};

export const hidingPart = (text: string): string => {
  const rebuildText = text.slice(0, 10) + "..." + text.slice(-4);
  return rebuildText;
};

export const isCorrectNetwork = (currentNetwork: string): boolean => {
  return currentNetwork === correctNetwork;
};
