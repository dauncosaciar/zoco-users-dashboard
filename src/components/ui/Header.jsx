import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import Logo from "./Logo";
import useAuth from "@/hooks/useAuth";

export default function Header() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header__content">
        <Link className="header__link" to="/dashboard">
          <Logo />
        </Link>

        <div className="header__navigation">
          <button
            className="header__navigation-button"
            type="button"
            onClick={handleLogout}
          >
            <LogOut /> Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
}
