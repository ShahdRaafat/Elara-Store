import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./components/Nav/Header";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s - Elara Store",
    default: "Welcome - Elara Store",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` text-grey-700 min-h-screen flex flex-col ${montserrat.className} antialiased`}
      >
        <Header />

        <div className="flex-1 px-4 sm:px-6 md:px-8  pb-8 lg:py-12 grid">
          <main className="max-w-[1400px] mx-auto w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
