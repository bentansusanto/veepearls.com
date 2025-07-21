import { heading } from "@/components/ui/font-family";
import { ourKeyConsiderate } from "@/lib/about-pearl-data";
import Image from "next/image";
import React from "react";

const KeyConsideration = () => {
  return (
    <div className={`bg-key-considerate p-5 mb-5`}>
      <div className="flex flex-col items-center justify-center text-white">
        <Image
          src={`/images/${ourKeyConsiderate.image}`}
          width={0}
          height={0}
          alt="images-about-key-consideration"
          className="w-[70%]"
        />
        <div className="space-y-10 mt-10">
          <h1
            className={`font-heading text-xl capitalize 
                text-center font-semibold lg:text-2xl ${heading.className}`}
            style={{ lineHeight: "130%" }}
          >
            {ourKeyConsiderate.heading}
          </h1>

          <div className="text-white">
            <div className="mb-10 space-y-5">
              <div className="space-y-3">
                <h2 className={`${heading.className} font-semibold capitalize font-heading`}>
                  {ourKeyConsiderate.content1.heading}
                </h2>
                <p className="text-gray-400 text-sm">
                  {ourKeyConsiderate.content1.body}
                </p>
              </div>
            </div>

            <div className="mb-10 space-y-5 ">
              <div className="space-y-3">
                <h2 className={`${heading.className} font-semibold capitalize font-heading`}>
                  {ourKeyConsiderate.content2.heading}
                </h2>
                <p className="text-gray-400 text-sm">
                  {ourKeyConsiderate.content2.body}
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-3">
                <h2 className={`${heading.className} capitalize font-semibold font-heading`}>
                  {ourKeyConsiderate.content3.heading}
                </h2>
                <p className="text-gray-400 text-sm">
                  {ourKeyConsiderate.content3.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyConsideration;
