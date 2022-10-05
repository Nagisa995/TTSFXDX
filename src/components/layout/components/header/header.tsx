import { FC } from "react";
import { useAppSelector } from "../../../../hooks/redux";
import { defaultWalletData } from "../../../../store/reducers/wallet-reducer";
import { AddedWallet } from "./components/added_wallet/added_wallet";
import { AddWalletButton } from "./components/add_button/add_button";
import "./style/header_style.css";

export const Header: FC = () => {
  const { wallet } = useAppSelector((state) => state.walletReducer);

  const isWalletConnected = wallet !== defaultWalletData.wallet;

  return (
    <header>
      {(isWalletConnected && <AddedWallet wallet={wallet} />) || (
        <AddWalletButton />
      )}
    </header>
  );
};
