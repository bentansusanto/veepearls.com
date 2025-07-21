"use client";
import { dollar } from "@/common/Currency";
import { CreateCart } from "@/common/Fetching/Cart/fetch-cart";
import { GetAllProducts } from "@/common/Fetching/Product/fetch-product";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const ProductDetailPage = () => {
  const params = useParams();
  const slug = params?.slug;
  const { data: products } = GetAllProducts();
  const productDetail = products?.filter(
    (product: any) => product.slug === slug
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isAddCart, setIsAddCart] = useState<boolean>(false);
  const addCart = CreateCart();
  const router = useRouter();

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Tidak bisa kurang dari 1
  };

  const handleAddToCart = () => {
    if (!productDetail?.[0]?.id) return;

    addCart.mutate(
      { productId: productDetail?.[0]?.id, quantity },
      {
        onSuccess: () => {
          setIsAddCart(true);
          setQuantity(1);
          setTimeout(() => setIsAddCart(false), 3000); // sembunyikan dot setelah 3 detik (opsional)
        },
        onError: (error) => {
          router.push("/login");
          console.error("Error adding to cart:", error);
        },
      }
    );
  };
  return (
    <div className="px-5 mt-5 mb-10">
      <Carousel>
        <CarouselContent>
          {productDetail?.[0]?.images?.map((image: any, index: number) => (
            <CarouselItem key={index}>
              <Image
                src={image}
                width={0}
                height={0}
                alt="image"
                className="w-full h-96 object-scale-down bg-black 
                        object-center brightness-90 rounded-md"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
      <div className="space-y-3 pb-3 mt-5">
        <div className="space-y-2">
          <p className="font-normal text-[13px]">
            {productDetail?.[0]?.name_product}
          </p>
          <div className="text-[13px] text-gray-500 flex items-center gap-1">
            <p>{productDetail?.[0]?.sku}</p>
            <span className="bg-gray-500 w-1 h-1 p-0.5 rounded-full" />
            <p>{productDetail?.[0]?.grade}</p>
            <span className="bg-gray-500 w-1 h-1 p-0.5 rounded-full" />
            <p>{productDetail?.[0]?.size}</p>
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-3">
            <Button onClick={handleDecrement} className="rounded-full p-1">
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
            {dollar(productDetail?.[0]?.price)}
          </p>
        </div>
        <div className="space-y-2 text-sm pb-5">
          <p className="font-regular text-[12px]">Introduction</p>
          <p className="text-gray-500 text-[12px]">
            {productDetail?.[0]?.description}
          </p>
        </div>
        <Button
          onClick={handleAddToCart}
          className="w-full flex items-center py-3 text-sm"
        >
          <ShoppingBag className="me-2" />
          <span>Add to Cart</span>
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailPage;

