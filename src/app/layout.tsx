import "../index.css";
import Providers from "./providers";

export const metadata = {
  title: "eHealthJOBS - Global Healthcare Recruitment Solutions",
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
