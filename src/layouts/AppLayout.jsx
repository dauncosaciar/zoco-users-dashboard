import { useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";
import useAuth from "@/hooks/useAuth";
import useSidebarControl from "@/hooks/useSidebarControl";

export default function AppLayout() {
  const { authLoading, isAuthenticated } = useAuth();
  const sidebarRef = useRef(null);
  const toggleRef = useRef(null);
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarControl(
    sidebarRef,
    toggleRef
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  if (authLoading) return "Cargando...";

  return isAuthenticated ? (
    <div className="app-layout">
      <Header toggleSidebar={toggleSidebar} toggleRef={toggleRef} />

      <div className="app-layout__frame">
        <Sidebar
          isOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
          sidebarRef={sidebarRef}
        />

        <main className="app-layout__content container">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}
