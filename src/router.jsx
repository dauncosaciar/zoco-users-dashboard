import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/context/AuthProvider";
import AuthLayout from "@/layouts/AuthLayout";
import AppLayout from "@/layouts/AppLayout";
import LoginView from "@/views/auth/LoginView";
import DashboardView from "@/views/users/DashboardView";
import ProfileView from "@/views/users/ProfileView";

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<LoginView />} />
          </Route>

          <Route path="/dashboard" element={<AppLayout />}>
            <Route index element={<DashboardView />} />
            <Route path="profile" element={<ProfileView />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
