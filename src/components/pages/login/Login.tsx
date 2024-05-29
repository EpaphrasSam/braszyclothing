"use client";

import React from "react";
import Image from "next/image";
import LoginForm from "@/components/global/LoginForm";

const Login = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-custom-gradient">
      <div className="m-4 sm:w-3/5 w-full bg-white shadow-3xl rounded-lg md:p-8 p-2 flex justify-center items-center lg:flex-row flex-col-reverse ">
        <div className="p-8 w-full max-sm:p-4 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-4">Login</h1>
          <LoginForm isVisible={true} />
        </div>
        <div className="w-1/2 lg:w-full flex justify-center items-center relative flex-grow">
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
