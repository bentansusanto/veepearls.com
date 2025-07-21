"use client";
import { heading } from "@/components/ui/font-family";
import { necklareLength } from "@/lib/pearl-education";
import Image from "next/image";
import React, { useState } from "react";

export const NecklaceLengthPage = () => {
  const [selectLength, setSelectLength] = useState(
    necklareLength.necklareData[0],
  );
  return (
    <div className="bg-necklace-length p-5">
      <div className="mx-auto space-y-2 text-center text-white">
        <h1
          className={`text-3xl font-medium lg:text-5xl xl:text-5xl ${heading.className}`}
          style={{ lineHeight: "130%" }}
        >
          {necklareLength.heading}
        </h1>
        <p className="mx-auto text-sm text-gray-400 lg:max-w-3xl">
          {necklareLength.body}
        </p>
      </div>
      {/* List lenght */}
      <div className="flex flex-col items-center justify-center mx-auto mt-10 md:mt-40 md:flex-row md:gap-10">
        <div className="relative">
          <div>
            <Image
              src={`/images/${selectLength.image}`}
              width={100}
              height={100}
              alt="Pearl Necklace"
              className="w-auto"
            />
          </div>
          <div className="absolute flex flex-col items-center gap-3 right-5 top-1/3">
            {necklareLength.necklareData.map((item: any, index: any) => (
              <div key={index} className="mb-2">
                <button
                  onClick={() => setSelectLength(item)}
                  className={`block text-sm md:text-lg ${selectLength.size === item.size ? "font-semibold text-[#B2A671]" : "text-gray-500"}`}
                >
                  {item.size}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 space-y-3 text-white md:max-w-md lg:max-w-xl">
          <h2 className={`${heading.className} text-lg font-medium`}>
            {selectLength.name_length}
          </h2>
          <p className="text-sm text-gray-400">{selectLength.description}</p>
        </div>
      </div>
    </div>
  );
};
