import { heading } from "@/components/ui/font-family";
import { aboutPearls } from "@/lib/pearl-education";
import Image from "next/image";
import React from "react";

export const AboutPearlsPage = () => {
  return (
    <div className="bg-about-pearl py-5 px-5">
      <div className="flex flex-col items-center justify-center text-white">
        <Image
          src={`/images/${aboutPearls.image}`}
          width={0}
          height={0}
          className="w-[80%]"
          alt="images-about-brand-dna"
        />
        <div className="space-y-10 mt-10">
          <h1
            className={`text-2xl text-center font-semibold lg:text-4xl ${heading.className}`}
            style={{ lineHeight: "130%" }}
          >
            {aboutPearls.heading}
          </h1>

          <div className="text-white">
            <div className="mb-10 space-y-5 text-sm text-gray-400">
              {aboutPearls.body?.map((desc: any, idx: any) => (
                <p key={idx}>{desc}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
