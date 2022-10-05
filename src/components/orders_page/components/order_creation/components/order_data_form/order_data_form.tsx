import { FC, useEffect, useState } from "react";
import Web3 from "web3";
import { contractABI, contractAddress } from "../../../../../../helpers/const";
import { useAppSelector } from "../../../../../../hooks/redux";
import { CustomInput } from "../../../../../../ui_elements/custom_input/custom_input";
import "./style/order_data_form_style.css";

export const OrderDataForm: FC = () => {
  const { wallet } = useAppSelector((state) => state.walletReducer);
  const [web3, setWeb3] = useState();
  const [contract, setContract] = useState();

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

  console.log(web3, contract);

  return (
    <form className="order_creation_data_form">
      <div className="order_creation_data_form_tokens">
        <CustomInput placeholder="Token A smart contract address" />
        <CustomInput placeholder="Token B smart contract address" />
      </div>

      <div className="order_creation_data_form_info">
        <CustomInput placeholder="Token A amount" />
        <CustomInput placeholder="Limit price (in Token B)" />
      </div>

      <div className="order_creation_data_form_price">
        <div className="order_creation_data_form_price_container">
          <CustomInput placeholder="Expected order price" />
        </div>
      </div>

      <button className="order_creation_data_form_submit">
        Place the order
      </button>
    </form>
  );
};
