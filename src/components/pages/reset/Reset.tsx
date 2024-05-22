"use client";
import React, { useState } from "react";
import Image from "next/image";
import Img from "@/../public/images/img16.png"; // Update with your image path
import { Button, Input, Link } from "@nextui-org/react";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Implement your logic to handle password reset
    console.log(
      "New Password:",
      newPassword,
      "Confirm Password:",
      confirmPassword
    );
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
      <div className="max-w-4xl w-full space-y-8 p-6 sm:p-10 md:p-10 shadow-xl border border-gray-300 rounded-lg bg-white flex">
        <div className="w-1/3 p-4">
          <Image src={Img} alt="Background" width={250} height={250} />
        </div>
        <div className="w-2/3 flex flex-col justify-center items-center p-10">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-2">Reset Password</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  radius="sm"
                  label=" New Password"
                  labelPlacement="outside"
                />
              </div>
              <div>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  radius="sm"
                  label="Confirm Password"
                  labelPlacement="outside"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Reset Password
              </Button>
              <Link
                href="/login"
                className="block text-center text-blue-600 hover:underline mt-4"
              >
                Back To Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
