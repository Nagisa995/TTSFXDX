//@ts-nocheck
import Web3 from "web3";
import { contractABI, contractAddress } from "../helpers/const";
import { convertNumber, isCorrectNetwork } from "../helpers/utils";
import {
  orderReducerSlice,
  ORDER_EXECUTION_STAGE,
} from "../store/reducers/order_reducer";
import { walletReducerSlice } from "../store/reducers/wallet-reducer";
import { AppDispatch } from "../store/store";

export const web3WalletConnect = () => (dispatch: AppDispatch) => {
  const provider = window.ethereum;

  if (typeof provider !== "undefined") {
    const web3 = new Web3(provider);

    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        web3.eth.net.getNetworkType().then((network) => {
          const isNetworkCorrect = isCorrectNetwork(network);

          if (isNetworkCorrect) {
            dispatch(walletReducerSlice.actions.walletConnection(accounts[0]));

            window.ethereum.on("accountChanged", function (accounts) {
              dispatch(
                walletReducerSlice.actions.walletConnection(accounts[0])
              );
            });
          } else {
            dispatch(walletReducerSlice.actions.networkCheck());
          }
        });
      })
      .catch((error) => console.log(error));
  }
};

export const web3CompleteOrder =
  (tokenA, tokenB, amountA, amountB, wallet, matchingOrders, isMarketType) =>
  (dispatch: AppDispatch) => {
    const provider = window.ethereum;
    const isMatchingOrdersNotEmpty = matchingOrders.length !== 0;

    if (typeof provider !== "undefined") {
      const web3 = new Web3(provider);
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      web3.eth.net.getNetworkType().then((network) => {
        const isNetworkCorrect = isCorrectNetwork(network);

        if (isNetworkCorrect) {
          if (isMatchingOrdersNotEmpty) {
            contract.methods
              .matchOrders(
                matchingOrders,
                tokenA,
                tokenB,
                web3.utils.toBN(convertNumber(amountA)),
                web3.utils.toBN(convertNumber(amountB)),
                isMarketType
              )
              .send({ from: wallet })
              .then((data) => {
                dispatch(
                  orderReducerSlice.actions.orderStageChange(
                    ORDER_EXECUTION_STAGE.ORDER_ISSUED
                  )
                );
              })
              .catch((error) => {
                dispatch(
                  orderReducerSlice.actions.orderStageChange(
                    ORDER_EXECUTION_STAGE.DATA_COLLECTION
                  )
                );
              });
          } else {
            contract.methods
              .createOrder(
                tokenA,
                tokenB,
                web3.utils.toBN(convertNumber(amountA)),
                web3.utils.toBN(convertNumber(amountB))
              )
              .send({ from: wallet })
              .then((data) => {
                dispatch(
                  orderReducerSlice.actions.orderStageChange(
                    ORDER_EXECUTION_STAGE.ORDER_ISSUED
                  )
                );
              })
              .catch((error) => {
                dispatch(
                  orderReducerSlice.actions.orderStageChange(
                    ORDER_EXECUTION_STAGE.DATA_COLLECTION
                  )
                );
              });
          }

          dispatch(
            orderReducerSlice.actions.orderStageChange(
              ORDER_EXECUTION_STAGE.TRANSACTION_PROGRESS
            )
          );
        } else {
          dispatch(
            orderReducerSlice.actions.orderStageChange(
              ORDER_EXECUTION_STAGE.DATA_COLLECTION
            )
          );
          dispatch(walletReducerSlice.actions.networkCheck());
        }
      });
    }
  };
