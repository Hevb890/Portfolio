import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
// @ts-expect-error CSS side-effect imports are handled by Next.js.
import "@/app/globals.css";

const font = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// Change the description to reflect your portfolio content and skills. This will help with SEO and provide a better user experience.
export const metadata: Metadata = {
  title: "Hevindu Tilakasena",
  description:
    "Interactive portfolio of a UX/UI designer: explore case studies, process and skills as a connected graph.", 
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f4f7f4",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={font.variable}>
      <body>{children}</body>
    </html>
  );
}
