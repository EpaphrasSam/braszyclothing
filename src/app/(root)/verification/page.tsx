"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import picture from "@/../public/images/img14.png";
import { Button, Input } from "@nextui-org/react";

const OtpScreen = () => {
  const [otp, setOtp] = useState(new Array(6).fill("")); // Adjusted to 4 as in the provided image
  const [isFilled, setIsFilled] = useState(false); // State to check if all fields are filled

  // Create refs for the input fields
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    // Check if all fields are filled
    setIsFilled(otp.every((value) => value !== ""));
  }, [otp]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Entered OTP:", otp.join(""));
    // Add your submit logic here
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-4/5 max-w-4xl bg-white shadow-lg rounded-lg p-8 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start p-4">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">OTP</h1>
          <p className="text-gray-600 mb-6 text-center lg:text-left">
            Please enter the OTP sent to your email
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center lg:items-start"
          >
            <div className="flex space-x-2 mb-6">
              {otp.map((data, index) => {
                return (
                  <Input
                    key={index}
                    type="text"
                    maxLength={1}
                    ref={(el) => {
                      if (el) {
                        inputRefs.current[index] = el;
                      }
                    }}
                    value={data}
                    radius="none"
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => {
                      if (e.target instanceof HTMLInputElement) {
                        e.target.select();
                      }
                    }}
                  />
                );
              })}
            </div>
            <p className="text-gray-600 mb-4 text-center lg:text-left">
              Didn't receive an OTP?{" "}
              <a href="#" className="text-gray-500 font-bold">
                Resend OTP
              </a>
            </p>
            <Button
              type="submit"
              className={`font-bold py-2 px-4 rounded w-full ${
                isFilled
                  ? "bg-gray-500 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
              disabled={!isFilled}
            >
              Submit
            </Button>
          </form>
        </div>
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 flex justify-center items-center">
          <Image
            src={picture}
            alt="Verification Illustration"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default OtpScreen;
