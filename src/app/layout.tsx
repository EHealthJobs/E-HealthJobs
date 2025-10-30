import "../index.css";
import Providers from "./providers";
import { Playfair_Display, Inter } from "next/font/google"; // import Google fonts

// Load fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "eHealthJOBS - Global Healthcare Recruitment Solutions",
  icons: {
    icon: "https://static.wixstatic.com/media/790a51_606f3f9208aa404bbf8268164deecdb3~mv2.png/v1/fill/w_670,h_274,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/790a51_606f3f9208aa404bbf8268164deecdb3~mv2.png",
  },
  description:
    "Transform your healthcare staffing with zero travelers. Save millions with our global recruitment solutions for nurses and allied health professionals.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-white text-black font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
