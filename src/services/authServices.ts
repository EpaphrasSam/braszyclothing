"use server";

import { signIn, signOut } from "@/utils/auth/auth";
import {
  encryptOTP,
  generateOTP,
  sendOTP,
  storeOTP,
  validateOTP,
} from "@/utils/email";
import { AuthError, User } from "next-auth";
import prisma from "@/utils/prisma";
import bcrypt from "bcrypt";
import { CustomError } from "@/utils/errors";

type UserUpdatePayload = {
  name?: string;
  contact?: string;
  oldPassword?: string;
  password?: string;
};

export const checkIfEmailExistsAction = async (
  email: string,
  forgot?: boolean
) => {
  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (forgot && userExists) {
      return true;
    }
    if (userExists && !forgot) {
      throw new CustomError("Email already exists", 400);
    }
    return false;
  } catch (error: any) {
    throw new CustomError(error.message, 500);
  }
};

export const sendOtpAction = async (email: string) => {
  try {
    const otp = await generateOTP();
    const encryptedOtp = await encryptOTP(otp, email);
    await storeOTP(encryptedOtp, email);

    await sendOTP(otp, email);
    return { message: "OTP sent successfully" };
  } catch (error: any) {
    throw new CustomError(error.message, 500);
  }
};

export const verifyOtpAction = async (otp: string, email: string) => {
  try {
    const isValid = await validateOTP(otp, email);
    if (!isValid) {
      throw new CustomError("Invalid OTP", 400);
    }
    return { message: "OTP verified successfully" };
  } catch (error: any) {
    throw new CustomError(error.message, 500);
  }
};

export const loginAction = async (
  email: string,
  password: string,
  fetchUserByEmail?: boolean
) => {
  try {
    const signInOptions: Record<string, any> = {
      email,
      password,
      redirect: false,
    };

    if (typeof fetchUserByEmail === "boolean") {
      signInOptions.fetchUserByEmail = fetchUserByEmail;
    }

    await signIn("credentials", signInOptions);
  } catch (error: any) {
    if (error instanceof AuthError) {
      throw new Error(JSON.stringify({ message: error.cause?.err?.message }));
    } else {
      throw new Error(JSON.stringify({ message: "Something went wrong" }));
    }
  }
};

export const logoutAction = async () => {
  try {
    await signOut({ redirect: false });
  } catch (error) {
    throw new CustomError("Something went wrong", 500);
  }
};

export const updateProfile = async (
  userId: string,
  changedValues: UserUpdatePayload
) => {
  try {
    if (changedValues.oldPassword && changedValues.password) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new CustomError("User not found", 404);
      }

      const isMatch = await bcrypt.compare(
        changedValues.oldPassword,
        user.password
      );

      if (!isMatch) {
        throw new CustomError("Old password is incorrect", 400);
      }

      const hashedNewPassword = await bcrypt.hash(changedValues.password, 10);

      const updatePayload: UserUpdatePayload = {
        ...changedValues,
        password: hashedNewPassword,
      };

      delete updatePayload.oldPassword;

      return await prisma.$transaction(async (prisma) => {
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: updatePayload,
        });

        return updatedUser;
      });
    } else {
      const updatePayload = { ...changedValues };
      delete updatePayload.oldPassword;
      delete updatePayload.password;

      return await prisma.$transaction(async (prisma) => {
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: updatePayload,
        });

        return updatedUser;
      });
    }
  } catch (error: any) {
    throw new CustomError(error.message, 500);
  }
};

export const changePassword = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw Error("Email not found");
    }

    const hashedNewPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedNewPassword,
      },
    });

    return updatedUser;
  } catch (error: any) {
    throw new CustomError(error.message, 500);
  }
};
