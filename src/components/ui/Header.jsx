import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <Link className="header__link" to="/dashboard">
          <Logo />
        </Link>

        <div className="header__navigation">
          <button className="header__navigation-button" type="button">
            <LogOut /> Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
}
