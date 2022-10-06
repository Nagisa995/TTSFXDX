import { FC, useEffect, useState } from "react";
import Web3 from "web3";
import { contractABI, contractAddress } from "../../../../../../helpers/const";
import {
  calculationExpectedPrice,
  isAllDataValid,
  isAmountAndPriceValid,
  isTokenValid,
} from "../../../../../../helpers/utils";
import { useAppSelector } from "../../../../../../hooks/redux";
import { defaultWalletData } from "../../../../../../store/reducers/wallet-reducer";
import { CustomInput } from "../../../../../../ui_elements/custom_input/custom_input";
import "./style/order_data_form_style.css";

export const OrderDataForm: FC = () => {
  const { wallet } = useAppSelector((state) => state.walletReducer);
  const [web3, setWeb3] = useState();
  const [contract, setContract] = useState();

  const [tokenA, setTokenA] = useState("");
  const [tokenB, setTokenB] = useState("");
  const [amountA, setAmountA] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const isWalletConnected = wallet !== defaultWalletData.wallet;

  useEffect(() => {
    if (isAllDataValid(tokenA, tokenB, amountA, limitPrice)) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [tokenA, tokenB, amountA, limitPrice]);

  useEffect(() => {
    //@ts-ignore
    const web3 = new Web3(window.ethereum);
    //@ts-ignore
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    //@ts-ignore
    setWeb3(web3);
    //@ts-ignore
    setContract(contract);
  }, [wallet]);

  return (
    <form
      className="order_creation_data_form"
      onSubmit={(e) => {
        e.preventDefault();
        if (isFormValid) {
          console.log("waiting back");
        }
      }}
    >
      <div className="order_creation_data_form_tokens">
        <CustomInput
          placeholder="Token A smart contract address"
          value={tokenA}
          onChange={setTokenA}
          isValid={isTokenValid(tokenA)}
        />
        <CustomInput
          placeholder="Token B smart contract address"
          value={tokenB}
          onChange={setTokenB}
          isValid={isTokenValid(tokenB)}
        />
      </div>

      <div className="order_creation_data_form_info">
        <CustomInput
          placeholder="Token A amount"
          value={amountA}
          onChange={setAmountA}
          isValid={isAmountAndPriceValid(amountA)}
        />
        <CustomInput
          placeholder="Limit price (in Token B)"
          value={limitPrice}
          onChange={setLimitPrice}
          isValid={isAmountAndPriceValid(limitPrice)}
        />
      </div>

      <div className="order_creation_data_form_price">
        <div
          className={
            "order_creation_data_form_price_container" +
            (isFormValid ? " valid_data" : "")
          }
        >
          <div>Expected order price</div>
          {isFormValid && (
            <div className="calculation">
              {calculationExpectedPrice(amountA, limitPrice)}
            </div>
          )}
        </div>
      </div>

      <button
        className={`order_creation_data_form_submit ${
          isFormValid && isWalletConnected ? "active" : ""
        }`}
      >
        Place the order
      </button>
    </form>
  );
};
