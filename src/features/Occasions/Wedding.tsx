import { heading } from "@/components/ui/font-family"
import { weddingsData } from "@/lib/occasions-data"
import Image from "next/image"

export const WeddingPage = () => {
    return(
        <div className="bg-occasions-wedding p-5">
            <div className="space-y-8 text-white">
          <Image
            src={`/images/${weddingsData.image}`}
            width={100}
            height={100}
            className="w-auto"
            alt="weddingsData.image"
          />
          {/* Head */}
          <div className="space-y-4 md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            <h1 className={`${heading.className} text-xl font-semibold`}>{weddingsData.heading}</h1>
            <p className="text-gray-400 text-sm tracking-wide">{weddingsData.body}</p>
          </div>
          {/* Details */}
          <div className="space-y-10 md:max-w-md lg:max-w-lg xl:max-w-2xl">
            {weddingsData.steps.map((list, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className={`${heading.className} text-[16px] font-semibold`}>{list.name_steps}</h2>
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