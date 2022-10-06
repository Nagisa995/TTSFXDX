import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux";
import {
  orderReducerSlice,
  ORDER_TYPE,
} from "../../../../../../store/reducers/order_reducer";
import "./style/order_type_style.css";

export const OrderType: FC = () => {
  const { type } = useAppSelector((state) => state.orderReducer);
  const dispatch = useAppDispatch();

  const handleTypeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetValue = (e.target as HTMLDivElement).textContent as ORDER_TYPE;

    const isTypeChange = !targetValue.includes(type);

    if (isTypeChange)
      dispatch(orderReducerSlice.actions.orderTypeChange(targetValue));
  };

  const isLimitTypeActive = type === ORDER_TYPE.LIMIT;
  return (
    <div className="order_creation_header_tabs" onClick={handleTypeChange}>
      <div
        className={
          isLimitTypeActive
            ? "order_creation_header_tabs_tab active"
            : "order_creation_header_tabs_tab"
        }
      >
        {ORDER_TYPE.LIMIT}
      </div>
      <div
        className={
          !isLimitTypeActive
            ? "order_creation_header_tabs_tab active"
            : "order_creation_header_tabs_tab"
        }
      >
        {ORDER_TYPE.MARKET}
      </div>
    </div>
  );
};
