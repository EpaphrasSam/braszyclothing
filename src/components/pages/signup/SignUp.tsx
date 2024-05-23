"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Input, Button } from "@nextui-org/react";
import { SignUpSchema } from "@/helpers/validators";
import Link from "next/link";
import { CiMail, CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  checkIfEmailExistsAction,
  sendOtpAction,
} from "@/services/authServices";
import useUserStore from "@/store/user";

export type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const router = useRouter();
  const setUserData = useUserStore((state) => state.setUserData);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      const checkIfEmailExists = await checkIfEmailExistsAction(data.email);
      if (!checkIfEmailExists) {
        await sendOtpAction(data.email);
        setUserData(data);
        router.push("/otp-verification");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-custom-gradient">
      <div className="m-4 sm:w-3/5 w-full bg-white shadow-3xl rounded-lg md:p-8 p-2 flex justify-center items-center lg:flex-row flex-col-reverse ">
        <div className="p-8 w-full max-sm:p-4 flex flex-col justify-center items-center flex-grow">
          <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
            <div className="mb-6 flex flex-col gap-4">
              <Input
                variant="bordered"
                type="text"
                radius="none"
                label="Name"
                labelPlacement="outside"
                placeholder="Enter your name"
                errorMessage={errors.name?.message}
                startContent={<CiUser size={24} />}
                isInvalid={!!errors.name}
                {...register("name")}
              />
              <Input
                variant="bordered"
                type="email"
                radius="none"
                label="Email"
                labelPlacement="outside"
                placeholder="Enter your email"
                errorMessage={errors.email?.message}
                startContent={<CiMail size={24} />}
                isInvalid={!!errors.email}
                {...register("email")}
              />
              <Input
                variant="bordered"
                type="password"
                radius="none"
                label="Password"
                labelPlacement="outside"
                placeholder="Enter your password"
                errorMessage={errors.password?.message}
                isInvalid={!!errors.password}
                startContent={<RiLockPasswordLine size={24} />}
                {...register("password")}
              />
              <Input
                variant="bordered"
                type="password"
                radius="none"
                label="Confirm Password"
                labelPlacement="outside"
                placeholder="Confirm your password"
                errorMessage={errors.confirmPassword?.message}
                isInvalid={!!errors.confirmPassword}
                startContent={<RiLockPasswordLine size={24} />}
                {...register("confirmPassword")}
              />
            </div>
            <div className="flex">
              <Button
                fullWidth
                className="bg-black hover:opacity-75 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                isLoading={isLoading}
              >
                Sign Up
              </Button>
            </div>
            <div className="flex flex-row gap-2 justify-center items-center my-3">
              <div>Already signed up?</div>
              <div>
                <Link
                  href="/login"
                  className="inline-block align-baseline sm:flex flex-row-bold text-base underline-offset-4 hover:underline text-blue-700 hover:text-blue-800"
                >
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="w-1/2 lg:w-full flex justify-center items-center relative">
          <Image
            src="/images/img6.png"
            alt="Decorative image"
            width={500}
            height={500}
            className="object-cover object-center w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
