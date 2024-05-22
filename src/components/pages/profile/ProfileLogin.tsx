"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Divider } from "@nextui-org/react";
import LoginForm from "@/components/global/LoginForm";
import Link from "next/link";

const ProfileLogin = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-4 ">
      <div className="rounded-lg">
        <h2 className="text-xl font-bold text-center mb-4">
          I already have an account
        </h2>
        <LoginForm />
      </div>
      <Divider className="my-8" />
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">I don&apos;t have an account</h2>
        <p className="text-sm mb-4">
          Enjoy added benefits and a richer experience by creating a personal
          account
        </p>
        <Link
          href="/signup"
          className="inline-block hover:text-white bg-white border border-black text-black font-bold py-3 px-6 rounded-full hover:bg-gray-600"
        >
          Create account
        </Link>
      </div>
    </div>
  );
};

export default ProfileLogin;
