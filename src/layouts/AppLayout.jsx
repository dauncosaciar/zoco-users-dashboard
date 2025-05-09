import { Outlet } from "react-router-dom";
import Header from "@/components/ui/Header";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <Header />

      <div className="app-layout__frame">
        <main className="app-layout__content container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
