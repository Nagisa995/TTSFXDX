import { FC } from "react";
//@ts-ignore
import LoaderImage from "../../../../../../../../source/Unionloader.svg";
import "./style/button_style.css";

export const DisabledButton: FC = () => {
  return (
    <div className="order_creation_data_form_submit disabled_button">
      <img src={LoaderImage} />
      <span>Searching for best price</span>
    </div>
  );
};
