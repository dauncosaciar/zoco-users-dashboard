import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { ADMIN } from "@/utils/constants";
import ProfileInformation from "@/components/users/ProfileInformation";
import { changeDocumentTitle } from "@/utils/functions";

export default function AdminProfileView() {
  const { user } = useAuth();

  useEffect(() => {
    changeDocumentTitle("Mi perfil");
  }, []);

  if (user?.role !== ADMIN) return <Navigate to="/dashboard" />;

  return (
    <div className="profile-view">
      <ProfileInformation />
    </div>
  );
}
