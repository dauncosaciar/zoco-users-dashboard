import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { ADMIN } from "@/utils/constants";

export default function ProfileView() {
  const { user } = useAuth();

  if (user?.role !== ADMIN) return <Navigate to="/dashboard" />;

  return (
    <div>
      <h2>Mi Perfil</h2>
      <p>Nombre: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Rol: {user?.role}</p>
    </div>
  );
}
