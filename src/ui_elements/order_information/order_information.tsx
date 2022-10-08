import { FC } from "react";
import { IOrderData } from "../../api/order_api";
import {
  getNumber,
  getOpacityValue,
  getWidthValue,
  sortedOrders,
} from "../../helpers/utils";
import { ORDER_OPERATION } from "../../store/reducers/order_reducer";
import "./style/order_information_style.css";

interface IOrderInformation {
  operation: ORDER_OPERATION;
  ordersInformation: IOrderData[];
}

export const OrderInformation: FC<IOrderInformation> = ({
  operation,
  ordersInformation,
}) => {
  const isBuyOperation = operation === ORDER_OPERATION.BUY;
  const isOrdersInformationNotEmpty = ordersInformation.length !== 0;

  const ordersOnUi = sortedOrders(ordersInformation, isBuyOperation).map(
    (order, index) => (
      <OrderInfo
        order={order}
        isBuyOperation={isBuyOperation}
        opacity={getOpacityValue(index)}
        width={getWidthValue(index)}
      />
    )
  );

  return (
    <>
      {(isOrdersInformationNotEmpty && (
        <div className="order_information">
          <div className="order_information_title grid_block">
            <div className="order_info">Size ETH</div>
            <div>Price USDT</div>
          </div>
          {ordersOnUi}
        </div>
      )) || <span className="default_message">No price information</span>}
    </>
  );
};

interface IOrderInfo {
  order: IOrderData;
  isBuyOperation: boolean;
  opacity: number;
  width: number;
}

const OrderInfo: FC<IOrderInfo> = ({
  order,
  isBuyOperation,
  opacity,
  width,
}) => {
  const eth = isBuyOperation
    ? getNumber(order.amountB)
    : getNumber(order.amountA);
  const price = isBuyOperation
    ? getNumber(order.amountA)
    : getNumber(order.amountB);

  return (
    <div className="grid_block">
      <div>
        <div
          className="eth_number"
          style={{
            backgroundColor: `rgba(178, 241, 222, ${opacity})`,
            width: `${width}%`,
            minWidth: "auto",
          }}
        >
          {eth}
        </div>
      </div>

      <div className="usdt_number">{price}</div>
    </div>
  );
};
