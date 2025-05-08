import { Outlet } from "react-router-dom";
import Logo from "@/components/ui/Logo";

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-layout__frame">
        <Logo />
        <Outlet />
      </div>
    </div>
  );
}
