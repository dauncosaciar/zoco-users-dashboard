import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/context/AuthProvider";
import { UsersProvider } from "@/context/UsersProvider";
import AuthLayout from "@/layouts/AuthLayout";
import AppLayout from "@/layouts/AppLayout";
import LoginView from "@/views/auth/LoginView";
import DashboardView from "@/views/users/DashboardView";
import AdminProfileView from "@/views/users/AdminProfileView";
import UserDetailsView from "@/views/users/UserDetailsView";

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UsersProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<LoginView />} />
            </Route>

            <Route path="/dashboard" element={<AppLayout />}>
              <Route index element={<DashboardView />} />
              <Route path="profile" element={<AdminProfileView />} />
              <Route path="user-details" element={<UserDetailsView />} />
            </Route>
          </Routes>
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
