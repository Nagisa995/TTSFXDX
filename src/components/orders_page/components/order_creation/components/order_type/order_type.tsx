import { FC } from "react";
import "./style/order_type_style.css";

export const OrderType: FC = () => {
  return (
    <div className="order_creation_header_tabs">
      <div className="order_creation_header_tabs_tab active">Limit</div>
      <div className="order_creation_header_tabs_tab">Market</div>
    </div>
  );
};
