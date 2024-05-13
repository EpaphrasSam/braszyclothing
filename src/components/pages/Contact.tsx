'use client';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { use } from 'react';
import image from'../../../public/images/img5.png'

const Contact = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
      email: { value: string };
      message: { value: string };
    };
    const formData = {
      name: target.name.value,
      email: target.email.value,
      message: target.message.value,
    };

    console.log('Form Data:', formData);
    alert('Thank you for reaching out! We will get back to you soon.');
    event.currentTarget.reset();
  };

  return (
    <>
      <Head>
        <title>Contact Us - Your Brand Name</title>
        <meta name="description" content="Contact us for inquiries, support, or feedback." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white min-h-screen flex items-center justify-center p-10">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-2xl  flex md:flex-row flex-col">
          <div className="md:w-1/2 p-5">
            <Image src={image} alt="Contact Us" layout="responsive" width={500} height={500} objectFit="cover" />
          </div>
          <div className="md:w-1/2 text-center p-8">
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input type="text" name="name" id="name" placeholder="Name" required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm" />
              </div>
              <div>
                <input type="email" name="email" id="email" placeholder="Email" required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm" />
              </div>
              <div>
                <textarea name="message" id="message" placeholder="Message" rows={4} required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm" />
              </div>
              <div>
                <button type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
