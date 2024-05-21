"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { z, ZodType } from "zod"; // Ensure this path is correct
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Input } from "@nextui-org/react";

export const UserSchema: ZodType<FormData> = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .min(4, { message: "Name must be more than 3 characters" }),
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
  name: string;
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
      <div className="m-4 bg-white shadow-3xl rounded-lg md:p-8 p-2 flex justify-center items-center lg:flex-row flex-col-reverse ">
        <div className="sm:w-1/2 w-full max-sm:p-4 flex flex-col justify-center items-center flex-grow">
          <h1 className="text-3xl font-bold mb-4">Sign Up</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
            <div className="mb-6 flex flex-col gap-1">
              <Input
                variant="bordered"
                type="text"
                radius="none"
                label="Name"
                labelPlacement="outside"
                // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("name", { required: true })}
                errorMessage={errors.name?.message}
                isInvalid={!!errors.name}
              />
              <Input
                variant="bordered"
                type="email"
                radius="none"
                label="Email"
                labelPlacement="outside"
                // className="appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                className="bg-red  "
                {...register("email", { required: true })}
                errorMessage={errors.email?.message}
                isInvalid={!!errors.email}
              />

              <Input
                variant="bordered"
                type="password"
                // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                radius="none"
                label="Password"
                labelPlacement="outside"
                {...register("password", { required: true })}
                errorMessage={errors.password?.message}
                isInvalid={!!errors.password}
              />

              <Input
                variant="bordered"
                type="password"
                radius="none"
                label="Password"
                labelPlacement="outside"
                // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                {...register("confirmPassword", { required: true })}
                errorMessage={errors.confirmPassword?.message}
                isInvalid={!!errors.confirmPassword}
              />
            </div>
            <div className="flex ">
              <button
                className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
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
