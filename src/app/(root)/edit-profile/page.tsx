import ChangeProfile from "@/components/pages/editprofile/ChangeProfile";
import { auth } from "@/utils/auth/auth";

export default async function EditProfile() {
  const session = await auth();
  return <ChangeProfile session={session} />;
}
