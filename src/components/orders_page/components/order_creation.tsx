import { FC } from "react";

export const OrderCreation: FC = () => {
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
          <input
            type="text"
            className="order_creation_data_form_input"
            placeholder="Token A smart contract address"
          />
          <input
            type="text"
            className="order_creation_data_form_input"
            placeholder="Token B smart contract address"
          />
        </div>

        <div className="order_creation_data_form_info">
          <input
            type="text"
            className="order_creation_data_form_input"
            placeholder="Token A amount"
          />
          <input
            type="text"
            className="order_creation_data_form_input"
            placeholder="Limit price (in Token B)"
          />
        </div>

        <div className="order_creation_data_form_price">
          <div className="order_creation_data_form_price_container">
            <input
              type="text"
              className="order_creation_data_form_input"
              placeholder="Expected order price"
            />
          </div>
        </div>

        <button className="order_creation_data_form_submit">
          Place the order
        </button>
      </form>
    </div>
  );
};
