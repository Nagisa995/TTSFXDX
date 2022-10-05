import { FC } from "react";
import "./style/modal_style.css";

interface IModalWindow {
  children: React.ReactElement;
}

export const ModalWindow: FC<IModalWindow> = ({ children }) => {
  return <div className="modal_window">{children}</div>;
};
