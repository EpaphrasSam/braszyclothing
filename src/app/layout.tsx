import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import "react-multi-carousel/lib/styles.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Braszy Clothing",
  description: "Your one stop for all your fashion needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <Toaster position="top-center" />
        <SessionProvider>
          <Providers>
            <Script
              async
              src="https://cdn.promotekit.com/promotekit.js"
              data-promotekit="a3158f09-4e6b-42df-81a1-386c584a61ad"
            ></Script>
            <main>{children}</main>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
