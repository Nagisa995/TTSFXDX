import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux";
import {
  orderReducerSlice,
  ORDER_OPERATION,
} from "../../../../../../store/reducers/order_reducer";
import "./style/order_operation_style.css";

export const OrderOperation: FC = () => {
  const { operation } = useAppSelector((state) => state.orderReducer);
  const dispatch = useAppDispatch();

  const handleOperationChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetValue = (e.target as HTMLDivElement)
      .textContent as ORDER_OPERATION;

    const isTypeChange = !targetValue.includes(operation);

    if (isTypeChange)
      dispatch(orderReducerSlice.actions.orderOperationChange(targetValue));
  };

  const isBuyOperationActive = operation === ORDER_OPERATION.BUY;
  return (
    <div
      className="order_creation_operation_tabs"
      onClick={handleOperationChange}
    >
      <div
        className={
          isBuyOperationActive
            ? "order_creation_operation_tabs_tab active"
            : "order_creation_operation_tabs_tab"
        }
      >
        {ORDER_OPERATION.BUY}
      </div>
      <div
        className={
          !isBuyOperationActive
            ? "order_creation_operation_tabs_tab active"
            : "order_creation_operation_tabs_tab"
        }
      >
        {ORDER_OPERATION.SELL}
      </div>
    </div>
  );
};
