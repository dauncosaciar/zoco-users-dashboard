import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import ProfileInformation from "@/components/users/ProfileInformation";
import useAuth from "@/hooks/useAuth";
import useUsers from "@/hooks/useUsers";
import { ADMIN } from "@/utils/constants";
import { changeDocumentTitle } from "@/utils/functions";

export default function UserDetailsView() {
  const { role } = useAuth();
  const { selectedUser } = useUsers();

  useEffect(() => {
    if (selectedUser) {
      const documentTitle = `Detalles del Usuario: ${selectedUser.name}, ${selectedUser.lastName}`;
      changeDocumentTitle(documentTitle);
    }
  }, [selectedUser]);

  return role === ADMIN ? (
    <div className="user-details-view">
      <ProfileInformation />
    </div>
  ) : (
    <Navigate to="/dashboard" />
  );
}
