import AdminDashboard from "@/components/users/AdminDashboard";
import NormalDashboard from "@/components/users/NormalDashboard";
import useAuth from "@/hooks/useAuth";
import { ADMIN } from "@/utils/constants";

export default function DashboardView() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="dashboard-view">
      {user.role === ADMIN ? <AdminDashboard /> : <NormalDashboard />}
    </div>
  );
}
