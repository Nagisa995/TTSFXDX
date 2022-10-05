import { FC } from "react";
import { OrderDataForm } from "./components/order_data_form/order_data_form";
import { OrderOperation } from "./components/order_operation/order_operation";
import { OrderType } from "./components/order_type/order_type";
import "./style/order_creation_style.css";

export const OrderCreation: FC = () => {
  return (
    <div className="order_creation">
      <div className="order_creation_header">
        <h1>Place the Order</h1>
        <OrderType />
      </div>

      <OrderOperation />

      <OrderDataForm />
    </div>
  );
};
