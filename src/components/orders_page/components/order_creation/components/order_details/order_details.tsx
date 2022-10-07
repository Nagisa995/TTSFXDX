import { FC, useEffect, useState } from "react";
import "./style/order_details_style.css";
//@ts-ignore
import CloseLogo from "../../../../../../source/close_icon.svg";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux";
import Web3 from "web3";
import { contractABI, contractAddress } from "../../../../../../helpers/const";
import {
  orderReducerSlice,
  ORDER_EXECUTION_STAGE,
  ORDER_OPERATION,
} from "../../../../../../store/reducers/order_reducer";
import { SizeETH } from "../../../../../../ui_elements/size_eth/size_eth";

interface IOrderDetails {
  tokenA: string;
  tokenB: string;
  amountA: string;
  limitPrice: string;
}

export const OrderDetails: FC<IOrderDetails> = ({
  tokenA,
  tokenB,
  amountA,
  limitPrice,
}) => {
  const { type, operation } = useAppSelector((state) => state.orderReducer);
  const dispatch = useAppDispatch();

  const amountB = +amountA * +limitPrice;
  const isBuyOperation = operation === ORDER_OPERATION.BUY;

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
  }, []);
  return (
    <div className="order_details">
      <div className="order_details_title">
        <h1>Order Details</h1>
        <img
          src={CloseLogo}
          alt="х"
          onClick={() => {
            dispatch(
              orderReducerSlice.actions.orderStageChange(
                ORDER_EXECUTION_STAGE.DATA_COLLECTION
              )
            );
          }}
        />
      </div>
      <div className="order_details_info">
        <div className="order_details_info_container">
          <div>Trading pair:</div>
          <div className="content">ETH/USDT</div>
        </div>
        <div className="order_details_info_container">
          <div>Order type:</div>
          <div className="content">{type}</div>
        </div>
        <div className="order_details_info_container">
          <div>Order side:</div>
          <div className="content">{operation}</div>
        </div>
        <div className="order_details_info_container">
          <div>Asset amount:</div>
          <div className="content">
            {amountA} <span>ETH</span>
          </div>
        </div>
        <div className="order_details_info_container">
          <div>Expected price:</div>
          <div className="content">
            {amountB} <span>USDT</span>
          </div>
        </div>
      </div>
      <h1>{!isBuyOperation ? ORDER_OPERATION.BUY : ORDER_OPERATION.SELL}</h1>
      <div>
        <SizeETH />
      </div>
    </div>
  );
};
