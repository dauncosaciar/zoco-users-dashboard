import { CircleUser, LogOut, Users, X } from "lucide-react";
import useMobile from "@/hooks/useMobile";
import Welcome from "./Welcome";

export default function Sidebar({ isSidebarOpen, closeSidebar, sidebarRef }) {
  const { isMobile } = useMobile();

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
        <a href="#" className="sidebar__navigation-link" onClick={closeSidebar}>
          <Users /> <span>Usuarios</span>
        </a>
        <a href="#" className="sidebar__navigation-link" onClick={closeSidebar}>
          <CircleUser /> <span>Mi Perfil</span>
        </a>
      </nav>

      {isMobile && (
        <div className="sidebar__logout">
          <button className="sidebar__logout-button" type="button">
            <LogOut /> Cerrar Sesión
          </button>
        </div>
      )}

      {isSidebarOpen && isMobile && (
        <div className="sidebar__overlay" onClick={closeSidebar}></div>
      )}
    </div>
  );
}
