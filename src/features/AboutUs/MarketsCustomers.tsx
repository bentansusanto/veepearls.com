import { heading } from "@/components/ui/font-family";
import { ourMarketCustomer } from "@/lib/about-pearl-data";
import Image from "next/image";

const MarketsCustomers = () => {
  return (
    <div className={`bg-market-customer p-5 mb-5`}>
      <div className="flex flex-col items-center justify-center text-white">
        <Image
          src={`/images/${ourMarketCustomer.image}`}
          width={0}
          height={0}
          alt="images-about-key-consideration"
          className="w-[70%]"
        />
        <div className="space-y-10 mt-10">
          <h1
            className={`font-heading text-xl capitalize
                text-center font-semibold lg:text-2xl ${heading.className}`}
            style={{ lineHeight: "130%" }}
          >
            {ourMarketCustomer.heading}
          </h1>

          <div className="text-white">
            <div className="mb-10 space-y-5">
              <div className="space-y-3">
                <h2
                  className={`${heading.className} font-semibold capitalize font-heading`}
                >
                  {ourMarketCustomer.content1.heading}
                </h2>
                <p className="text-gray-400 text-sm">
                  {ourMarketCustomer.content1.body}
                </p>
              </div>
            </div>

            <div className="mb-10 space-y-5 ">
              <div className="space-y-3">
                <h2
                  className={`${heading.className} font-semibold capitalize font-heading`}
                >
                  {ourMarketCustomer.content2.heading}
                </h2>
                <p className="text-gray-400 text-sm">
                  {ourMarketCustomer.content2.body}
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-3">
                <h2
                  className={`${heading.className} capitalize font-semibold font-heading`}
                >
                  {ourMarketCustomer.content3.heading}
                </h2>
                <p className="text-gray-400 text-sm">
                  {ourMarketCustomer.content3.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MarketsCustomers;
