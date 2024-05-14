import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import image from "../../../../public/images/img5.png";
import React  from "react"; // Import Text from "react";
  // Import Text component for styling text

const Contact: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contact Us - Your Brand Name</title>
        <meta
          name="description"
          content="Contact us for inquiries, support, or feedback."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white min-h-screen flex items-center justify-center p-10">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-2xl overflow-hidden flex md:flex-row flex-col">
          <div className="md:w-1/2 p-5">
            <Image
              src={image}
              alt="Contact Us"
              layout="responsive"
              width={500}
              height={500}
              objectFit="cover"
            />
          </div>
          <div className="md:w-1/2 text-center p-8">
            <h2 className="text-2xl font-bold mb-10">Contact Us</h2>
            <div className="space-y-4">
              <p className="text-lg font-semibold">
                Email: <p className="text-blue-500 font-light">contact@yourbrand.com</p>  {/* Bold for emphasis */}
              </p >
              <p className="text-lg font-semibold">
                Phone: <p className="text-blue-500 font-light">(123) 456-7890</p>  {/* Bold for emphasis */}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
