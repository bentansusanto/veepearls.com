"use client";
import { dollar } from "@/common/Currency";
import { Mobile } from "@/common/media-query";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import { useAddCartMutation } from "@/store/services/cart.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Props {
  products: any[];
}

const ListProductJewelType: React.FC<Props> = ({ products }) => {
  const { isMobile } = Mobile();
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAddCart, setIsAddCart] = useState<boolean>(false);
  const [addCart] = useAddCartMutation();
  const router = useRouter();
  const [selectProduct, setSelectProduct] = useState<any>(null);
  const handleSelect = (id: string) => {
    const product = products.find((product) => product.id === id);
    setSelectProduct(product);
    setIsOpen(true);
  };


  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Tidak bisa kurang dari 1
  };

  const handleAddToCart = () => {
    if (!selectProduct) return;

    addCart({ productId: selectProduct.id, quantity })
      .unwrap()
      .then(() => {
        setIsAddCart(true);
        setQuantity(1);
        setTimeout(() => setIsAddCart(false), 3000);
      })
      .catch((error) => {
        router.push("/login");
        console.error("Error adding to cart:", error);
      });
  };

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-10 px-3 mt-6">
      {products?.map((product: any) => (
        <div
          key={product.id}
          className="flex flex-col relative gap-3 rounded-md"
        >
          <div
            className="max-w-full relative aspect-square overflow-hidden
          rounded-sm bg-gray-100"
          >
            <Image
              src={product.thumbnail}
              width={0}
              height={0}
              alt="thumbnail"
              className="w-full h-full object-cover object-center"
            />
            <Button
              onClick={() => handleSelect(product.id)}
              className="rounded-br-none rounded-tl-xl p-2.5 absolute
              right-0 bottom-0"
            >
              <ShoppingBag />
            </Button>
          </div>

          <div className="space-y-2">
            <p className="font-regular text-[11px]">
              {product.name_product.substring(0, 20)}...
            </p>
            <div className="text-[12px] text-gray-500 flex items-center gap-1">
              <p>{product.sku}</p>
              <span className="bg-gray-500 w-1 h-1 p-0.5 rounded-full" />
              <p>{dollar(product.price)}</p>
              <span className="bg-gray-500 w-1 h-1 p-0.5 rounded-full" />
              <p>{product.grade}</p>
              {/* <span className="bg-gray-500 w-1 h-1 p-0.5 rounded-full" />
              <p>{product.size}</p> */}
            </div>
          </div>
          {/* <Button
            onClick={() => handleSelect(product.id)}
            className="rounded-br-none rounded-tl-xl p-1.5 absolute right-0 bottom-0"
          >
            <Plus />
          </Button> */}
        </div>
      ))}
      {/* detail product */}
      <div
        className={`${
          isMobile && selectProduct && isOpen
            ? "bottom-0"
            : "opacity-0 pointer-events-none"
        } bg-black/80 h-full w-full transition-all left-0 duration-500 fixed z-50`}
      >
        <div
          className={`${
            isMobile && selectProduct && isOpen
              ? "h-auto"
              : "opacity-0 h-0 pointer-events-none"
          } bg-white dark:bg-gray-900 bottom-0 absolute w-full
          transition-all duration-500`}
        >
          {/* <div className="flex justify-between items-center">
            <span
              onClick={() => setIsOpen(false)}
              className="border border-gray-100 dark:border-gray-600 p-1.5 rounded-md shadow-sm hover:bg-gray-100 hover:dark:bg-gray-800"
            >
              <ChevronLeft width={16} height={16} strokeWidth={1.75} />
            </span>
            <Link href={'/checkout'} className="border relative border-gray-100 dark:border-gray-600 p-1.5 rounded-md shadow-sm hover:bg-gray-100 hover:dark:bg-gray-800">
              <ShoppingBag width={16} height={16} strokeWidth={1.75} />
              {isAddCart && (
                <span className="bg-red-500 rounded-full p-0.5 w-2 h-2 absolute top-0 right-0" />
              )}
            </Link>
          </div> */}
          {/* detail */}
          <div className="space-y-5">
            <div className="relative">
              <Carousel>
                <CarouselContent>
                  {selectProduct?.images?.map((image: any, index: number) => (
                    <CarouselItem key={index}>
                      <Image
                        src={image}
                        width={0}
                        height={0}
                        alt="image"
                        className="w-full h-96 object-scale-down
                        object-center brightness-90 bg-black"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <div
                className="flex absolute top-0 w-full inset-x-auto-0 px-5 pt-3
              justify-between"
              >
                <span
                  onClick={() => setIsOpen(false)}
                  className="border border-gray-100 dark:border-gray-600
                  p-1.5 rounded-md shadow-sm text-gray-400 hover:dark:text-white
                   hover:text-black hover:bg-gray-100 hover:dark:bg-gray-800 cursor-pointer"
                >
                  <ChevronLeft width={16} height={16} strokeWidth={1.75} />
                </span>
                <Link
                  href={"/checkout"}
                  className="border relative border-gray-100 dark:border-gray-600
                  p-1.5 text-gray-400 hover:dark:text-white hover:text-black
                  rounded-md shadow-sm hover:bg-gray-100 hover:dark:bg-gray-800 cursor-pointer"
                >
                  <ShoppingBag width={16} height={16} strokeWidth={1.75} />
                  {isAddCart && (
                    <span
                      className="bg-red-500 rounded-full p-0.5 w-2 h-2 absolute
                    top-0 right-0"
                    />
                  )}
                </Link>
              </div>
            </div>

            {/* <img
              src={selectProduct?.thumbnail}
              width={0}
              height={0}
              alt="thumbnail"
              className="w-full h-64 object-cover object-center rounded-sm"
            /> */}
            {/* description product */}
            <div className="space-y-3 px-5 pb-5">
              <div className="space-y-2">
                <p className="font-normal text-[13px]">
                  {selectProduct?.name_product}
                </p>
                <div className="text-[12px] text-gray-500 flex items-center gap-1">
                  <p>{selectProduct?.sku}</p>
                  <span className="bg-gray-500 w-1 h-1 p-0.5 rounded-full" />
                  <p>{selectProduct?.grade}</p>
                  <span className="bg-gray-500 w-1 h-1 p-0.5 rounded-full" />
                  <p>{selectProduct?.size}</p>
                </div>
              </div>
              <div className="flex items-center space-x-5">
                <div className="flex items-center space-x-3">
                  <Button
                    onClick={handleDecrement}
                    className="rounded-full p-1"
                  >
                    <Minus width={16} height={16} />
                  </Button>
                  <span className="text-sm">{quantity}</span>
                  <Button
                    onClick={handleIncrement}
                    className="rounded-full p-1 text-lg"
                  >
                    <Plus width={12} height={12} />
                  </Button>
                </div>
                <p className="font-normal text-[16~px]">
                  {dollar(selectProduct?.price)}
                </p>
              </div>
              <div className="space-y-2 text-sm pb-5">
                <p className="font-regular text-[12px]">Introduction</p>
                <p className="text-gray-500 text-[12px]">
                  {selectProduct?.description}
                </p>
              </div>
              <Button
                onClick={handleAddToCart}
                className="w-full flex items-center py-3"
              >
                <ShoppingBag className="me-1" />
                <span>Add to Cart</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProductJewelType;

{
  /* <Drawer>
  <DrawerTrigger className="bg-black rounded-full text-white p-1">
  <Plus width={16} height={16} strokeWidth={2} />
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <img
        src={product.thumbnail}
        width={0}
        height={0}
        alt="thumbnail"
        className="w-64 h-64 object-cover mx-auto object-center rounded-sm"
      />
    </DrawerHeader>
    <div className="space-y-5 px-5">
      <div className="flex items-center justify-between">
        <p className="font-medium text-[14px]">18 Fresh Water Ring Jewellery</p>
        <p></p>
      </div>
    </div>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer> */
}
