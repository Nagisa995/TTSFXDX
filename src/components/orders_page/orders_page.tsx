import { FC } from "react";
import { OrderBook } from "./components/order_book";
import { OrderCreation } from "./components/order_creation";
import { MyOrder } from "./components/order_my";
import "./style/order_page_style.css";

export const OrdersPage: FC = () => {
  return (
    <div className="container">
      <OrderCreation />
      <MyOrder />
      <OrderBook />
    </div>
  );
};
