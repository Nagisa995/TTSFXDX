import { FC } from "react";
import "./style/order_my_style.css";

export const MyOrder: FC = () => {
  return (
    <div className="order_my">
      <h1 className="order_my_title">My Orders</h1>
      <div className="default_message">
        Connect your wallet to start trading
      </div>
    </div>
  );
};
