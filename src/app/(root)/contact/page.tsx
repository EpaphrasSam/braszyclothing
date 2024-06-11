import Contact from "@/components/pages/contact/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Braszy Clothing",
  description: "Get in touch with us for any queries or support.",
  alternates: {
    canonical: "https://www.braszyclothing.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Contact />
    </>
  );
}
