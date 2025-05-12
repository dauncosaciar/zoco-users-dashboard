import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { ADMIN } from "@/utils/constants";
import ProfileInformation from "@/components/users/ProfileInformation";

export default function AdminProfileView() {
  const { user } = useAuth();

  if (user?.role !== ADMIN) return <Navigate to="/dashboard" />;

  return (
    <div className="profile-view">
      <ProfileInformation />
    </div>
  );
}
