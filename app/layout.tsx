import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./components/Nav/Header";
import { CartProvider } from "./_contexts/CartContext";
import { Toaster } from "react-hot-toast";

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
        className={` text-grey-700 min-h-screen flex flex-col ${montserrat.className} overflow-x-hidden antialiased`}
      >
        <CartProvider>
          <Header />

          <div className="flex-1 px-4 sm:px-6 md:px-8  pb-8 lg:py-12 grid">
            <main className="max-w-[1350px] mx-auto w-full">{children}</main>
          </div>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#fff",
                color: "#222",
                border: "1px solid #eee",
                fontSize: "13px",
                fontWeight: "bold",
                padding: "12px 16px",
                borderRadius: "10px",
                boxShadow:
                  "0 2px 8px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "var(--color-brand-500)",
                  secondary: "#fff",
                },
                style: {
                  borderLeft: "6px solid var(--color-brand-500)",
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: "#dc2626",
                  secondary: "#fff",
                },
                style: {
                  borderLeft: "6px solid #dc2626",
                },
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
