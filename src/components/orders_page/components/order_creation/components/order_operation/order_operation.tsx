import { FC } from "react";
import "./style/order_operation_style.css";

export const OrderOperation: FC = () => {
  return (
    <div className="order_creation_operation_tabs">
      <div className="order_creation_operation_tabs_tab active">Buy</div>
      <div className="order_creation_operation_tabs_tab">Sell</div>
    </div>
  );
};
