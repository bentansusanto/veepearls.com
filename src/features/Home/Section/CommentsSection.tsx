import { heading } from "@/components/ui/font-family";
import { testimoniData } from "@/lib/testimoni-data";
import Image from "next/image";
import React from "react";

export const CommentsSection = () => {
  return (
    <div className="px-5 mb-10">
      <h1 className={`${heading.className} text-lg`}>Customer Reviews</h1>
      <div className="mt-5 flex items-start overflow-x-auto no-scrollbar space-x-5">
        {testimoniData.map((testimoni: any, index: any) => (
          <div
            key={index}
            className="flex-shrink-0 dark:bg-[#191919] bg-gray-100 rounded-md p-5 space-y-5"
          >
            <Image
              src={"/images/quotes.svg"}
              alt="quotes"
              width={20}
              height={20}
              className="w-[30%]"
            />
            <p
              className={`${heading.className} max-w-[200px] text-sm leading-relaxed`}
            >
              {testimoni.comment}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-xs text-gray-500">{testimoni.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
