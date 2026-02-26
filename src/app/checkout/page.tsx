import MainLayout from "@/components/layout/MainLayout";
// import CheckoutPage from "@/features/Checkout/CheckoutPage";
import React, { Suspense } from "react";

const Checkouts = () => {
  return (
    <MainLayout>
      <Suspense fallback={<div>Loading checkout...</div>}>
        {/* <CheckoutPage /> */}
      </Suspense>
      {/* <h1>CheckoutPage</h1> */}
    </MainLayout>
  );
};

export default Checkouts;
