import { FC } from "react";
import { walletConnected } from "../../../../helpers/utils";
import { useAppSelector } from "../../../../hooks/redux";
import { AddedWallet } from "./components/added_wallet/added_wallet";
import { AddWalletButton } from "./components/add_button/add_button";
import "./style/header_style.css";

export const Header: FC = () => {
  const { wallet } = useAppSelector((state) => state.walletReducer);

  const isWalletConnected = walletConnected(wallet);

  return (
    <header>
      {(isWalletConnected && <AddedWallet wallet={wallet} />) || (
        <AddWalletButton />
      )}
    </header>
  );
};
