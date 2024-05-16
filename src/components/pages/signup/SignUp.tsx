"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import background from "../../../../public/images/img7.png";
import { z, ZodType } from "zod"; // Ensure this path is correct
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

export const UserSchema: ZodType<FormData> = z
  .object({
    email: z
      .string()
      .email({ message: "Email is invalid" })
      .min(1, { message: "Email is required" }),

    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be more than 8 characters" }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema), // Apply the zodResolver
  });
  //   const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-custom-gradient">
      <div className="w-4/5 h-4/5 bg-white shadow-3xl rounded-lg p-8 flex overflow-hidden">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-4">Sign Up</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
            <div className="mb-6">
              <input
                type="email"
                placeholder="Your Email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Your Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Confirm Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                {...register("confirmPassword", { required: true })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs italic">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="flex ">
              <button
                className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                sign up
              </button>
            </div>
            <div className="text-center mt-4 ">Already signed up?</div>
            <div className="text-center mt-4 font-size-10">
              {" "}
              <a
                href="/login"
                className="inline-block align-baseline font-bold text-lg text-blue-700 hover:text-blue-800"
              >
                Log in
              </a>
            </div>
          </form>
        </div>
        <div className="w-1/2 flex justify-center items-center relative">
          <Image
            src={background}
            alt="Decorative image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
