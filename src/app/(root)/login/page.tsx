import Login from "@/components/pages/login/Login";
import { Suspense } from "react";

export default async function LoginPage() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}
