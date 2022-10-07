import { FC } from "react";
import "./style/button_style.css";

interface ISubmitButton {
  isValid: boolean;
}

export const SubmitButton: FC<ISubmitButton> = ({ isValid }) => {
  return (
    <button
      className={`order_creation_data_form_submit ${
        isValid ? "active_button" : ""
      }`}
    >
      Place the order
    </button>
  );
};
