import { FC } from "react";
import "./style/user_alert_style.css";
//@ts-ignore
import CloseIcon from "../../source/close_icon.svg";
import { useAppDispatch } from "../../hooks/redux";
import { walletReducerSlice } from "../../store/reducers/wallet-reducer";

export const UserAlert: FC = () => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(walletReducerSlice.actions.networkCheck());
  };

  return (
    <div className="user_alert_container">
      <div className="title">
        <h1>Wrong Network</h1>
        <img src={CloseIcon} alt="x" onClick={handleClose} />
      </div>
      <div className="message">
        Wrong network, please, select Ethereum Limit price (in Token B)
        blockchain.
      </div>
      <button onClick={handleClose}>Okay</button>
    </div>
  );
};
