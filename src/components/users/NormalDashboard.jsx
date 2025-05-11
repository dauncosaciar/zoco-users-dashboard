import ProfileInformation from "./ProfileInformation";

export default function NormalDashboard() {
  return (
    <div>
      <h2>Tu Panel</h2>
      <p>Desde aquí puedes ver y editar tu perfil y tus datos relacionados.</p>

      <ProfileInformation />
    </div>
  );
}
