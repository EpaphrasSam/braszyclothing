import SignUp from "@/components/pages/signup/SignUp";
import { Suspense } from "react";

export default function SignUpPage() {
  return (
    <Suspense>
      <SignUp />
    </Suspense>
  );
}
