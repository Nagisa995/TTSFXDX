import { FC } from "react";
import "./style/order_details_style.css";
//@ts-ignore
import CloseLogo from "../../../../../../source/close_icon.svg";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux";
import {
  orderReducerSlice,
  ORDER_EXECUTION_STAGE,
  ORDER_OPERATION,
  ORDER_TYPE,
} from "../../../../../../store/reducers/order_reducer";
import { web3CompleteOrder } from "../../../../../../web3/web3Client";
import { OrderInformation } from "../../../../../../ui_elements/order_information/order_information";

interface IOrderDetails {
  tokenA: string;
  tokenB: string;
  amountA: string;
  limitPrice: string;
  wallet: string;
}

export const OrderDetails: FC<IOrderDetails> = ({
  tokenA,
  tokenB,
  amountA,
  limitPrice,
  wallet,
}) => {
  const { matchingOrders, tokensOrderInfo } = useAppSelector(
    (state) => state.fetchingReducer
  );
  const { type, operation } = useAppSelector((state) => state.orderReducer);
  const dispatch = useAppDispatch();

  const amountB = +amountA * +limitPrice;
  const isBuyOperation = operation === ORDER_OPERATION.BUY;
  const isMatchingOrdersNotEmpty = matchingOrders.length !== 0;
  const isMarketType = type === ORDER_TYPE.MARKET;

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

      {(isMatchingOrdersNotEmpty && (
        <OrderInformation
          ordersInformation={tokensOrderInfo}
          operation={operation}
        />
      )) || (
        <div className="default_message">
          <h1>There is no matches for your order now</h1>
        </div>
      )}

      <div
        className="order_details_button_group"
        onClick={() => {
          if (isBuyOperation) {
            dispatch(
              web3CompleteOrder(
                tokenA,
                tokenB,
                amountA,
                amountB,
                wallet,
                matchingOrders,
                isMarketType
              )
            );
          } else {
            dispatch(
              web3CompleteOrder(
                tokenB,
                tokenA,
                amountB,
                amountA,
                wallet,
                matchingOrders,
                isMarketType
              )
            );
          }
        }}
      >
        <button disabled={!isMatchingOrdersNotEmpty}>Match</button>
        <button disabled={isMatchingOrdersNotEmpty}>Place Order</button>
      </div>
    </div>
  );
};
