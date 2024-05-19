import crypto from "crypto";
import { Resend } from "resend";
import prisma from "./prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const encryptOTP = (otp: string, email: string): string => {
  const algorithm = "aes-256-cbc";
  const key = crypto.createHash("sha256").update(email).digest();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(otp, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
};

export const decryptOTP = (encryptedOtp: string, email: string): string => {
  const [iv, content] = encryptedOtp.split(":");
  const key = crypto.createHash("sha256").update(email).digest();
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    key,
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(Buffer.from(content, "hex"));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

export const sendOTP = async (otp: string, email: string): Promise<void> => {
  const message = `<p> Your OTP is:</p> <strong>${otp}</strong>`;
  try {
    const { error, data }: any = await resend.emails.send({
      from: `Braszy Clothing <${process.env.RESEND_DOMAIN_EMAIL}>`,
      to: [email],
      subject: "Your OTP",
      html: message,
    });
    if (error) {
      throw error;
    }
  } catch (error: any) {
    throw error;
  }
};

export const storeOTP = async (otp: string, email: string): Promise<void> => {
  try {
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 10);
    await prisma.otp.upsert({
      where: { email },
      update: { otp, expiry },
      create: { email, otp, expiry },
    });
  } catch (error) {
    throw error;
  }
};

export const validateOTP = async (otp: string, email: string) => {
  try {
    const storedOTPData = await prisma.otp.findUnique({
      where: { email },
    });

    if (!storedOTPData) {
      return false;
    }
    if (new Date() > storedOTPData.expiry) {
      await prisma.otp.delete({ where: { email } });
      return false;
    }

    const decryptedOtp = decryptOTP(storedOTPData.otp, email);
    await prisma.otp.delete({ where: { email } });
    return decryptedOtp === otp;
  } catch (error) {
    throw error;
  }
};
