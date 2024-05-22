import Login from "@/components/pages/login/Login";
import getSession from "@/utils/getSession";

export default async function LoginPage() {
  const session = await getSession();
  return <Login />;
}
