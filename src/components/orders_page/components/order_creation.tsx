import { FC, useState } from "react";
import { CustomInput } from "../../../ui_elements/custom_input";

export const OrderCreation: FC = () => {
  const [value, setValue] = useState("");

  return (
    <div className="order_creation">
      <div className="order_creation_header">
        <h1>Place the Order</h1>
        <div className="order_creation_header_tabs">
          <div className="order_creation_header_tabs_tab active">Limit</div>
          <div className="order_creation_header_tabs_tab">Market</div>
        </div>
      </div>

      <div className="order_creation_operation_tabs">
        <div className="order_creation_operation_tabs_tab active">Buy</div>
        <div className="order_creation_operation_tabs_tab">Sell</div>
      </div>

      <form className="order_creation_data_form">
        <div className="order_creation_data_form_tokens">
          <CustomInput
            placeholder="Token A smart contract address"
            value={value}
            onChange={setValue}
          />
          <CustomInput placeholder="Token B smart contract address" />
        </div>

        <div className="order_creation_data_form_info">
          <CustomInput placeholder="Token A amount" />
          <CustomInput placeholder="Limit price (in Token B)" />
        </div>

        <div className="order_creation_data_form_price">
          <div className="order_creation_data_form_price_container">
            <CustomInput placeholder="Expected order price" />
          </div>
        </div>

        <button className="order_creation_data_form_submit">
          Place the order
        </button>
      </form>
    </div>
  );
};
