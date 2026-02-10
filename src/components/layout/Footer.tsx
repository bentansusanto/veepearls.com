"use client";
import { useGetJewelTypesQuery } from "@/store/services/product.service";
import { Mobile } from "@/common/media-query";
import { menuNavigation } from "@/lib/nav-data";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Footer = () => {
  const { isMobile } = Mobile();
  const date = new Date().getFullYear();
  const { data: jewelData } = useGetJewelTypesQuery();
  const [selectMenu, setSelectMenu] = useState<number | null>(null);
  const phoneNumber = "905365829313"; // Nomor contact
  const message =
    "Hi, I'm interested and would like to ask more about your product.";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const handleSelectMenu = (index: number) => {
    setSelectMenu(selectMenu === index ? null : index);
  };
  return (
    <div className="px-5">
      {isMobile ? (
        // MOBILE DEVICE
        <div className="mb-20">
          <div className="bg-gray-300 dark:bg-gray-700 h-[.5px] w-full mb-5" />
          {menuNavigation.map((menu, index) => (
            <div key={index} className="mt-5">
              <div
                onClick={() => handleSelectMenu(index)}
                className="flex items-center cursor-pointer justify-between"
              >
                <p className="text-[16px] font-medium uppercase">
                  {menu.title}
                </p>
                <ChevronDown
                  width={18}
                  height={18}
                  strokeWidth={1.5}
                  className={`transform transition-transform duration-300 ${
                    selectMenu === index ? "rotate-180" : ""
                  }`}
                />
              </div>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  selectMenu === index
                    ? "max-h-[500px] my-5 opacity-100"
                    : "max-h-0 opacity-0 my-2"
                }`}
              >
                {menu.title === "Jewellery Type" ? (
                  <ul className="space-y-5 ml-5">
                    {jewelData?.map((item: any, index: any) => (
                      <li
                        key={index}
                        className="uppercase text-sm text-gray-500 hover:text-[#A78E57]"
                      >
                        <Link
                          prefetch={true}
                          href={`/jewellery-type/${item.type}`}
                        >
                          {item.name_type}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-5 ml-5">
                    {menu.submenu?.map((child, index) => (
                      <li
                        key={index}
                        className="uppercase text-sm text-gray-500 hover:text-[#A78E57]"
                      >
                        <Link prefetch={true} href={child.href}>
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="bg-gray-200 dark:bg-gray-600 h-[1px] w-full" />
            </div>
          ))}
          <Link href={url} target="_blank" className="fixed bottom-28 right-3">
            <Image
              src={"/images/icon-whatsapp.svg"}
              width={0}
              height={0}
              alt="icon-whatsapp"
              className="w-14"
            />
          </Link>
          <footer className="text-sm text-gray-400 text-center mt-10 pb-5">
            © {date} Veepearl. All Rights Reserved.
          </footer>
        </div>
      ) : (
        // DESKTOP DEVICE & TABLET DEVICE
        <></>
      )}
    </div>
  );
};

export default Footer;
