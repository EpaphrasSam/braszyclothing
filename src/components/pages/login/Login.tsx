"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import background from "../../../../public/images/img6.png";
import { z, ZodType } from "zod"; // Ensure this path is correct
import { zodResolver } from "@hookform/resolvers/zod";
export type FormData = {
  email: string;
  password: string;
};
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    // resolver: zodResolver(UserSchema),
  });
  //   co

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-custom-gradient">
      <div className="w-4/5 h-4/5 bg-white shadow-3xl rounded-lg p-8 flex overflow-hidden">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-4">Login</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
            <div className="mb-4">
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                // type="submit"
              >
                Log in
              </button>
              <a
                href="#"
                className="inline-block align-baseline font-bold text-sm text-black hover:text-blue-800"
              >
                Forgot Password?
              </a>
            </div>
            <div className="text-center mt-4 ">Don't have an account?</div>
            <div className="text-center mt-4 font-size-10">
              {" "}
              <a
                href="/signup"
                className="inline-block align-baseline font-bold text-lg text-blue-700 hover:text-blue-800"
              >
                Sign Up
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

export default Login;
