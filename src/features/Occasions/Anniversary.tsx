import { heading } from "@/components/ui/font-family"
import { anniversaryData } from "@/lib/occasions-data"
import Image from "next/image"

export const AnniversaryPage = () => {
    return(
        <div className="bg-occasions-anniversary py-5 px-5">
              <div className="space-y-8 text-white">
          <Image
            src={`/images/${anniversaryData.image}`}
            width={100}
            height={100}
            className="w-auto"
            alt="anniversaryData.image"
          />
          {/* Head */}
          <div className="space-y-4 md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            <h1 className={`${heading.className} text-xl font-semibold`}>{anniversaryData.heading}</h1>
            <p className="text-gray-400 text-sm tracking-wide">{anniversaryData.body}</p>
          </div>
          {/* Details */}
          <div className="space-y-10 md:max-w-md lg:max-w-lg xl:max-w-2xl">
            {anniversaryData.details.map((list, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className={`${heading.className} text-[16px] font-semibold`}>{list.heading}</h2>
                {list.image !== undefined && (
                  <Image
                    src={`/images/${list.image}`}
                    width={100}
                    height={100}
                    className="w-auto"
                    alt="list-detail"
                  />
                )}
                {list.description.map((desc, idx) => (
                  <p key={idx} className="text-gray-400 text-sm tracking-wide">
                    {desc}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
        </div>
    )
}