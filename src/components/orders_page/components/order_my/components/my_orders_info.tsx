import { FC } from "react";
import { IOrderData } from "../../../../../api/order_api";
import { getNumber } from "../../../../../helpers/utils";
import { useAppDispatch } from "../../../../../hooks/redux";
import { web3CancelOrder } from "../../../../../web3/web3Client";
import "./style/my_orders_info_style.css";

interface IMyOrdersInfo {
  orders: IOrderData[];
  wallet: string;
}

export const MyOrdersInfo: FC<IMyOrdersInfo> = ({ orders, wallet }) => {
  const dispatch = useAppDispatch();

  const ordersOnUI = orders
    .slice()
    .reverse()
    .map((order) => <Order order={order} key={order.id} />);

  const handleCLick = (e: React.MouseEvent) => {
    const targetID = (e.target as HTMLElement).id;
    const isNotEmptyID = targetID !== "";

    if (isNotEmptyID) {
      dispatch(web3CancelOrder(targetID, wallet));
    }
  };

  return (
    <div className="my_orders_info">
      <div className="grid_block my_orders_info_title">
        <span>Type</span>
        <span>Side</span>
        <span>amount</span>
        <span>price</span>
        <span>Filled</span>
        <span>Status</span>
        <span>Cancel</span>
      </div>
      <div className="my_orders_info_body" onClick={handleCLick}>
        {ordersOnUI}
      </div>
    </div>
  );
};

interface IOrder {
  order: IOrderData;
}

const Order: FC<IOrder> = ({ order }) => {
  const amount = getNumber(order.amountA);
  const price = getNumber(order.amountB);
  const filled = amount - getNumber(order.amountLeftToFill);
  const isOrderFilled = amount === filled;

  return (
    <div className="grid_block order_body">
      <span className="info">TBD</span>
      <span className="info">TBD</span>
      <span className="info">{amount}</span>
      <span className="info">{price}</span>
      <span className="info">{filled}</span>
      <div>
        {isOrderFilled ? (
          <div className="not_filled filled">Filled</div>
        ) : (
          <div className="not_filled">Not Filled</div>
        )}
      </div>
      <div className="info">
        {isOrderFilled ? (
          "N/A"
        ) : (
          <button className="cancel_order" id={order.id}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};
