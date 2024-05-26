"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Input, Button } from "@nextui-org/react";
import * as z from "zod";
import { CiMail, CiUser, CiEdit } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/user";

export type FormData = {
  name: string;
  email: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

const ChangeProfile = () => {
  const router = useRouter();
  const setUserData = useUserStore((state) => state.setUserData);
  const [isLoading, setIsLoading] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const [initialValues, setInitialValues] = useState<FormData>({
    name: "John Doe",
    email: "johndoe@example.com",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const SignUpSchema = z
    .object({
      name: editName
        ? z.string().nonempty("Name is required")
        : z.string().optional(),
      email: z.string().email("Invalid email address"),
      oldPassword: editPassword
        ? z.string().nonempty("Old password is required")
        : z.string().optional(),
      password: editPassword
        ? z.string().min(6, "Password must be at least 6 characters")
        : z.string().optional(),
      confirmPassword: editPassword
        ? z.string().nonempty("Confirm password is required").min(6)
        : z.string().optional(),
    })
    .refine(
      (data) => {
        if (editPassword && data.password !== data.confirmPassword) {
          return false;
        }
        return true;
      },
      {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      }
    );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      // Handle form submission logic here
      console.log("Form Data:", data);
      setUserData(data);
      setIsLoading(false);
      router.push("/profile"); // Redirect to profile page after save
    } catch (error) {
      console.error("Error saving profile:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (editName) {
      setValue("name", ""); // Clear the name field
    } else {
      setValue("name", initialValues.name); // Set initial name value
    }
  }, [editName, setValue, initialValues.name]);

  useEffect(() => {
    if (editPassword) {
      setValue("oldPassword", ""); // Clear the old password field
      setValue("password", ""); // Clear the new password field
      setValue("confirmPassword", ""); // Clear the confirm password field
    } else {
      setValue("oldPassword", initialValues.oldPassword); // Set initial old password value
      setValue("password", initialValues.password); // Set initial password value
      setValue("confirmPassword", initialValues.confirmPassword); // Set initial confirm password value
    }
  }, [
    editPassword,
    setValue,
    initialValues.oldPassword,
    initialValues.password,
    initialValues.confirmPassword,
  ]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-custom-gradient">
      <div className="m-4 sm:w-3/5 w-full bg-white shadow-3xl rounded-lg md:p-8 p-2 flex justify-center items-center lg:flex-row flex-col-reverse ">
        <div className="p-8 w-full max-sm:p-4 flex flex-col justify-center items-center flex-grow">
          <h1 className="text-3xl font-bold mb-4">Edit Profile</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm mb-3"
          >
            <div className="mb-6 flex flex-col gap-4">
              <div className="relative">
                <Input
                  variant="bordered"
                  type="text"
                  radius="none"
                  label="Name"
                  labelPlacement="outside"
                  placeholder="Enter your name"
                  errorMessage={errors.name?.message}
                  isDisabled={!editName}
                  startContent={<CiUser size={24} />}
                  isInvalid={!!errors.name}
                  {...register("name")}
                />
                <CiEdit
                  size={24}
                  className="absolute right-2 top-9 cursor-pointer"
                  onClick={() => setEditName(!editName)}
                />
              </div>

              <div className="relative">
                <Input
                  variant="bordered"
                  type="email"
                  radius="none"
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Enter your email"
                  errorMessage={errors.email?.message}
                  isInvalid={!!errors.email}
                  startContent={<CiMail size={24} />}
                  {...register("email")}
                  defaultValue={initialValues.email}
                  isDisabled
                />
              </div>

              <div className="relative">
                <Input
                  variant="bordered"
                  type="password"
                  radius="none"
                  label="Password"
                  labelPlacement="outside"
                  placeholder="Enter your password"
                  isDisabled
                  startContent={<RiLockPasswordLine size={24} />}
                />
                <CiEdit
                  size={24}
                  className="absolute right-2 top-9 cursor-pointer"
                  onClick={() => setEditPassword(!editPassword)}
                />
              </div>
              {editPassword && (
                <>
                  <Input
                    variant="bordered"
                    type="password"
                    radius="none"
                    label="Old Password"
                    labelPlacement="outside"
                    placeholder="Enter your old password"
                    errorMessage={errors.oldPassword?.message}
                    isInvalid={!!errors.oldPassword}
                    startContent={<RiLockPasswordLine size={24} />}
                    {...register("oldPassword")}
                  />
                  <Input
                    variant="bordered"
                    type="password"
                    radius="none"
                    label="New Password"
                    labelPlacement="outside"
                    placeholder="Enter your new password"
                    errorMessage={errors.password?.message}
                    isInvalid={!!errors.password}
                    startContent={<RiLockPasswordLine size={24} />}
                    {...register("password")}
                  />
                  <Input
                    variant="bordered"
                    type="password"
                    radius="none"
                    label="Confirm New Password"
                    labelPlacement="outside"
                    placeholder="Confirm your new password"
                    errorMessage={errors.confirmPassword?.message}
                    isInvalid={!!errors.confirmPassword}
                    startContent={<RiLockPasswordLine size={24} />}
                    {...register("confirmPassword")}
                  />
                </>
              )}
            </div>
            <div className="flex">
              <Button
                fullWidth
                className="bg-black hover:opacity-75 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                // isLoading={isLoading}
              >
                Save
              </Button>
            </div>
          </form>
          <Button
            fullWidth
            className="bg-red-500 hover:opacity-75 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            // isLoading={isLoading}
          >
            Delete Account
          </Button>
        </div>
        <div className="w-1/2 lg:w-full flex justify-center items-center relative">
          <Image
            src="/images/img18.png"
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

export default ChangeProfile;
