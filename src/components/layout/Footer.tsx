"use client";

import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Input } from "@nextui-org/react";
import { FaArrowRightLong } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mx-auto w-full">
      <div className="container mx-auto px-4 md:block flex flex-col justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-gray-400 hover:underline"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-gray-400 hover:underline"
                >
                  Shipping & Returns
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/faq"
                  className="hover:text-gray-400 hover:underline"
                >
                  FAQ
                </Link>
              </li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-gray-400 hover:underline"
                >
                  About Us
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/careers"
                  className="hover:text-gray-400 hover:underline"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-gray-400 hover:underline"
                >
                  Blog
                </Link>
              </li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4 justify-center">
              <Link
                href="https://www.facebook.com/braszyclothing"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 hover:underline"
              >
                <FaFacebook size={24} />
              </Link>
              <Link
                href="https://www.instagram.com/braszyclothing/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 hover:underline"
              >
                <FaInstagram size={24} />
              </Link>
              <Link
                href="https://twitter.com/braszyclothing"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 hover:underline"
              >
                <FaTwitter size={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <div className="flex flex-col justify-center items-center">
            <p className="mb-2">Subscribe to our emails</p>
            <Input
              label="Email"
              className="text-black mb-4 w-[350px]"
              variant="faded"
              radius="none"
              endContent={
                <FaArrowRightLong
                  size={20}
                  color="black"
                  className="cursor-pointer hover:opacity-50 hover:scale-125 transition-all"
                />
              }
            />
          </div>
          <p>
            &copy; {new Date().getFullYear()} Braszy Clothing. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
