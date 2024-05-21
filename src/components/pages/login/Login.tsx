"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { z, ZodType } from "zod"; // Ensure this path is correct
import { Button, Input } from "@nextui-org/react";
export type FormData = {
  email: string;
  password: string;
};
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({});

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-custom-gradient">
      <div className="m-4 bg-white shadow-3xl rounded-lg md:p-8 p-2 flex overflow-hidden justify-center items-center lg:flex-row flex-col-reverse ">
        <div className="sm:w-1/2 w-full max-sm:p-4 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-4">Login</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
            <div className="mb-4">
              <Input
                type="email"
                // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("email", { required: true })}
                radius="none"
                label="Email"
                labelPlacement="outside"
              />
            </div>
            <div className="mb-6">
              <Input
                type="password"
                // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                {...register("password", { required: true })}
                radius="none"
                label="Password"
                labelPlacement="outside"
              />
            </div>
            <div className="flex items-center justify-between">
              <Button
                className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                // type="submit"
              >
                Log in
              </Button>
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
        <div className="w-full flex justify-center items-center relative">
          <Image
            src="/images/img7.png"
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

export default Login;
