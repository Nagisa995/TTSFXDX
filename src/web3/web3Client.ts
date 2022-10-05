//@ts-nocheck
import Web3 from "web3";
import { isCorrectNetwork } from "../helpers/utils";
import { walletReducerSlice } from "../store/reducers/wallet-reducer";
import { AppDispatch } from "../store/store";

export const web3Init = () => (dispatch: AppDispatch) => {
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
            return;
          }
        });
      })
      .catch((error) => console.log(error));
  }
};
