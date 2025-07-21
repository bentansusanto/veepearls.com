import { Poppins, Playfair_Display } from "next/font/google";

export const body = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const heading = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
