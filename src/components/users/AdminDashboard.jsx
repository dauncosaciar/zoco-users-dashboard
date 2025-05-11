import UsersList from "./UsersList";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h2 className="admin-dashboard__heading">Administración de Usuarios</h2>
      <p className="admin-dashboard__text">
        Aquí tienes una lista de Usuarios desde la cual puedes gestionar sus
        datos.
      </p>

      <UsersList />
    </div>
  );
}
