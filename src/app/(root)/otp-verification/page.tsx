import OTP from "@/components/pages/otp-verification/OTP";
import { Suspense } from "react";

export async function OTPVerification() {
  return (
    <Suspense>
      <OTP />
    </Suspense>
  );
}
