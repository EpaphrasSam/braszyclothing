import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/helpers/validators";
import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { z } from "zod";
import { loginAction } from "@/services/authServices";
import { useSearchParams } from "next/navigation";

export type FormData = {
  email: string;
  password: string;
};

type LoginFormProps = {
  isVisible?: boolean;
  onClose?: any;
};

const LoginForm = ({ isVisible, onClose }: LoginFormProps = {}) => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const redirect = searchParams.get("redirect");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    try {
      await loginAction(data.email, data.password);
      toast.success("Login successful");
      if (onClose) {
        window.location.reload();
        onClose();
      } else {
        window.location.href = redirect || "/";
      }
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error?.message || error?.response?.data || "Something went wrong";
      toast.error(
        errorMessage.length > 20 ? "Something went wrong" : errorMessage
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
        <div className="flex flex-col gap-4">
          <Input
            variant="bordered"
            type="email"
            radius="none"
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your email"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            startContent={<CiMail size={24} />}
            {...register("email")}
          />
          <div>
            <Input
              variant="bordered"
              type={showPassword ? "text" : "password"}
              label="Password"
              radius="none"
              labelPlacement="outside"
              placeholder="Enter your password"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              startContent={<RiLockPasswordLine size={24} />}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <RiEyeOffLine size={18} />
                  ) : (
                    <RiEyeLine size={18} />
                  )}
                </button>
              }
              {...register("password")}
            />
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-gray-600 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <Button
            isLoading={isLoading}
            fullWidth
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log in
          </Button>
        </div>
      </form>
      {isVisible && (
        <>
          <div className="flex flex-row gap-2 justify-center items-center my-3">
            <div>Don&apos;t have an account?</div>
            <div>
              <Link
                href={`/signup${redirect ? `?redirect=${redirect}` : ""}`}
                className="inline-block align-baseline font-bold text-base underline-offset-4 hover:underline text-blue-700 hover:text-blue-800"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginForm;
