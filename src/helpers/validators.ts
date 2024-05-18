import { z } from "zod";

export const shippingSchemaBase = z.object({
  email: z.string().email("Invalid email address"),
  contact: z.string().min(10, "Contact number should be at least 10 digits"),
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
