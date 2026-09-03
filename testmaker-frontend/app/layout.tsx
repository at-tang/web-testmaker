import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import MenuButton from "./Components/Menu/MenuButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Testmaker",
  description: "Testmaker App",
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} h-full antialiased font-dm-sans`}
    >
      <body className="min-h-full flex flex-col font-dm-sans">
        <MenuButton/>
        {children}
        </body>
    </html>
  );
}
