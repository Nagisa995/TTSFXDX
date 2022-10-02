import React from "react";
import { Layout } from "./layout/layout";
import { Route, Routes } from "react-router-dom";
import { OrdersPage } from "./orders_page/orders_page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<OrdersPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
