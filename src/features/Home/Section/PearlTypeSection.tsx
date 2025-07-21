import { JewelType } from "@/common/Fetching/Product/fetch-jewel";
import { pearlTypes } from "@/lib/pearl-types";
import Image from "next/image";
import React from "react";

const PearlTypeSection = () => {
  const { data: jeweltype } = JewelType();
  const pearlTypeData = jeweltype?.map((item: any) => {
    const matchingType = pearlTypes.find(
      (type) => type.name.toLowerCase() === item.name_type.toLowerCase(),
    );

    return {
      ...item,
      image: matchingType?.image, // fallback image jika tidak ditemukan
    };
  });
  const handleJewelPage = (type: string) => {
    window.location.href = `/jewellery-type/${type}`;
  };
  return (
    <div className="grid grid-cols-2 gap-3 mt-10 mb-20 px-5">
      {pearlTypeData?.map((pearlType: any, index: any) => (
        <div
          onClick={() => handleJewelPage(pearlType?.type)}
          key={index}
          className="relative cursor-pointer"
        >
          <Image
            src={`/images/${pearlType.image}`}
            width={0}
            height={0}
            alt={pearlType.name || "pearl-type"}
            className="w-full h-full rounded-sm brightness-[60%] object-cover"
          />
          <p className="text-sm uppercase absolute inset-x-0 text-white bottom-3 left-3">
            {pearlType.name_type}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PearlTypeSection;
