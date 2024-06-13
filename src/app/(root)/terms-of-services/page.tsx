import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Braszy Clothing",
  description: "Read and agree to the terms of service of Braszy Clothing.",
  alternates: {
    canonical: "https://www.braszyclothing.com/terms-of-services",
  },
};

export default function TermsOfServices() {
  return (
    <div className="p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl text-center font-bold mb-4">
          Terms of Service
        </h1>

        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Introduction</h2>
        <p className="mb-4">
          Welcome to Braszy Clothing. By accessing or using our website, you
          agree to comply with and be bound by these Terms of Service. If you do
          not agree with these terms, please do not use our website.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          2. Use of the Website
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>You must be at least 18 years old to use our website.</li>
          <li>
            You agree to use the website only for lawful purposes and in a way
            that does not infringe the rights of others or restrict their use of
            the website.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          3. Account Registration
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            To access certain features, you may need to register an account.
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your
            account information and for all activities that occur under your
            account.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          4. Intellectual Property
        </h2>
        <p className="mb-4">
          All content on this website, including text, graphics, logos, and
          images, is the property of Braszy Clothing or its content suppliers
          and is protected by intellectual property laws. You may not reproduce,
          distribute, or create derivative works from any content on this
          website without our express written permission.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          5. Orders and Payments
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            All orders placed through our website are subject to acceptance and
            availability.
          </li>
          <li>
            We reserve the right to refuse or cancel any order for any reason.
          </li>
          <li>
            Payment must be made at the time of order placement. We accept
            various payment methods as indicated on the website.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          6. Shipping and Returns
        </h2>
        <p className="mb-4">
          Please refer to our{" "}
          <a
            href="https://www.braszyclothing.com/shipping-and-returns"
            className="text-blue-500 underline"
          >
            Shipping & Returns
          </a>{" "}
          page for detailed information on our shipping and return policies.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          7. Limitation of Liability
        </h2>
        <p className="mb-4">
          To the fullest extent permitted by law, Braszy Clothing shall not be
          liable for any indirect, incidental, special, or consequential damages
          arising out of or in connection with your use of the website. Our
          total liability to you for any claim arising out of or in connection
          with these terms shall not exceed the amount paid by you for the
          products purchased through our website.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">8. Privacy Policy</h2>
        <p className="mb-4">
          Your use of our website is also governed by our{" "}
          <a
            href="https://braszyclothing.com/privacy-policy"
            className="text-blue-500 underline"
          >
            Privacy Policy
          </a>
          , which is incorporated into these terms by reference.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          9. Changes to Terms
        </h2>
        <p className="mb-4">
          We reserve the right to modify these Terms of Service at any time. Any
          changes will be effective immediately upon posting on the website.
          Your continued use of the website after any changes constitutes your
          acceptance of the new terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">10. Governing Law</h2>
        <p className="mb-4">
          These terms shall be governed by and construed in accordance with the
          laws of [Your Country/State], without regard to its conflict of law
          principles.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">11. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms of Service, please contact
          us at{" "}
          <a
            href="mailto:braszy957@gmail.com"
            className="text-blue-500 underline"
          >
            braszy957@gmail.com
          </a>
          .
        </p>

        <p className="mt-6">
          By using our website, you acknowledge that you have read, understood,
          and agree to be bound by these Terms of Service.
        </p>
      </div>
    </div>
  );
}
