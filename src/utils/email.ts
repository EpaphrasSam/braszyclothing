"use server";

import crypto from "crypto";
import { Resend } from "resend";
import prisma from "./prisma";
import { ProductType } from "@/types/SanityTypes";
import { ShippingDetails } from "@/store/cart";
import { generateInvoicePDF } from "@/components/pages/invoice/generateInvoicePDF";

const resend = new Resend(process.env.RESEND_API_KEY);

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const encryptOTP = (otp: string, email: string): string => {
  const algorithm = "aes-256-cbc";
  const key = crypto.createHash("sha256").update(email).digest();
  const iv = crypto.randomBytes(16);
  // @ts-ignore
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(otp, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
};

export const decryptOTP = (encryptedOtp: string, email: string): string => {
  const [iv, content] = encryptedOtp.split(":");
  const key = crypto.createHash("sha256").update(email).digest();
  // @ts-ignore
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    key,
    Buffer.from(iv, "hex")
  );
  // @ts-ignore
  let decrypted = decipher.update(Buffer.from(content, "hex"));
  // @ts-ignore
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

export const sendOTP = async (otp: string, email: string): Promise<void> => {
  const message = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <div style="background-color: #f7f7f7; padding: 20px; border-radius: 8px;">
        <h2 style="color: #333;">Your One-Time Password (OTP)</h2>
        <p style="font-size: 16px; color: #555;">
          Hello,
        </p>
        <p style="font-size: 16px; color: #555;">
          To ensure the security of your account, please use the following OTP to complete your verification. This OTP is valid for 10 minutes.
        </p>
        <p style="font-size: 24px; font-weight: bold; color: #333;">
          ${otp}
        </p>
        <p style="font-size: 16px; color: #555;">
          If you did not request this OTP, please ignore this email. Do not share this OTP with anyone for security reasons.
        </p>
        <p style="font-size: 16px; color: #555;">
          Thank you for choosing Braszy Clothing. We are committed to keeping your account secure.
        </p>
        <p style="font-size: 16px; color: #555;">
          Best regards,<br>
          The Braszy Clothing Team
        </p>
      </div>
    </div>
  `;
  try {
    const { error, data }: any = await resend.emails.send({
      from: `Braszy Clothing <${process.env.RESEND_EMAIL}>`,
      to: [email],
      subject: "OTP Verification",
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

    const decryptedOtp = await decryptOTP(storedOTPData.otp, email);
    await prisma.otp.delete({ where: { email } });
    return decryptedOtp === otp;
  } catch (error) {
    throw error;
  }
};

export const sendInvoiceEmail = async (
  orderID: string,
  cartItems: (ProductType & { color: string; size: string })[],
  shippingDetails: ShippingDetails,
  totalAmount: number,
  discount: number,
  shippingFee: number,
  fee: number,
  netAmount: number,
  email: string
) => {
  try {
    const pdfBuffer = await generateInvoicePDF({
      orderID,
      cartItems,
      shippingDetails,
      totalAmount,
      discount,
      fee,
      shippingFee,
      netAmount,
    });

    const pdfBase64 = Buffer.from(pdfBuffer).toString("base64");

    await resend.emails.send({
      from: `Braszy Clothing <${process.env.RESEND_EMAIL}>`,
      to: [email],
      subject: `Invoice for Your Order`,
      html: `<p>Dear Customer,</p><p>Thank you for your order. Please find your invoice attached.</p><br>Thank you for shopping with BraszyClothing`,
      attachments: [
        {
          filename: `Invoice_${orderID}.pdf`,
          content: pdfBase64,
        },
      ],
    });
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const sendCouponEmail = async (
  email: string,
  promoCode: string
): Promise<void> => {
  const message = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <div style="background-color: #f7f7f7; padding: 20px; border-radius: 8px;">
        <h2 style="color: #333;">Your Promo Code</h2>
        <p style="font-size: 16px; color: #555;">
          Hello,
        </p>
        <p style="font-size: 16px; color: #555;">
          Thank you for subscribing to our newsletter! Here is your promo code:
        </p>
        <p style="font-size: 24px; font-weight: bold; color: #333;">
          ${promoCode}
        </p>
        <p style="font-size: 16px; color: #555;">
          Use this code at checkout to enjoy your  10% discount. If you have any questions, feel free to contact us.
        </p>
        <p style="font-size: 16px; color: #555;">
          Best regards,<br>
          The Braszy Clothing Team
        </p>
      </div>
    </div>
  `;
  try {
    const { error, data }: any = await resend.emails.send({
      from: `Braszy Clothing <${process.env.RESEND_EMAIL}>`,
      to: [email],
      subject: "Your 10% Discount Promo Code",
      html: message,
    });
    if (error) {
      throw error;
    }
  } catch (error: any) {
    throw error;
  }
};

export const addAudienceEmail = async (email: string): Promise<void> => {
  try {
    await resend.contacts.create({
      email: email,
      audienceId: "fd41e8fd-5683-443b-94bc-dbb845255182",
    });
  } catch (error) {
    throw Error("Error adding email to audience");
  }
};

export const sendAdminNotificationEmail = async (
  orderID: string
): Promise<void> => {
  const message = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <div style="background-color: #f7f7f7; padding: 20px; border-radius: 8px;">
        <h2 style="color: #333;">New Order Received</h2>
        <p style="font-size: 16px; color: #555;">
          Hello Admin,
        </p>
        <p style="font-size: 16px; color: #555;">
          A new order with Order ID <strong>#${orderID}</strong> has been placed. Please check the admin dashboard for more details.
        </p>
        <p style="font-size: 16px; color: #555;">
          Thank you.
        </p>
      </div>
    </div>
  `;
  try {
    const { error, data }: any = await resend.emails.send({
      from: `Braszy Clothing <${process.env.RESEND_EMAIL}>`,
      to: ["braszy957@gmail.com"],
      subject: "New Order Received",
      html: message,
    });
    if (error) {
      throw error;
    }
  } catch (error: any) {
    throw error;
  }
};

// export const removeAudienceEmail = async (email: string): Promise<void> => {
//   try {
//     const response = await resend.audiences.list();
//     const audiences = response.data;

//     if (!audiences) {
//       throw new Error("No audiences found");
//     }

//     const audienceToRemove = audiences.find(
//       (audience: any) => audience.name === email
//     );

//     if (audienceToRemove) {
//       await resend.audiences.remove(audienceToRemove.id);
//       console.log(`Audience with email ${email} removed successfully.`);
//     } else {
//       throw new Error("Audience with email not found");
//     }
//   } catch (error) {
//     throw new Error("Error removing email from audience");
//   }
// };
