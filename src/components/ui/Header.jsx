import { Link } from "react-router-dom";
import { AlignRight, LogOut } from "lucide-react";
import Logo from "./Logo";
import useAuth from "@/hooks/useAuth";
import useUsers from "@/hooks/useUsers";

export default function Header({ toggleSidebar, toggleRef, isMobile }) {
  const { logout } = useAuth();
  const { clearUsersData } = useUsers();

  const handleLogout = () => {
    clearUsersData();
    logout();
  };

  return (
    <header className="header">
      <div className="header__content">
        <Link className="header__link" to="/dashboard">
          <Logo />
        </Link>

        <div className="header__options">
          {isMobile ? (
            <button
              ref={toggleRef}
              className="header__options-hamburger"
              type="button"
              onClick={toggleSidebar}
            >
              <AlignRight />
            </button>
          ) : (
            <button
              className="header__options-logout"
              type="button"
              onClick={handleLogout}
            >
              <LogOut /> Cerrar Sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
