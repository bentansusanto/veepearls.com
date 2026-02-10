'use client'
import { dollar } from "@/common/Currency";
import { Button } from "@/components/ui/button";
import { useGetCartQuery, useRemoveCartMutation, useUpdateCartMutation } from "@/store/services/cart.service";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ListProductCart = () => {
  const { data: cartData } = useGetCartQuery();
  const [updateCart] = useUpdateCartMutation();
  const [removeCart] = useRemoveCartMutation();

  // const [cartItems, setCartItems] = useState<any[]>([]);
  const [localQuantities, setLocalQuantities] = useState<{ [key: string]: number }>({});
  const [localTotalPrices, setLocalTotalPrices] = useState<{ [key: string]: number }>({});

  // useEffect(() => {
  //   if (cartData) {
  //     setCartItems(cartData);
  //   }
  // }, [cartData]);

  const getQuantity = (itemId: string, defaultQuantity: number) => {
    return localQuantities[itemId] ?? defaultQuantity;
  };

  const getTotalPrice = (itemId: string, defaultTotal: number, price: number) => {
    if (localQuantities[itemId]) {
      return localQuantities[itemId] * price;
    }
    return localTotalPrices[itemId] ?? defaultTotal;
  };

  return (
    <div className="space-y-5 mx-5">
      {cartData?.map((item:any, idx:any) => {
        const handleRemove = () => {
          removeCart(String(item.id))
            .unwrap()
            .catch(() => {})
        };

        const handleIncrease = () => {
          const newQuantity = getQuantity(item.id, item.quantity) + 1;
          const newTotalPrice = newQuantity * (item.total_price / item.quantity);

          setLocalQuantities((prev) => ({ ...prev, [item.id]: newQuantity }));
          setLocalTotalPrices((prev) => ({ ...prev, [item.id]: newTotalPrice }));

          updateCart({ cartId: String(item.id), quantity: newQuantity })
            .unwrap()
            .catch(() => {
              setLocalQuantities((prev) => ({ ...prev, [item.id]: item.quantity }));
              setLocalTotalPrices((prev) => ({ ...prev, [item.id]: item.total_price }));
            });
        };

        const handleDecrease = () => {
          const currentQuantity = getQuantity(item.id, item.quantity);
          if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            const newTotalPrice = newQuantity * (item.total_price / item.quantity);

            setLocalQuantities((prev) => ({ ...prev, [item.id]: newQuantity }));
            setLocalTotalPrices((prev) => ({ ...prev, [item.id]: newTotalPrice }));

            updateCart({ cartId: String(item.id), quantity: newQuantity })
              .unwrap()
              .catch(() => {
                setLocalQuantities((prev) => ({ ...prev, [item.id]: item.quantity }));
                setLocalTotalPrices((prev) => ({ ...prev, [item.id]: item.total_price }));
              });
          }
        };

        const quantity = getQuantity(item.id, item.quantity);
        const pricePerItem = item.total_price / item.quantity;
        const totalPrice = getTotalPrice(item.id, item.total_price, pricePerItem);

        return (
          <div
            key={item.id}
            className={`${
              idx % 2 !== 1 && "border-b border-gray-200 dark:border-gray-600"
            } flex items-center space-x-3 py-4`}
          >
            <div className="max-w-[80px] aspect-square overflow-hidden rounded-sm bg-gray-100">
              <Image
                src={item.product?.thumbnail}
                width={0}
                height={0}
                alt="thumbnail"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm">
                  {item.product?.name_product}
                </p>
                <X
                  width={16}
                  height={16}
                  strokeWidth={2.5}
                  onClick={handleRemove}
                  className="text-red-500 cursor-pointer"
                />
              </div>
              <div className="text-[13px] text-gray-500 flex items-center gap-1">
                <p>{item.product?.sku}</p>
                <span className="bg-gray-500 w-1 h-1 p-0.5 rounded-full" />
                <p>{item.product?.grade}</p>
                <span className="bg-gray-500 w-1 h-1 p-0.5 rounded-full" />
                <p>{item.product?.size}</p>
              </div>
              <div className="flex items-center space-x-5">
                <div className="flex items-center space-x-2 pt-2">
                  <Button
                    className="rounded-full p-1"
                    onClick={handleDecrease}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <span>{quantity}</span>
                  <Button className="rounded-full p-1" onClick={handleIncrease}>
                    <Plus size={16} />
                  </Button>
                </div>
                <p className="text-sm font-semibold pt-1">
                  {dollar(totalPrice)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListProductCart;
