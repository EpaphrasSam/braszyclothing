import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import image from "../../../../public/images/img5.png";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import React from "react";

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

      <main className="bg-custom-gradient min-h-screen flex items-center justify-center p-10">
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
          <div className="md:w-1/2  p-8">
            <h2 className="text-2xl font-bold mb-10">Contact Us</h2>
            <div className="space-y-4">
              <p className="text-lg font-semibold">
                Email:{" "}
                <span className="text-blue-500 font-light hover:underline transition ease-in-out duration-300 underline-offset-4">
                  <a href="mailto:braszyclothing@gmail.com">
                    braszyclothing@gmail.com
                  </a>
                </span>
              </p>
              <p className="text-lg font-semibold">
                Phone:{" "}
                <span className="text-blue-500 font-light">(123) 456-7890</span>
              </p>
              <div className="flex flex-col mt-auto justify-center gap-2">
                <p className="text-center text-gray-500 font-semibold">
                  Social Media
                </p>
                <div className="text-lg font-semibold ">
                  Facebook:{" "}
                  <a
                    href="https://facebook.com/yourfacebookhandle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-normal hover:underline transition ease-in-out duration-300 underline-offset-4 text-gray-600"
                  >
                    braszyclothing
                  </a>
                </div>
                <div className="text-lg font-semibold">
                  Twitter:{" "}
                  <a
                    href="https://twitter.com/yourtwitterhandle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-normal hover:underline transition ease-in-out duration-300 underline-offset-4 text-gray-600"
                  >
                    @braszyclothing
                  </a>
                </div>
                <div className="text-lg font-semibold ">
                  Instagram:{" "}
                  <a
                    href="https://instagram.com/yourinstagramhandle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-normal hover:underline transition ease-in-out duration-300 underline-offset-4 text-gray-600"
                  >
                    @braszyclothing
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
