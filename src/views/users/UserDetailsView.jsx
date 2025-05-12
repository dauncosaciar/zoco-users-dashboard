import ProfileInformation from "@/components/users/ProfileInformation";
import useAuth from "@/hooks/useAuth";
import { ADMIN } from "@/utils/constants";
import { Navigate } from "react-router-dom";

export default function UserDetailsView() {
  const { role } = useAuth();

  return role === ADMIN ? (
    <div className="user-details-view">
      <ProfileInformation />
    </div>
  ) : (
    <Navigate to="/dashboard" />
  );
}
