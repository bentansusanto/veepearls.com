"use client";
import { heading } from "@/components/ui/font-family";
import { colorPearl, pearlColor } from "@/lib/pearl-education";
import Image from "next/image";
import React, { useState } from "react";

export const PearlColorPage = () => {
  const [selectColor, setSelectColor] = useState<string>("white");
  const filterColor = selectColor
    ? pearlColor.pearl_color.filter(
        (list: any) => list.color.toLowerCase() === selectColor.toLowerCase(),
      )
    : null;
  const handleSelectColor = (name_color: string) => {
    setSelectColor(name_color);
  };
  return (
    <div className="bg-pearl-colors p-5">
      <div className="text-center mx-auto flex-col gap-3 justify-center">
        <h1
          className={`text-3xl font-medium lg:text-5xl xl:text-6xl ${heading.className}`}
          style={{ lineHeight: "130%" }}
        >
          {pearlColor.heading}
        </h1>
        <div
          className={` mt-10 flex flex-wrap items-center justify-center gap-6 text-gray-400`}
        >
          {colorPearl?.map((list: any, idx: any) => (
            <p
              key={idx}
              onClick={() => handleSelectColor(list.name_color.toLowerCase())}
              className={` ${selectColor.toLowerCase() === list.name_color.toLowerCase() && "text-[#B2A671]"}
                cursor-pointer text-sm`}
            >
              {list.name_color}
            </p>
          ))}
        </div>
      </div>
      <div className="mt-10">
        {filterColor?.map((list, idx) => (
          <div
            key={idx}
            className="flex flex-col items-start gap-10 lg:flex-row"
          >
            <div className="space-y-2 text-white lg:max-w-xl">
              <h2
                className={`${heading.className} text-lg font-medium font-heading`}
              >
                {list.name_color}
              </h2>
              {list.description.map((desc: any) => (
                <p className="text-gray-400 text-sm" key={desc}>
                  {desc}
                </p>
              ))}
            </div>
            {/* image */}
            <div className="flex flex-col items-center gap-5 md:flex-row">
              {list.image.slice(0, 1).map((image) => (
                <Image
                  key={image}
                  width={100}
                  height={100}
                  src={`/images/${image}`}
                  className="w-auto"
                  alt="list-mage-pearl-color"
                />
              ))}
              <div className="flex flex-col gap-5">
                {list.image.slice(1, 3).map((image) => (
                  <Image
                    key={image}
                    width={100}
                    height={100}
                    src={`/images/${image}`}
                    alt="list-mage-pearl-color"
                    className="w-auto"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
