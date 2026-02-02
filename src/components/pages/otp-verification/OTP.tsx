"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import picture from "@/../public/images/img14.png";
import { Button, Input } from "@heroui/react";
import { useStore } from "@/store/useStore";
import useUserStore from "@/store/user";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import {
  loginAction,
  sendOtpAction,
  verifyOtpAction,
} from "@/services/authServices";
import { deleteEmailCookie, getEmailCookie } from "@/helpers/cookies";

const OTP = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userData = useStore(useUserStore, (state) => state.userData);
  const setUserData = useUserStore((state) => state.setUserData);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isFilled, setIsFilled] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  const redirect = searchParams.get("redirect");

  useEffect(() => {
    const fetchEmailCookie = async () => {
      const emailCookie = getEmailCookie();
      setEmail(emailCookie);
    };

    fetchEmailCookie();
  }, []);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    setIsFilled(otp.every((value) => value !== ""));
  }, [otp]);

  const handleSubmit = async (event: React.FormEvent) => {
    if (!email) return;
    event.preventDefault();
    setIsLoading(true);
    try {
      if (userData) {
        const response = await axios.post("/api/signup", {
          email: userData?.email,
          otp: otp.join(""),
          name: userData?.name,
          password: userData?.password,
        });
        if (response.data.error) throw new Error(response.data.error);
        await loginAction(userData?.email!, userData?.password!);
        toast.success("Account created successfully");
        window.location.href = redirect || "/";
      } else {
        const response = await verifyOtpAction(otp.join(""), email);
        if (response.error) throw new Error(response.error);
        router.push("/reset-password");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data || error?.message || "Something went wrong";
      toast.error(
        errorMessage.length > 20 ? "Something went wrong" : errorMessage
      );
      deleteEmailCookie();
      router.replace(userData ? "/signup" : "/forgot-password");
    } finally {
      setUserData(null);
      setIsLoading(false);
    }
  };

  const sendOtp = async () => {
    if (!email) return;
    try {
      const response = await sendOtpAction(email);
      if (response.error) throw new Error(response.error);
      toast.success("OTP sent successfully");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex p-4 my-4 h-screen items-center justify-center bg-gray-100">
        <div className="sm:w-4/5 w-full max-w-4xl bg-white shadow-lg rounded-lg sm:p-8 p-2 flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start p-4">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">OTP</h1>
            <div className="mb-6">
              <p className="text-gray-600 mb-1  text-center lg:text-left">
                Please enter the OTP sent to your email
              </p>
              <p className="text-gray-600 text-xs">
                OTP will expire in 10 minutes
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center lg:items-start"
            >
              <div className="flex space-x-2 mb-6">
                {otp.map((data, index) => {
                  return (
                    <Input
                      aria-label="otp"
                      size="lg"
                      variant="bordered"
                      key={index}
                      type="text"
                      maxLength={1}
                      ref={(el: HTMLInputElement | null) => {
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
                      classNames={{ input: "text-center" }}
                    />
                  );
                })}
              </div>
              <div>
                <div className="text-gray-600 mb-4 flex gap-2 text-center lg:text-left">
                  Didn&apos;t receive an OTP?{" "}
                  <div
                    onClick={sendOtp}
                    className={` ${email ? "text-blue-500 cursor-pointer font-bold hover:opacity-80 transition-all ease-in-out duration-300 hover:scale-105" : "text-gray-400 cursor-not-allowed"}`}
                  >
                    Resend OTP
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                color={!isFilled ? "default" : "primary"}
                className={`font-bold py-2 px-4 rounded w-full `}
                disabled={!isFilled}
                isLoading={isLoading || !email}
              >
                Submit
              </Button>
            </form>
          </div>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 flex justify-center items-center">
            <Image
              src={picture}
              alt="Verification"
              width={400}
              height={400}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OTP;
