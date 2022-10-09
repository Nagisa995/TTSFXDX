import { FC, useEffect } from "react";
import { getMyOrdersInfo } from "../../../../api/order_api";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import "./style/order_my_style.css";
//@ts-ignore
import Loader from "../../../../source/Unionloader.svg";
import { MyOrdersInfo } from "./components/my_orders_info";
import { isDataNotEmpty, walletConnected } from "../../../../helpers/utils";

export const MyOrder: FC = () => {
  const { wallet } = useAppSelector((state) => state.walletReducer);
  const { isFetchingMyOrders, myOrdersInfo } = useAppSelector(
    (state) => state.fetchingReducer
  );
  const dispatch = useAppDispatch();

  const isWalletConnected = walletConnected(wallet);
  const isOrdersInfoNotEmpty = isDataNotEmpty(myOrdersInfo);

  /*eslint-disable*/
  useEffect(() => {
    if (isWalletConnected) {
      dispatch(getMyOrdersInfo(wallet));
    }
  }, [wallet]);
  /*eslint-enable*/
  return (
    <div className="order_my">
      <h1 className="order_my_title">My Orders</h1>
      {(isWalletConnected &&
        ((isFetchingMyOrders && (
          <div className="loader">
            <img src={Loader} alt="Loading..." />
          </div>
        )) ||
          (isOrdersInfoNotEmpty && (
            <MyOrdersInfo orders={myOrdersInfo} wallet={wallet} />
          )) || (
            <div className="default_message">
              There is no data for your orders
            </div>
          ))) || (
        <div className="default_message">
          Connect your wallet to start trading
        </div>
      )}
    </div>
  );
};
