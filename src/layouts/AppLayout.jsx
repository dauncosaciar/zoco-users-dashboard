import { useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";
import Overlay from "@/components/ui/Overlay";
import Notification from "@/components/ui/Notification";
import useAuth from "@/hooks/useAuth";
import useSidebarControl from "@/hooks/useSidebarControl";
import useMobile from "@/hooks/useMobile";

export default function AppLayout() {
  const { authLoading, isAuthenticated } = useAuth();
  const sidebarRef = useRef(null);
  const toggleRef = useRef(null);
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarControl(
    sidebarRef,
    toggleRef
  );
  const { isMobile } = useMobile();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  if (authLoading) return "Cargando...";

  return isAuthenticated ? (
    <div className="app-layout">
      <Header
        toggleSidebar={toggleSidebar}
        toggleRef={toggleRef}
        isMobile={isMobile}
      />

      <div className="app-layout__frame">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
          sidebarRef={sidebarRef}
        />

        {isSidebarOpen && isMobile && <Overlay closeSidebar={closeSidebar} />}

        <main className="app-layout__content container">
          <Outlet />
        </main>
      </div>

      <Notification />
    </div>
  ) : (
    <Navigate to="/" />
  );
}
