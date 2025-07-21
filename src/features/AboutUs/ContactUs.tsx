import { heading } from "@/components/ui/font-family";
import { contactUs } from "@/lib/about-pearl-data";
import Image from "next/image";
import Link from "next/link";

const ContactUsPage = () => {
  return(
    <div className={`bg-contact-us p-5 mb-5`}>
      <div className="flex flex-col items-center justify-center text-white">
        <Image
          src={`/images/${contactUs.image}`}
          width={0}
          height={0}
          className="w-[70%]"
          alt="img-bg-contact-us"
        />
        <div className="space-y-10 mt-10">
          <h1
            className={`font-heading text-xl capitalize
                text-center font-semibold lg:text-2xl ${heading.className}`}
            style={{ lineHeight: "130%" }}
          >
            {contactUs.heading}
          </h1>

          <div className="text-white">
            <div className="mb-10 space-y-5">
              <div className="space-y-3">
                <h2 className={`${heading.className} font-semibold capitalize font-heading`}>
                  Sales & Customize
                </h2>
                <div className="space-y-2 text-gray-300">
                  {contactUs.contact.map((list) => (
                    <p key={list} className="text-gray-400 text-sm">{list}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-10 space-y-5 ">
              <div className="space-y-3">
                <h2 className={`${heading.className} text-lg font-semibold font-heading`}>
                  Email
                </h2>
                <p className="text-gray-400 text-sm">{contactUs.email}</p>
              </div>
            </div>

            <div className="mb-10 space-y-5">
              <h2 className={`${heading.className} text-lg font-semibold font-heading`}>
                Website
              </h2>
              <Link href={contactUs.website_link} className="text-gray-400 text-sm">
                {contactUs.website}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  
}

export default ContactUsPage;
