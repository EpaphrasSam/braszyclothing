import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import imageSrc from "../../../../public/images/img1.jpg"; // Correct path to the image

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Us - [Your Brand Name]</title>
        <meta
          name="description"
          content="Discover the passion and innovation behind [Your Brand Name], where fashion meets future."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center p-6">
        {/* Using Tailwind CSS for the image container */}
        <div className="w-30 h-30 relative mx-auto rounded-full overflow-hidden mb-4">
          <Image
            src={imageSrc}
            alt="About Us"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <h1 className="text-3xl font-semibold my-6 ">About Braszy</h1>
        <p className="text-lg px-6 md:px-20 font-light mb-10">
          At Braszy, we believe that clothing is not just about fashion but a
          canvas for expressing your unique identity and values. Our designs
          merge contemporary aesthetics with timeless elegance, crafted to
          empower and inspire. Every piece tells a story, yours.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-lg">
              To deliver innovative and sustainable fashion solutions that
              enhance personal expression and style.
            </p>
          </div>
          <div className="p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
            <p className="text-lg">
              To be at the forefront of fashion innovation, leading with
              creativity and integrity.
            </p>
          </div>
          <div className="p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-3">Our Goals</h2>
            <p className="text-lg">
              To set new standards in the fashion industry, ensuring quality,
              sustainability, and exceptional design.
            </p>
          </div>
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
      </main>
    </>
  );
};

export default About;
