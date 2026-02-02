"use client";

import { Card } from "@heroui/react";

export default function AboutContent() {
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
        </div>
      </main>
    </>
  );
}
