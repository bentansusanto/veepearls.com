import MainLayout from "@/components/layout/MainLayout";
import OrderPage from "@/features/Orders/OrderPage";
import React from "react";

const Orders = () => {
  return (
    <MainLayout>
      <OrderPage />
      {/* <h1>Order Page</h1> */}
    </MainLayout>
  );
};

export default Orders;
