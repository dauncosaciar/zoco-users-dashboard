import { Outlet } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import Notification from "@/components/ui/Notification";

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-layout__frame">
        <Logo />
        <Outlet />
      </div>

      <Notification />
    </div>
  );
}
