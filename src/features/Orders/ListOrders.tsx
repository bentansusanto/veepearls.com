'use client'
import { formatDate, formatTime } from "@/common/config-date";
import { dollar } from "@/common/Currency";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
import { useFindHistoryOrderQuery } from "@/store/services/payment.service";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ListOrders = () => {
  const { data: orders } = useFindHistoryOrderQuery();
  const [openDetail, setOpenDetail] = useState(false);
  const [selectOrder, setSelectOrder] = useState<any>({});
  const selectDetailOrder = (order: any) => {
    setSelectOrder(order);
    setOpenDetail(true);
  };
  console.log("orders", selectOrder)
  const totalPricePayment = selectOrder?.carts?.reduce(
    (acc: any, cur: any) => acc + cur.total_price,
    0
  );
  const handlePayment = () => {
    window.location.href = selectOrder.redirect_url;
  };
  return (
    <div>
      <div className="px-5 my-5 space-y-5">
        {orders?.map((order: any, idx: any) => (
          <div
            onClick={() => selectDetailOrder(order)}
            key={idx}
            className="space-y-3 p-3 border cursor-pointer 
            border-gray-200 dark:border-gray-600 rounded-md"
          >
            <div className="flex items-center justify-between">
              <p className=" dark:text-white font-medium">{order.order_code}</p>
              <Badge
                variant="outline"
                className={`${
                  order.payment_status.toLowerCase() === "completed"
                    ? " text-green-700  rounded-full"
                    : order.payment_status.toLowerCase() === "pending"
                    ? " text-yellow-700 rounded-full"
                    : " text-red-700"
                } text-xs rounded-full font-medium`}
              >
                {order.payment_status}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">
                {formatDate(order.createdAt)}
              </p>
              
              <p className="text-xs font-medium">{dollar(order.amount)}</p>
            </div>
          </div>
        ))}
      </div>
      <Drawer open={openDetail} onOpenChange={setOpenDetail}>
        {/* <DrawerTrigger>Open</DrawerTrigger> */}
        <DrawerContent>
          <DrawerHeader className="flex items-center">
            <DrawerClose>
              <ChevronLeft
                width={20}
                height={20}
                color="white"
                strokeWidth={1.75}
              />
            </DrawerClose>
            <DrawerTitle className="text-center mx-auto text-[16px] 
            font-medium">
              Order Details {selectOrder.order_code}
            </DrawerTitle>
          </DrawerHeader>
          <div className="my-5 px-5">
            <div className="space-y-5">
              {selectOrder?.carts?.map((item: any, idx: any) => (
                <div key={idx} className="flex items-center space-x-3">
                  <div className="max-w-[70px] aspect-square overflow-hidden rounded-sm bg-gray-100">
                    <Image
                      src={item?.thumbnail}
                      width={0}
                      height={0}
                      alt="thumbnail"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="font-normal text-[14px] dark:text-white">
                      {item?.product?.name_product}
                    </p>
                    <div className="text-[13px] text-gray-500 flex items-center gap-1">
                      <p>{item?.product?.sku}</p>
                      <span className="bg-gray-500 w-1 h-1 p-0.5 rounded-full" />
                      <p>{item?.product?.grade}</p>
                    </div>
                    <p className="text-xs dark:text-white">
                      Qty : <span>{item?.quantity}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-700 h-[1px] w-full my-5" />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-gray-400">Transaction date</p>
                <p className="text-sm font-medium dark:text-white">
                  {formatDate(selectOrder?.createdAt)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-gray-400">Payment method</p>
                <p className="text-sm font-medium capitalize dark:text-white">
                  {selectOrder?.payment_method}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-gray-400">Shipping method</p>
                <p className="text-sm font-medium capitalize dark:text-white">
                  {selectOrder?.shipping_method}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-gray-400">Order status</p>
                <Badge
                  variant={"outline"}
                  className={` ${
                    selectOrder?.order_status === "delivered"
                      ? "text-green-700 rounded-full"
                      : selectOrder?.order_status === "shipped"
                      ? "text-yellow-700 rounded-full"
                      : selectOrder?.order_status?.toLowerCase() === "pending"
                      ? "text-yellow-700 rounded-full"
                      : "text-red-700 rounded-full"
                  } text-sm font-medium`}
                >
                  {selectOrder?.order_status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-gray-400">Payment status</p>
                <Badge
                  variant="outline"
                  className={`${
                    selectOrder.payment_status?.toLowerCase() === "completed"
                      ? " text-green-700  rounded-full"
                      : selectOrder.payment_status?.toLowerCase() === "pending"
                      ? " text-yellow-700 rounded-full"
                      : " text-red-700"
                  } text-sm rounded-full font-medium`}
                >
                  {selectOrder.payment_status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-gray-400">Total</p>
                <p className="text-sm font-medium dark:text-white">
                  {dollar(selectOrder.amount)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-gray-400">Admin Fee</p>
                <p className="text-sm font-medium dark:text-white">
                  {dollar(2.5)}
                </p>
              </div>
            </div>
            {selectOrder.payment_status === "pending" && (
              <Button onClick={handlePayment}  className="w-full mt-5">
                Checkout Now
              </Button>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ListOrders;

