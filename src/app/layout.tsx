import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import "react-multi-carousel/lib/styles.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import Head from "next/head";

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
      <head>
        <script
          id="trustpilot-script"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,r,n){w.TrustpilotObject=n;w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)};
            a=d.createElement(s);a.async=1;a.src=r;a.type='text/java'+s;f=d.getElementsByTagName(s)[0];
            f.parentNode.insertBefore(a,f)})(window,document,'script', 'https://invitejs.trustpilot.com/tp.min.js', 'tp');
            tp('register', 'CbshEyqQHHTu288h');`,
          }}
        ></script>
        <script
          type="text/javascript"
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          async
        ></script>
      </head>
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
