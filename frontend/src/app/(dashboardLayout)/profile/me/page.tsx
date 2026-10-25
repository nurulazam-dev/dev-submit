import MyProfile from "@/components/modules/Dashboard/Common/MyProfile";
import { getUserInfo } from "@/services/auth.services";

export default async function ProfilePage() {
  const userData = await getUserInfo();

  return (
    <div className="container mx-auto">
      <MyProfile userData={userData} />
    </div>
  );
}
