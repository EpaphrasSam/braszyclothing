import { Card } from "@nextui-org/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Braszy Clothing",
  description: "Learn more about Braszy Clothing and our mission.",
  alternates: {
    canonical: "https://www.braszyclothing.com/about",
  },
};

const About = () => {
  return (
    <>
      <main className="relative bg-black bg-opacity-10 text-center p-6">
        <div className="relative z-10 text-white">
          <Card isBlurred className="mb-4">
            <h1 className="text-3xl font-semibold my-6 ">About Braszy</h1>
            <p className="text-lg font-medium px-6 md:px-20 mb-10">
              At Braszy, we believe that clothing is not just about fashion but
              a canvas for expressing your unique identity and values. Our
              designs merge contemporary aesthetics with timeless elegance,
              crafted to empower and inspire. Every piece tells a story, yours.
            </p>
          </Card>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <Card isBlurred className="p-6 shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
              <p className="text-lg">
                To deliver innovative and sustainable fashion solutions that
                enhance personal expression and style.
              </p>
            </Card>
            <Card isBlurred className="p-6 shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
              <p className="text-lg">
                To be at the forefront of fashion innovation, leading with
                creativity and integrity.
              </p>
            </Card>
            <Card isBlurred className="p-6 shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold mb-3">Our Goals</h2>
              <p className="text-lg">
                To set new standards in the fashion industry, ensuring quality,
                sustainability, and exceptional design.
              </p>
            </Card>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-6 shadow rounded-lg bg-blue-500 text-white">
              <p className="text-2xl font-bold">2K+</p>
              <p>Exclusive Designs</p>
            </div>
            <div className="p-6 shadow rounded-lg bg-orange-500 text-white">
              <p className="text-2xl font-bold">10K+</p>
              <p>Satisfied Clients</p>
            </div>
            <div className="p-6 shadow rounded-lg bg-green-500 text-white">
              <p className="text-2xl font-bold">1K+</p>
              <p>Award-Winning Creations</p>
            </div>
            <div className="p-6 shadow rounded-lg bg-red-500 text-white">
              <p className="text-2xl font-bold">1K+</p>
              <p>Global Partnerships</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
