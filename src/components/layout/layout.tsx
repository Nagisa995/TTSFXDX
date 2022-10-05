import { FC } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { ModalWindow } from "../../ui_elements/modal_window/modal_window";
import { UserAlert } from "../../ui_elements/user_alert/user_alert";
import { Footer } from "./components/footer/footer";
import { Header } from "./components/header/header";

export const Layout: FC = () => {
  const { isWrongNetwork } = useAppSelector((state) => state.walletReducer);
  return (
    <>
      <Header />
      <Outlet></Outlet>
      <Footer />
      {isWrongNetwork && <ModalWindow children={<UserAlert />} />}
    </>
  );
};
