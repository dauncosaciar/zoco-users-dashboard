import useAuth from "@/hooks/useAuth";
import { ADMIN } from "@/utils/constants";

export default function Welcome() {
  const { role, user } = useAuth();

  return (
    <div className="welcome">
      <span
        className={`welcome__role welcome__role${
          role === ADMIN ? "--admin" : "--user"
        }`}
      >
        {role === ADMIN ? "Administrador" : "Usuario"}
      </span>

      <p className="welcome__salute">
        Bienvenido, <span>{user.name}</span>
      </p>
    </div>
  );
}
