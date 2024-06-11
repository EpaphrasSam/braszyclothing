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
  keywords: "fashion, clothing, braszy, online store",
  alternates: {
    canonical: "https://www.braszyclothing.com",
  },
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
              data-promotekit="ab283b38-496d-4103-9794-5e9ecced440d"
            ></Script>
            <main>{children}</main>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
