import { FC } from "react";
import { useAppDispatch } from "../../../../../../hooks/redux";
import { web3WalletConnect } from "../../../../../../web3/web3Client";
import "./style/button_style.css";

export const AddWalletButton: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      className="wallet_add_button"
      //@ts-ignore
      onClick={() => dispatch(web3WalletConnect())}
    >
      Connect Wallet
    </button>
  );
};
