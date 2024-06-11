"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Divider } from "@nextui-org/react";
import * as z from "zod";
import { CiMail, CiUser, CiEdit } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/user";
import { Session } from "next-auth";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import toast from "react-hot-toast";
import { loginAction, updateProfile } from "@/services/authServices";

type FormData = {
  name: string;
  email: string;
  contact: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

type FormDataWithoutConfirmPassword = Omit<FormData, "confirmPassword">;

interface EditProfileProps {
  session: Session | null;
}

const ChangeProfile = ({ session }: EditProfileProps) => {
  const router = useRouter();
  const setUserData = useUserStore((state) => state.setUserData);
  const [isLoading, setIsLoading] = useState(false);
  const [editFields, setEditFields] = useState<{
    name: boolean;
    contact: boolean;
    password: boolean;
  }>({
    name: false,
    contact: false,
    password: false,
  });

  const defaultValues = useMemo(
    () => ({
      email: session?.user?.email || "",
      name: session?.user?.name || "",
      contact: session?.user?.contact || "",
      oldPassword: "",
      password: "",
      confirmPassword: "",
    }),
    [session]
  );

  const SignUpSchema = z
    .object({
      name: editFields.name
        ? z.string().nonempty("Name is required")
        : z.string().optional(),
      email: z.string().email("Invalid email address"),
      contact: editFields.contact
        ? z.string().min(10, "Contact number should be at least 10 digits")
        : z.string().optional(),
      oldPassword: editFields.password
        ? z.string().nonempty("Old password is required")
        : z.string().optional(),
      password: editFields.password
        ? z.string().min(6, "Password must be at least 6 characters")
        : z.string().optional(),
      confirmPassword: editFields.password
        ? z.string().nonempty("Confirm password is required").min(6)
        : z.string().optional(),
    })
    .refine(
      (data) => {
        if (editFields.password && data.password !== data.confirmPassword) {
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
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: defaultValues,
  });

  const name = watch("name");
  const contact = watch("contact");
  const oldPassword = watch("oldPassword");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const isDisabled = useMemo(() => {
    const isAnyFieldInEditMode =
      editFields.name || editFields.contact || editFields.password;

    const isNameChanged = !editFields.name && defaultValues.name !== name;
    const isContactChanged =
      !editFields.contact && defaultValues.contact !== contact;
    const isPasswordFieldsFilled =
      !editFields.password && oldPassword && password && confirmPassword;
    const isPasswordMatch =
      !editFields.password && password === confirmPassword;

    return (
      isAnyFieldInEditMode ||
      !(
        isNameChanged ||
        isContactChanged ||
        (isPasswordFieldsFilled && isPasswordMatch)
      )
    );
  }, [
    editFields.name,
    editFields.contact,
    editFields.password,
    defaultValues.name,
    defaultValues.contact,
    name,
    contact,
    oldPassword,
    password,
    confirmPassword,
  ]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      const { confirmPassword, ...dataWithoutConfirmPassword } = data;

      const changedValues = (
        Object.keys(dataWithoutConfirmPassword) as Array<
          keyof FormDataWithoutConfirmPassword
        >
      ).reduce((acc: Partial<FormDataWithoutConfirmPassword>, key) => {
        if (dataWithoutConfirmPassword[key] !== defaultValues[key]) {
          acc[key] = dataWithoutConfirmPassword[key];
        }
        return acc;
      }, {});
      const response = await updateProfile(session?.user?.id!, changedValues);
      if (response) {
        await loginAction(response.email, response.password, true);
        if (changedValues.oldPassword && changedValues.password) {
          toast.success("Password updated successfully");
        } else {
          toast.success("Profile updated successfully");
        }
        reset(defaultValues);
        window.location.reload();
      }
    } catch (error: any) {
      const errorMessage = error.message || "Something went wrong";
      toast.error(
        errorMessage.length > 20 ? "Something went wrong" : errorMessage
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-custom-gradient">
      <div className="m-4 sm:w-3/5 w-full bg-white shadow-3xl rounded-lg md:p-4 flex justify-center items-center lg:flex-row flex-col-reverse ">
        <div className="p-8 w-full max-sm:p-4 flex flex-col justify-center items-center flex-grow">
          <h1 className="text-3xl font-bold mb-4">Edit Profile</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm mb-3"
          >
            <div className="mb-6 flex flex-col gap-4">
              <div className="relative">
                <Input
                  variant="underlined"
                  type="email"
                  radius="sm"
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Enter your email"
                  errorMessage={errors.email?.message}
                  isInvalid={!!errors.email}
                  startContent={<CiMail size={24} />}
                  {...register("email")}
                  defaultValue={defaultValues.email}
                  isReadOnly
                />
              </div>

              <div className="relative">
                <Input
                  variant="bordered"
                  type="text"
                  radius="sm"
                  label="Name"
                  labelPlacement="outside"
                  placeholder="Enter your name"
                  value={name}
                  errorMessage={errors.name?.message}
                  isDisabled={!editFields.name}
                  startContent={<CiUser size={24} />}
                  isInvalid={!!errors.name}
                  {...register("name")}
                />
                {!editFields.name ? (
                  <CiEdit
                    className="absolute right-2 top-9 cursor-pointer"
                    size={24}
                    onClick={() =>
                      setEditFields((prev) => ({ ...prev, name: true }))
                    }
                  />
                ) : (
                  <AiOutlineClose
                    className="absolute right-2 top-9 cursor-pointer"
                    size={24}
                    onClick={() =>
                      setEditFields((prev) => ({ ...prev, name: false }))
                    }
                  />
                )}
              </div>

              <div className="relative">
                <Input
                  variant="bordered"
                  type="number"
                  radius="sm"
                  label="Contact"
                  value={contact}
                  labelPlacement="outside"
                  placeholder="Enter your contact"
                  errorMessage={errors.contact?.message}
                  isDisabled={!editFields.contact}
                  startContent={<CiUser size={24} />}
                  isInvalid={!!errors.contact}
                  {...register("contact")}
                />
                {!editFields.contact ? (
                  <CiEdit
                    className="absolute right-2 top-9 cursor-pointer"
                    size={24}
                    onClick={() =>
                      setEditFields((prev) => ({ ...prev, contact: true }))
                    }
                  />
                ) : (
                  <AiOutlineClose
                    className="absolute right-2 top-9 cursor-pointer"
                    size={24}
                    onClick={() =>
                      setEditFields((prev) => ({ ...prev, contact: false }))
                    }
                  />
                )}
              </div>

              <Divider className="my-2" />

              <div className="relative">
                <Input
                  variant="bordered"
                  type="password"
                  radius="sm"
                  label="Password Change"
                  labelPlacement="outside"
                  placeholder="Change your password"
                  isDisabled
                  startContent={<RiLockPasswordLine size={24} />}
                />
                {!editFields.password ? (
                  <CiEdit
                    className="absolute right-2 top-9 cursor-pointer"
                    size={24}
                    onClick={() =>
                      setEditFields((prev) => ({ ...prev, password: true }))
                    }
                  />
                ) : (
                  <AiOutlineClose
                    className="absolute right-2 top-9 cursor-pointer"
                    size={24}
                    onClick={() =>
                      setEditFields((prev) => ({ ...prev, password: false }))
                    }
                  />
                )}
              </div>
              {editFields.password && (
                <>
                  <Input
                    variant="bordered"
                    type="password"
                    radius="sm"
                    label="Old Password"
                    value={oldPassword}
                    labelPlacement="outside"
                    placeholder="Enter your old password"
                    errorMessage={errors.oldPassword?.message}
                    isInvalid={!!errors.oldPassword}
                    {...register("oldPassword")}
                  />
                  <Input
                    variant="bordered"
                    type="password"
                    radius="sm"
                    label="New Password"
                    value={password}
                    labelPlacement="outside"
                    placeholder="Enter your new password"
                    errorMessage={errors.password?.message}
                    isInvalid={!!errors.password}
                    {...register("password")}
                  />
                  <Input
                    variant="bordered"
                    type="password"
                    radius="sm"
                    label="Confirm Password"
                    value={confirmPassword}
                    labelPlacement="outside"
                    placeholder="Confirm your new password"
                    errorMessage={errors.confirmPassword?.message}
                    isInvalid={!!errors.confirmPassword}
                    {...register("confirmPassword")}
                  />
                </>
              )}
            </div>
            <div className="flex">
              <Button
                fullWidth
                className={`${isDisabled ? "bg-gray-500 " : "bg-black "} hover:opacity-75 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                type="submit"
                isDisabled={isDisabled}
                isLoading={isLoading}
              >
                Save
              </Button>
            </div>
          </form>
          {/* <div className="w-full max-w-sm mb-3">
            <Button
              fullWidth
              className="bg-red-500 hover:opacity-75 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Delete Account
            </Button>
          </div> */}
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
