import UsersList from "./UsersList";

export default function AdminDashboard() {
  return (
    <div>
      <h2>Panel de Administrador</h2>
      <p>Desde aquí puedes gestionar los usuarios y sus datos.</p>

      <UsersList />
    </div>
  );
}
