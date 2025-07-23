import { Comfortaa } from "next/font/google";

export const comfortaa = Comfortaa({
  subsets: ["latin", "latin-ext"], // Türkçe karakterler için
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-comfortaa",
  display: "swap",
});
