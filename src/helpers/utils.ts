import { correctNetwork } from "./const";

export const hidingPart = (text: string): string => {
  const rebuildText = text.slice(0, 10) + "..." + text.slice(-4);
  return rebuildText;
};

export const isCorrectNetwork = (currentNetwork: string): boolean => {
  return currentNetwork === correctNetwork;
};
