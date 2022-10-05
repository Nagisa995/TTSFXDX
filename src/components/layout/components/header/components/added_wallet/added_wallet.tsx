import { FC } from "react";
import "./style/added_wallet_style.css";
//@ts-ignore
import MetamaskLogo from "../../../../../../source/metamask_logo 1metamask_logo.svg";
//@ts-ignore
import EndBlockImage from "../../../../../../source/Frameend_part_wallet.svg";
import { hidingPart } from "../../../../../../helpers/utils";

interface IAddedWallet {
  wallet: string;
}

export const AddedWallet: FC<IAddedWallet> = ({ wallet }) => {
  return (
    <div className="added_wallet_container">
      <img src={MetamaskLogo} className="metamask_logo" />
      <span>{hidingPart(wallet)}</span>
      <img src={EndBlockImage} className="end_image" />
    </div>
  );
};
