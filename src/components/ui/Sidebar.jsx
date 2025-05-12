import { Link, useLocation } from "react-router-dom";
import { CircleUser, FolderDot, LogOut, Users, X } from "lucide-react";
import Welcome from "./Welcome";
import useAuth from "@/hooks/useAuth";
import useMobile from "@/hooks/useMobile";
import { ADMIN } from "@/utils/constants";
import useUsers from "@/hooks/useUsers";

export default function Sidebar({ isSidebarOpen, closeSidebar, sidebarRef }) {
  const { role, logout } = useAuth();
  const { clearUsersData } = useUsers();
  const { isMobile } = useMobile();
  const location = useLocation();

  const handleLogout = () => {
    clearUsersData();
    logout();
  };

  return (
    <div ref={sidebarRef} className={`sidebar${isSidebarOpen ? " open" : ""}`}>
      {isMobile && (
        <div className="sidebar__close">
          <button
            className="sidebar__close-button"
            type="button"
            onClick={closeSidebar}
          >
            <X />
          </button>
        </div>
      )}

      <Welcome />

      <nav className="sidebar__navigation">
        {role === ADMIN ? (
          <>
            <Link
              to="/dashboard"
              className={`sidebar__navigation-link${
                location.pathname === "/dashboard" ? " active" : ""
              }`}
              onClick={closeSidebar}
            >
              <Users /> <span>Usuarios</span>
            </Link>
            <Link
              to="/dashboard/profile"
              className={`sidebar__navigation-link${
                location.pathname === "/dashboard/profile" ? " active" : ""
              }`}
              onClick={closeSidebar}
            >
              <CircleUser /> <span>Mi Perfil</span>
            </Link>
          </>
        ) : (
          <Link
            to="/dashboard"
            className={`sidebar__navigation-link${
              location.pathname === "/dashboard" ? " active" : ""
            }`}
            onClick={closeSidebar}
          >
            <FolderDot /> <span>Mi Información</span>
          </Link>
        )}
      </nav>

      {isMobile && (
        <div className="sidebar__logout">
          <button
            className="sidebar__logout-button"
            type="button"
            onClick={handleLogout}
          >
            <LogOut /> Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}
