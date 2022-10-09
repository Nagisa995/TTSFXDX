import { FC } from "react";
//@ts-ignore
import LoaderImage from "../../../../../../../../source/Unionloader.svg";
import "./style/button_style.css";

interface IDisabledButton {
  isTransactionStage: boolean;
}

export const DisabledButton: FC<IDisabledButton> = ({ isTransactionStage }) => {
  return (
    <div className="order_creation_data_form_submit disabled_button">
      <img src={LoaderImage} alt="" />
      {(isTransactionStage && <span>Transaction in progress</span>) || (
        <span>Searching for best price</span>
      )}
    </div>
  );
};
