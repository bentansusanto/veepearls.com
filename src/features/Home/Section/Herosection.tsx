import { Mobile } from "@/common/media-query";
import { heading } from "@/components/ui/font-family";
import Image from "next/image";
import React from "react";

const Herosection = () => {
  const { isMobile } = Mobile();
  return (
    <div className="relative">
      {isMobile ? (
        <Image
          src="/images/bg-herosection-mobile-veepearl.png"
          alt="bg-herosection"
          width={0}
          height={0}
          className="w-auto"
        />
      ) : null}
      <div
        className="absolute inset-x-0 bottom-5 text-white text-center 
       mx-auto px-5 space-y-3"
      >
        <h1 className={`${heading.className} text-xl`}>Enchanted Jewel</h1>
        <p className="text-sm text-gray-400 max-w-sm mx-auto">
          To admire and celebrate the incredible beauty we find in nature
        </p>
      </div>
    </div>
  );
};

export default Herosection;
