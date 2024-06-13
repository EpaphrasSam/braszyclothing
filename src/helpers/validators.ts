import { z, ZodType } from "zod";
import { FormData as SignUpFormData } from "@/components/pages/signup/SignUp";
import { FormData as LoginFormData } from "@/components/global/LoginForm";

export const shippingSchemaBase = z.object({
  email: z.string().email("Invalid email address").optional(),
  contact: z
    .string()
    .min(7, "Contact number should be at least 7 digits")
    .optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  code: z.string().min(1, "Postal code is required"),
  state: z.string().optional(),
});

export const shippingSchema = shippingSchemaBase.superRefine((data, ctx) => {
  if (data.country === "United Kingdom") {
  } else if (data.country !== "United Kingdom" && !data.state) {
    ctx.addIssue({
      path: ["state"],
      message: "State is required",
      code: z.ZodIssueCode.custom,
    });
  }
});
export const validateShippingDetails = (data: any) => {
  try {
    shippingSchema.parse(data);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string> = {};
      const fieldErrorMap = error.flatten().fieldErrors;
      if (fieldErrorMap) {
        for (const field in fieldErrorMap) {
          if (fieldErrorMap.hasOwnProperty(field)) {
            const errors = fieldErrorMap[field];
            if (errors && errors.length > 0) {
              fieldErrors[field] = errors[0];
            }
          }
        }
      }
      return fieldErrors;
    }
    return { form: "An unexpected error occurred" };
  }
};

export const SignUpSchema: ZodType<SignUpFormData> = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .min(4, { message: "Name must be more than 3 characters" }),
    email: z
      .string()
      .email({ message: "Email is invalid" })
      .min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be more than 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const LoginSchema: ZodType<LoginFormData> = z.object({
  email: z
    .string()
    .email({ message: "Email is invalid" })
    .min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  // .min(8, { message: "Password must be more than 8 characters" }),
});
