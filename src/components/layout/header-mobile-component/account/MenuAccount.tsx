import { ChevronRight, Clipboard, Lock, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  userData: any;
}

const MenuAccount: React.FC<Props> = ({ userData }) => {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm text-gray-500">Personal info</p>
        <div className="dark:bg-[#181818] px-5 py-3 bg-gray-50 rounded-md">
          <div>
            <div className="space-y-1 w-full ">
              <label
                htmlFor="#"
                className="text-[11px] text-gray-400 dark:text-gray-500"
              >
                Name
              </label>
              <input
                readOnly
                placeholder={userData?.name}
                className="bg-transparent placeholder:text-black placeholder:capitalize dark:placeholder:text-gray-300 text-sm w-full outline-none"
              />
            </div>
            <div className="my-3 border-b border-gray-200 dark:border-y-gray-600" />
            <div className="space-y-1 w-full">
              <label
                htmlFor="#"
                className="text-[11px] text-gray-400 dark:text-gray-500"
              >
                Email
              </label>
              <input
                readOnly
                placeholder={userData?.email}
                className="bg-transparent placeholder:text-black dark:placeholder:text-gray-300 text-sm w-full outline-none"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-sm text-gray-500">Settings</p>
        <div className="space-y-6">
          {/* reset password */}
          <div className="space-y-1 w-full flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Lock width={20} height={20} strokeWidth={1.75} />
              <div className="space-y-1">
                <p className="text-sm dark:text-gray-100">Reset Password</p>
                <p className="text-[11px] dark:text-gray-400">
                  You can reset password
                </p>
              </div>
            </div>
              <ChevronRight width={16} height={16} strokeWidth={1.75} />
          </div>
          {/* orders */}
          <div className="space-y-1 w-full flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clipboard width={20} height={20} strokeWidth={1.75} />
              <div className="space-y-1">
                <p className="text-sm dark:text-gray-100">Order Product</p>
                <p className="text-[11px] dark:text-gray-400">
                  Check history order and current order
                </p>
              </div>
            </div>
            <Link href={"/orders"}>
              <ChevronRight width={16} height={16} strokeWidth={1.75} />
            </Link>
          </div>
          {/* delete account */}
          <div className="space-y-1 w-full flex items-center justify-between">
            <div className="flex items-center space-x-3 text-red-500">
              <Trash2 width={20} height={20} strokeWidth={1.75} />
              <div className="space-y-1">
                <p className="text-sm dark:text-red-500">Delete Account</p>
                <p className="text-[11px] dark:text-red-500">
                  Delete your account permanently
                </p>
              </div>
            </div>
            <ChevronRight
              width={16}
              height={16}
              strokeWidth={1.75}
              className="text-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuAccount;
