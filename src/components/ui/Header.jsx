import { Link } from "react-router-dom";
import { AlignRight, LogOut } from "lucide-react";
import Logo from "./Logo";
import useAuth from "@/hooks/useAuth";
import useMobile from "@/hooks/useMobile";

export default function Header({ toggleSidebar, toggleRef }) {
  const { logout } = useAuth();
  const { isMobile } = useMobile();

  const handleLogout = () => {
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
