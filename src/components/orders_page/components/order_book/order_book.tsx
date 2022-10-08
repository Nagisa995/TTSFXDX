import { FC } from "react";
import { useAppSelector } from "../../../../hooks/redux";
import { ORDER_FETCHING } from "../../../../store/reducers/data_fetching";
import { OrderInformation } from "../../../../ui_elements/order_information/order_information";
import "./style/order_book_style.css";
//@ts-ignore
import Loader from "../../../../source/Unionloader.svg";

export const OrderBook: FC = () => {
  const { tokensOrderInfo, orderInfoFetchingStatus } = useAppSelector(
    (state) => state.fetchingReducer
  );
  const { operation } = useAppSelector((state) => state.orderReducer);

  const isOrderInfoNotLoaded =
    orderInfoFetchingStatus === ORDER_FETCHING.NOT_LOADED;
  const isOrderInfoFetching =
    orderInfoFetchingStatus === ORDER_FETCHING.FETCHING;
  const isOrderInfoLoaded = orderInfoFetchingStatus === ORDER_FETCHING.LOADED;

  return (
    <div className="order_book">
      <h1 className="order_book_title">Order Book</h1>
      {isOrderInfoNotLoaded && (
        <span className="default_message">Choose tokens to see prices</span>
      )}

      {isOrderInfoFetching && (
        <div className="order_book_loader">
          <img src={Loader} alt="Загрузка ..." />
        </div>
      )}

      {isOrderInfoLoaded && (
        <div className="order_info_container">
          <OrderInformation
            ordersInformation={tokensOrderInfo}
            operation={operation}
          />
        </div>
      )}
    </div>
  );
};
