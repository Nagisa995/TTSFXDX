import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import "./style/layout_style.css"

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <Outlet></Outlet>
      <Footer />
    </>
  );
};
