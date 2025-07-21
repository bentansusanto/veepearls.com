import { heading } from "@/components/ui/font-family";
import { pearlTypes } from "@/lib/pearl-education";
import Image from "next/image";
import React from "react";

export const PearlTypesPage = () => {
  return (
    <div className="bg-pearl-types p-5">
      {/* Heading */}
      <div className="mx-auto space-y-2 text-center text-white">
        <h1
          className={`text-3xl font-medium lg:text-5xl xl:text-5xl ${heading.className}`}
          style={{ lineHeight: "130%" }}
        >
          {pearlTypes.heading}
        </h1>
        <p className="text-sm lg:max-w-3xl mx-auto text-gray-400">
          {pearlTypes.body}
        </p>
      </div>
      {/* List Pearl Type */}
      <div className="flex flex-wrap justify-center gap-5 mt-20 lg:grid-cols-2 lg:grid">
        {pearlTypes.pearl_type.map((list: any, idx: any) => (
          <div
            key={idx}
            className={`p-4 rounded-md`}
            style={{ backgroundColor: `${list.color_bg}` }}
          >
            <div className="space-y-3">
              <Image
                src={`/images/${list.image}`}
                width={100}
                height={100}
                alt="list-pearl-type"
                className="w-32 mx-auto lg:w-52 md:w-40"
              />
              <div className="mx-auto space-y-2 text-center text-black lg:max-w-2xl">
                <h2 className="text-xl font-semibold font-heading">
                  {list.name_type}
                </h2>
                <p className="text-gray-600 text-sm">{list.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
