import { correctNetwork, fee } from "./const";

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
