import Login from "@/components/pages/login/Login";
import getSession from "@/utils/auth/getSession";

export default async function LoginPage() {
  const session = await getSession();
  return <Login />;
}
