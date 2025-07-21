'use client'
import { heading } from "@/components/ui/font-family";
import React from "react";
import ListOrders from "./ListOrders";

const OrderPage = () => {
  return (
    <div className="mt-2">
      <h1
        className={`${heading.className} text-lg font-semibold 
        capitalize md:hidden px-5 block`}>
        My Orders
      </h1>
      <ListOrders/>
    </div>
  );
};

export default OrderPage;

