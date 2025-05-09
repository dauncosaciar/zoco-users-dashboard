import { Navigate, Outlet } from "react-router-dom";
import Header from "@/components/ui/Header";
import useAuth from "@/hooks/useAuth";

export default function AppLayout() {
  const { authLoading, isAuthenticated } = useAuth();

  if (authLoading) return "Cargando...";

  return isAuthenticated ? (
    <div className="app-layout">
      <Header />

      <div className="app-layout__frame">
        <main className="app-layout__content container">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}
