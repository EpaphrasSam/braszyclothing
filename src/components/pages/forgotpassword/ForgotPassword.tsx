"use client";
import React, { useState } from "react";
import illustration from "@/../public/images/img14.png"; // Ensure correct path
import Image from "next/image";
import { Button, Input } from "@nextui-org/react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Email submitted for password reset:", email);
    // Add your code to handle the password reset process
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full space-y-8 p-6 sm:p-10 md:p-10 shadow-xl border border-gray-300 rounded-lg bg-white">
        <div className="flex justify-center">
          <Image
            src={illustration}
            alt="Forgot Password Illustration"
            width={250}
            height={250}
            className="w-full max-w-xs"
          />
        </div>
        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
          Forgot Your Password?
        </h2>
        <p className="mt-2 text-center text-sm sm:text-base text-gray-600">
          Enter your email to reset your password
        </p>
        <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            fullWidth
            required
            labelPlacement="outside"
            size="lg"
            label="Email"
            value={email}
            radius="sm"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            className="w-full flex justify-center py-2 px-4 text-sm sm:text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
