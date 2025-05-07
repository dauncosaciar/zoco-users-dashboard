import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import LoginView from "./views/auth/LoginView";
import DashboardView from "./views/users/DashboardView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<LoginView />} />
        </Route>

        <Route path="/dashboard" element={<AppLayout />}>
          <Route index element={<DashboardView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
