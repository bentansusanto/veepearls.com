"use client";
import { Mobile } from "@/common/media-query";
import { heading } from "@/components/ui/font-family";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  const { isMobile } = Mobile();
  return (
    <div className="bg-black h-screen">
      {isMobile ? (
        // Mobile
        <div className="relative">
          <div className="absolute space-y-3 text-white text-center px-5 leading-relaxed">
            <h1 className={`${heading.className} font-medium text-[120px]`}>
              404
            </h1>
            <p className="text-sm text-gray-400 leading-snug">
              Whoops this page not found, don&apos;t worry you can go back to
              &nbsp;
              <Link prefetch={true} href={"/"} className="text-[#A78E57]">
                Homepage
              </Link>
            </p>
          </div>
          <Image
            src={"/images/bg-404-error-mobile.webp"}
            width={0}
            height={0}
            alt="bg-error-page"
            className="w-full h-screen object-cover"
          />
        </div>
      ) : (
        // Desktop & Large Desktop
        <></>
      )}
    </div>
  );
};

export default ErrorPage;
