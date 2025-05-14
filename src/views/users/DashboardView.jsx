import { useEffect } from "react";
import AdminDashboard from "@/components/users/AdminDashboard";
import NormalDashboard from "@/components/users/NormalDashboard";
import useAuth from "@/hooks/useAuth";
import { ADMIN } from "@/utils/constants";
import { changeDocumentTitle } from "@/utils/functions";

export default function DashboardView() {
  const { user } = useAuth();

  useEffect(() => {
    changeDocumentTitle("Dashboard");
  }, []);

  if (!user) return null;

  return (
    <div className="dashboard-view">
      {user.role === ADMIN ? <AdminDashboard /> : <NormalDashboard />}
    </div>
  );
}
