import { FC } from "react";
import "./style/order_book_style.css";

export const OrderBook: FC = () => {
  return (
    <div className="order_book">
      <h1 className="order_book_title">Order Book</h1>
      <span className="default_message">Choose tokens to see prices</span>
    </div>
  );
};
