import type { Metadata } from "next";
import AboutContent from "@/components/pages/about/AboutContent";

export const metadata: Metadata = {
  title: "About Us - Braszy Clothing",
  description: "Learn more about Braszy Clothing and our mission.",
  alternates: {
    canonical: "https://www.braszyclothing.com/about",
  },
};

export default function About() {
  return <AboutContent />;
}
