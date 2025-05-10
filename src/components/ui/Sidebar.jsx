import { LogOut } from "lucide-react";

export default function Sidebar({ isOpen, closeSidebar, sidebarRef }) {
  return (
    <div ref={sidebarRef} className={`sidebar${isOpen ? " open" : ""}`}>
      <nav className="sidebar__navigation">
        <a href="#" className="sidebar__navigation-link" onClick={closeSidebar}>
          Usuarios
        </a>
        <a href="#" className="sidebar__navigation-link" onClick={closeSidebar}>
          Mi Perfil
        </a>
      </nav>

      <div className="sidebar__logout">
        <button className="sidebar__logout-button" type="button">
          <LogOut /> Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
