"use client";
import React, { useState } from "react";
import illustration from "@/../public/images/img14.png"; // Ensure correct path
import Image from "next/image";
import { Button, Input } from "@heroui/react";
import toast from "react-hot-toast";
import {
  checkIfEmailExistsAction,
  sendOtpAction,
} from "@/services/authServices";
import { getEmailCookie, setEmailCookie } from "@/helpers/cookies";
import { useRouter } from "next/navigation";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const checkIfEmailExists = await checkIfEmailExistsAction(email, true);
      if (
        typeof checkIfEmailExists === "object" &&
        "error" in checkIfEmailExists
      )
        throw new Error(checkIfEmailExists.error);
      if (checkIfEmailExists) {
        const response = await sendOtpAction(email);
        if (response.error) throw new Error(response.error);
        setEmailCookie(email);
        router.push("/otp-verification");
      } else {
        toast.error("Email not found");
      }
    } catch (error: any) {
      const errorMessage = error.message || "Something went wrong";
      toast.error(
        errorMessage.length > 20 ? "Something went wrong" : errorMessage
      );
    } finally {
      setIsLoading(false);
      getEmailCookie();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full space-y-8 p-6 sm:p-10 md:p-10 shadow-xl border border-gray-300 rounded-lg bg-white">
        <div className="flex justify-center">
          <Image
            src={illustration}
            alt="Forgot"
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
            variant="bordered"
            type="email"
            name="email"
            fullWidth
            required
            labelPlacement="outside"
            size="lg"
            label="Email"
            value={email}
            radius="none"
            isRequired
            onChange={(e) => setEmail(e.target.value)}
            // startContent={<CiMail size={24} />}
          />
          <Button
            type="submit"
            className="w-full flex justify-center py-2 px-4 text-sm sm:text-base font-medium rounded-md text-white bg-black hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            isLoading={isLoading}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
