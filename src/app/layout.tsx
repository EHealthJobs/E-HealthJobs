import "../index.css";
import Providers from "./providers";

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
    <html lang="en">
      <body className="bg-white text-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
