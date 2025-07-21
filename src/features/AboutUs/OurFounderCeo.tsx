import { heading } from "@/components/ui/font-family";
import { foundePage, ourMarketCustomer } from "@/lib/about-pearl-data";
import Image from "next/image";

const OurFounderAndCeo = () => {
  return(
    <div className={`bg-founder-ceo p-5 mb-5`}>
      <div className="flex flex-col items-center justify-center text-white">
        <Image
          src={`/images/${foundePage.image}`}
          width={0}
          height={0}
          alt="images-founder-ceo"
          className="w-[70%]"
        />
        <div className="space-y-10 mt-10">
          <h1
            className={`font-heading text-xl capitalize
                text-center font-semibold lg:text-2xl ${heading.className}`}
            style={{ lineHeight: "130%" }}
          >
            {foundePage.heading}
          </h1>

          <div className="text-white">
            <div className="mb-10 space-y-5">
              <div className="space-y-3">
                <h2
                  className={`${heading.className} font-medium capitalize font-heading`}
                >
                  {foundePage.content.heading}
                </h2>
                <p className="text-gray-400 text-sm">
                  {foundePage.content.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OurFounderAndCeo;