import React from "react";
import "@/app/globals.css";
import { ourBrandDNA } from "@/lib/about-pearl-data";
import Image from "next/image";
import { heading } from "@/components/ui/font-family";

const BrandDnaPage = () => {
  return (
    <div className=" bg-brand-dna py-5 px-5">
      <div className="flex flex-col items-center justify-center text-white">
        <Image
          src={`/images/${ourBrandDNA.image}`}
          width={0}
          height={0}
          className="w-[70%]"
          alt="images-about-brand-dna"
        />
        <div className="space-y-10 mt-10">
          <h1
            className={`font-heading text-2xl text-center font-semibold lg:text-4xl ${heading.className}`}
            style={{ lineHeight: "130%" }}
          >
            {ourBrandDNA.heading}
          </h1>

          <div className="text-white">
            <div className="mb-10 space-y-5">
              <div className="space-y-3">
                <h2 className={`${heading.className} text-lg font-medium font-heading`}>
                  {ourBrandDNA.content1.heading}
                </h2>
                <p className="text-gray-400 text-sm">{ourBrandDNA.content1.body}</p>
              </div>
            </div>

            <div className="mb-10 space-y-5 ">
              <div className="space-y-3">
                <h2 className={`${heading.className} text-lg font-semibold font-heading`}>
                  {ourBrandDNA.content2.heading}
                </h2>
                <p className="text-gray-400 text-sm">{ourBrandDNA.content2.body}</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-3">
                <h2 className={`${heading.className} text-lg font-semibold font-heading`}>
                  {ourBrandDNA.content3.heading}
                </h2>
                <p className="text-gray-400 text-sm">{ourBrandDNA.content3.body}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandDnaPage;
