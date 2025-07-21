'use client'
import { GetPemesan } from "@/common/Fetching/Pemesan/fetch-pemesan";
import React from "react";

interface Props {
  handleSelectPemesan: any;
  selectPemesan: string;
}

const ListDataPemesan: React.FC<Props> = ({
  handleSelectPemesan,
  selectPemesan,
}) => {
  const { data: pemesans } = GetPemesan();
  return (
    <div className="px-3 space-y-3 h-40 overflow-y-scroll">
      <p className="font-medium text-sm">List Address</p>
      <div className="space-y-3">
        {pemesans?.map((pemesan: any) => (
          <div
            onClick={() => handleSelectPemesan(pemesan.id)}
            key={pemesan.id}
            className={`${
              selectPemesan === pemesan?.id
                ? "border-orange-500"
                : "border-gray-200 dark:border-gray-600"
            } border space-y-2 p-3 rounded-md`}
          >
            <div className="flex flex-wrap items-center gap-1">
              <p className="text-xs text-gray-400">{pemesan.name}</p>
              <span className="w-1 h-1 p-0.5 rounded-full bg-gray-500" />
              <p className="text-xs text-gray-400">{pemesan.email}</p>
              <span className="w-1 h-1 p-0.5 rounded-full bg-gray-500" />
              <p className="text-xs text-gray-400">{pemesan.phone}</p>
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <p className="text-xs text-gray-400">{pemesan.city}</p>
              <span className="w-1 h-1 p-0.5 rounded-full bg-gray-500" />
              <p className="text-xs text-gray-400">{pemesan.country}</p>
              <span className="w-1 h-1 p-0.5 rounded-full bg-gray-500" />
              <p className="text-xs text-gray-400">{pemesan.zip_code}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">{pemesan.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListDataPemesan;

