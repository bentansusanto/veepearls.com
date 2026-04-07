"use client";
import { formatDate } from "@/common/config-date";
import { dollar } from "@/common/Currency";
import { useGetCartQuery } from "@/store/services/cart.service";
import {
  useCreatePaymentCardMutation,
  useCapturePaymentCardMutation,
  useCreatePaymentCodMutation,
  useCreatePaymentPaypalMutation,
  useCapturePaymentPaypalMutation,
  useVerifyPaymentPaypalQuery,
} from "@/store/services/payment.service";
import { useGetPemesanByIdQuery } from "@/store/services/pemesan.service";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { heading } from "@/components/ui/font-family";
import { payment } from "@/lib/global-data";
import { Check, CreditCard, MapPin, Plus } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import FormAddPemesan from "./FormAddPemesan";
import ListDataPemesan from "./ListDataPemesan";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CardPaymentForm from "./CardPaymentForm";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51RGoHiAI73d84kGmCLWrQBBtgleDg1bYvWG2JxYR5XPDqzhZ3LbRPcxWxVxNv2TCWHPw3trsGCsQ8qtaU5D6XVB000sAGRUUaP",
);

// Local CardPaymentForm duplicate removed

const CheckoutPage = () => {
  const [selectPemesan, setSelectPemesan] = useState<string | null>(null);
  const [selectPayment, setSelectPayment] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const { data: pemesan, isFetching: isFetchingPemesan } = useGetPemesanByIdQuery(selectPemesan as string, { skip: !selectPemesan });
  const { data: carts } = useGetCartQuery();
  const [capturePaymentPaypal, { isLoading: isCapturePaypalLoading, isSuccess: isSuccessPaypalPay }] = useCapturePaymentPaypalMutation();
  const searchParams = useSearchParams();
  const paypalToken = searchParams?.get("token");
  const [createPaymentCod, { isLoading: isCodLoading }] = useCreatePaymentCodMutation();
  const [createPaymentPaypal, { isLoading: isPaypalLoading }] = useCreatePaymentPaypalMutation();
  const [createPaymentCard, { isLoading: isCardLoading }] = useCreatePaymentCardMutation();
  const [capturePaymentCard, { isLoading: isCaptureCardLoading, isSuccess: isCaptureCardSuccess }] = useCapturePaymentCardMutation();
  const { data: receipts } = useVerifyPaymentPaypalQuery(paypalToken as string, { skip: !paypalToken });

  const captureCard = { captureCards: capturePaymentCard, isLoadingCard: isCaptureCardLoading, isSuccessPayCard: isCaptureCardSuccess };
  const isLoading = isCapturePaypalLoading || isPaypalLoading || isCodLoading || isCardLoading || isCaptureCardLoading;
  const isSuccessPay = isSuccessPaypalPay || isCaptureCardSuccess;

  const handleSelectPemesan = (id: string) => {
    setSelectPemesan(id);
  };

  const handleSelectPayment = (payment_method: string) => {
    setSelectPayment(selectPayment === payment_method ? null : payment_method);
    setPaymentError(null);
  };

  const totalPrice = carts?.reduce(
    (acc: any, cur: any) => acc + cur.total_price,
    0,
  );

  const totalPricePayment = receipts?.carts?.reduce(
    (acc: any, cur: any) => acc + cur.total_price,
    0,
  );

  // Capture payment for PayPal
  const hasCaptured = useRef(false);
  useEffect(() => {
    if (paypalToken && !hasCaptured.current) {
      hasCaptured.current = true;
      capturePaymentPaypal(paypalToken);
    }
  }, [paypalToken]);

  const handlePayment = async () => {
    if (!selectPayment) {
      setPaymentError("Please choose a payment method");
      return;
    }
    if (!selectPemesan) {
      setPaymentError("Please select a shipping address");
      return;
    }

    try {
      if (selectPayment === "paypal") {
        const res = await createPaymentPaypal({
          pemesanId: selectPemesan,
        }).unwrap();
        if (!res || !res?.redirect_url) {
          throw new Error("Payment failed");
        }
        window.location.href = res?.redirect_url;
      } else if (selectPayment === "cod") {
        const res = await createPaymentCod({
          pemesanId: selectPemesan,
        }).unwrap();
        console.log(`{res.message}`, res.data);
      }
      // Card payment is handled in CardPaymentForm
    } catch (error: any) {
      setPaymentError(error.message);
    }
  };

  const handleCardPaymentSuccess = (
    paymentIntent: any,
    captureResponse: any,
  ) => {
    console.log("Card Payment Success with Capture:", {
      paymentIntent,
      captureResponse,
    });
    setPaymentError(null);
  };

  const handleCardPaymentError = (error: any) => {
    setPaymentError(error.message || "Card payment failed");
  };

  return (
    <div>
      <h1
        className={`${heading.className} text-lg font-semibold capitalize md:hidden px-5 block`}
      >
        Checkout
      </h1>
      <div className="mt-5 px-5 mb-5">
        <div className="mt-5 space-y-3">
          <p className="text-[13px] font-medium">Shipping to</p>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src={"/images/maps.png"}
                width={0}
                height={0}
                alt="maps"
                className="w-20 h-16 rounded-md object-cover object-center"
              />
              <div className="bg-white dark:text-black shadow-md shadow-gray-300 absolute inset-4 rounded-lg flex justify-center items-center mx-auto">
                <MapPin className="text-[12px]" />
              </div>
            </div>
            <Drawer>
              <DrawerTrigger asChild>
                <div className="relative cursor-pointer">
                  {selectPemesan ? (
                    isFetchingPemesan ? (
                      <div className="border border-dashed border-gray-300 p-3 bg-transparent rounded-md text-gray-500 shadow-none animate-pulse h-[116px] flex items-center justify-center">
                        <p className="text-sm">Loading address...</p>
                      </div>
                    ) : (
                      <div
                        className="border border-dashed border-gray-300
                      p-3 bg-transparent rounded-md text-gray-500 shadow-none hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <div className="flex flex-wrap items-center gap-1">
                          <p className="text-xs text-gray-400">{pemesan?.name}</p>
                        <span className="w-1 h-1 p-0.5 rounded-full bg-gray-500" />
                        <p className="text-xs text-gray-400">{pemesan?.email}</p>
                        <span className="w-1 h-1 p-0.5 rounded-full bg-gray-500" />
                        <p className="text-xs text-gray-400">{pemesan?.phone}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-1">
                        <p className="text-xs text-gray-400">{pemesan?.city}</p>
                        <span className="w-1 h-1 p-0.5 rounded-full bg-gray-500" />
                        <p className="text-xs text-gray-400">
                          {pemesan?.country}
                        </p>
                        <span className="w-1 h-1 p-0.5 rounded-full bg-gray-500" />
                        <p className="text-xs text-gray-400">
                          {pemesan?.zip_code}
                        </p>
                      </div>
                      <p className="text-xs text-start text-gray-400">
                        {pemesan?.address}
                      </p>
                    </div>
                  ) ) : (
                    <div
                      className="border border-dashed border-gray-300 flex items-center
                    p-3 w-full bg-transparent rounded-md text-gray-500 shadow-none hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <div className="flex items-center w-full text-gray-500 justify-center gap-2">
                        <Plus size={16} />
                        <span className="text-sm font-medium">Add address</span>
                      </div>
                    </div>
                  )}
                </div>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle className="text-start text-[16px]">
                    Form Address
                  </DrawerTitle>
                </DrawerHeader>
                <FormAddPemesan />
                <div className="bg-gray-200 dark:bg-gray-600 h-[1px] w-full my-5" />
                <ListDataPemesan
                  handleSelectPemesan={handleSelectPemesan}
                  selectPemesan={selectPemesan as string}
                />
                <DrawerClose>
                  <Button className="py-3 w-full mb-2">Add Address</Button>
                </DrawerClose>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        <div className="mt-5 space-y-3">
          <p className="text-[13px] font-medium">Payment Method</p>
          {payment.map((item, idx) => (
            <div
              onClick={() =>
                handleSelectPayment(item.payment_method.toLowerCase())
              }
              key={idx}
              className={`${
                selectPayment === item.payment_method.toLowerCase()
                  ? "bg-gray-300 dark:bg-gray-300"
                  : "bg-white"
              } hover:dark:bg-gray-300 dark:bg-gray-100 rounded-md
              shadow-sm border border-gray-100 dark:border-gray-600
              flex items-center p-3 w-auto cursor-pointer`}
            >
              {item.payment_method.toLowerCase() === "cod" ||
              item.payment_method.toLowerCase() === "card" ? (
                <div className="flex items-center space-x-2 text-black">
                  <CreditCard width={16} height={16} />
                  <p className="text-sm font-medium capitalize">
                    {item.payment_method}
                  </p>
                </div>
              ) : (
                <Image
                  src={`/images/${item.img}`}
                  width={0}
                  height={0}
                  alt="paypal-payment"
                  className="w-20"
                />
              )}
            </div>
          ))}
        </div>
        {selectPayment === "card" && selectPemesan && (
          <div className="mt-4">
            <Elements stripe={stripePromise}>
              <CardPaymentForm
                onSuccess={handleCardPaymentSuccess}
                onError={handleCardPaymentError}
                isLoading={
                  isCardLoading || captureCard.isLoadingCard
                }
                pemesanId={selectPemesan}
                captureCard={captureCard as any}
              />
            </Elements>
          </div>
        )}
        {paymentError && (
          <p className="text-red-500 text-sm mt-2">{paymentError}</p>
        )}
        {/* subtotal, tax, and total */}
        <div className="space-y-4 mt-10">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Subtotal</p>
            <p className="text-sm font-medium">{dollar(totalPrice)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Admin Fee</p>
            <p className="text-sm font-medium">{dollar(2.5)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-[16px] font-semibold">
              {dollar(totalPrice + 2.5)}
            </p>
          </div>
          {selectPayment === "paypal" || selectPayment === "cod" ? (
            <Button
              onClick={handlePayment}
              className="w-full py-3"
              disabled={
                isPaypalLoading || isCodLoading
              }
            >
              {isPaypalLoading || isCodLoading
                ? "Loading..."
                : selectPayment === "paypal"
                  ? "Checkout Paypal"
                  : "Checkout Now"}
            </Button>
          ) : null}
        </div>
      </div>
      {(isLoading || captureCard.isLoadingCard) && (
        <div className="fixed top-0 h-screen w-full flex items-center justify-center bg-black/70 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
            <p className="text-gray-800 dark:text-white font-medium">
              Processing your payment...
            </p>
            <p className="text-gray-500 dark:text-gray-300 text-sm mt-2">
              Please don&apos;t close this window
            </p>
          </div>
        </div>
      )}
      {(isSuccessPay || captureCard.isSuccessPayCard) && (
        <div className="fixed top-0 h-screen w-full flex items-center justify-center bg-black/70 z-50">
          <div className="bg-white rounded-md p-5 max-w-md w-full">
            <div className="space-y-3 bg-gray-100 p-5 rounded-md">
              <span className="w-20 h-20 p-3 rounded-full mx-auto flex justify-center animate-pulse bg-green-200">
                <span className="w-14 h-14 p-2.5 rounded-full flex mx-auto justify-center bg-green-400 text-white">
                  <Check width={40} height={40} strokeWidth={3} />
                </span>
              </span>
              <div className="space-y-2 text-center">
                <h2 className="text-lg font-semibold dark:text-black">
                  Payment Successful!
                </h2>
                <p className="text-xs text-gray-400 max-w-xs">
                  The order confirmation has been sent to{" "}
                  {receipts?.pemesan?.email || pemesan?.email}
                </p>
              </div>
            </div>
            {/* cart items */}
            <div className="space-y-3 mt-10">
              {(receipts?.carts || carts)?.map((item: any, idx: any) => (
                <div key={idx} className="flex items-center space-x-3">
                  <div className="max-w-[70px] aspect-square overflow-hidden rounded-sm bg-gray-100">
                    <Image
                      src={item?.product?.thumbnail}
                      width={0}
                      height={0}
                      alt="thumbnail"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="font-normal text-[14px] dark:text-black">
                      {item?.product?.name_product}
                    </p>
                    <div className="text-[13px] text-gray-500 flex items-center gap-1">
                      <p>{item?.product?.sku}</p>
                      <span className="bg-gray-500 w-1 h-1 p-0.5 rounded-full" />
                      <p>{item?.product?.grade}</p>
                    </div>
                    <p className="text-xs dark:text-black">
                      Qty: <span>{item?.quantity}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-200 h-[1px] w-full my-5" />
            {/* transaction date, transaction ID, payment method, shipping method, subtotal, total */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-gray-400">Transaction date</p>
                <p className="text-sm font-medium dark:text-black">
                  {formatDate(receipts?.createdAt || new Date())}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-gray-400">Payment method</p>
                <p className="text-sm font-medium capitalize dark:text-black">
                  {receipts?.payment_method || selectPayment}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-gray-400">Shipping method</p>
                <p className="text-sm font-medium capitalize dark:text-black">
                  {receipts?.shipping_method || "Standard"}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-gray-400">Subtotal</p>
                <p className="text-sm font-medium dark:text-black">
                  {dollar(totalPricePayment || totalPrice)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-gray-400">Admin Fee</p>
                <p className="text-sm font-medium dark:text-black">
                  {dollar(2.5)}
                </p>
              </div>
              <div className="bg-gray-200 h-[1px] w-full my-3" />
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-gray-400">Total</p>
                <p className="text-sm font-medium dark:text-black">
                  {dollar((totalPricePayment || totalPrice) + 2.5)}
                </p>
              </div>
            </div>
            <Button
              className="mt-4 w-full py-3 dark:bg-black dark:text-white"
              onClick={() => (window.location.href = "/")}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
