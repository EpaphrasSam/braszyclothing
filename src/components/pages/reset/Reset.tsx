"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Img from "@/../public/images/img16.png"; // Update with your image path
import { Button, Chip, Input, Link } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteEmailCookie, getEmailCookie } from "@/helpers/cookies";
import toast from "react-hot-toast";
import { changePassword } from "@/services/authServices";
import { useRouter } from "next/navigation";

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    const fetchEmailCookie = async () => {
      const emailCookie = getEmailCookie();
      setEmail(emailCookie);
    };

    fetchEmailCookie();
  }, []);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!email) return;
    setIsLoading(true);
    try {
      const response = await changePassword(email, data.newPassword);
      if (response) {
        toast.success("Password reset successfully");
        deleteEmailCookie();
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-custom-gradient">
      {/* <Chip>This page is valid for only 10 minutes</Chip> */}
      {/* <div> */}
      <div className="m-4 sm:w-3/5 w-full bg-white shadow-3xl rounded-lg md:p-8 p-2 flex justify-center items-center lg:flex-row flex-col-reverse ">
        <div className="p-8 w-full max-sm:p-4 flex flex-col justify-center items-center flex-grow">
          <h2 className="text-3xl font-bold mb-4">Reset Password</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
            <div className="mb-6 flex flex-col gap-4">
              <Input
                type="password"
                variant="bordered"
                radius="none"
                label=" Password"
                labelPlacement="outside"
                isInvalid={!!errors.newPassword}
                errorMessage={errors.newPassword?.message}
                {...register("newPassword")}
              />

              <Input
                type="password"
                variant="bordered"
                radius="none"
                label="Confirm Password"
                labelPlacement="outside"
                isInvalid={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />
            </div>
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-black hover:opacity-75 text-white font-bold py-2 px-4 rounded"
            >
              Reset Password
            </Button>
            <Link
              href="/login"
              className="block text-center text-blue-600 hover:underline mt-4"
              onClick={deleteEmailCookie}
            >
              Back To Login
            </Link>
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
      {/* </div> */}
    </div>
  );
};

export default ResetPassword;
