import useModal from "@/hooks/useModal";
import ErrorMessage from "../form/ErrorMessage";
import { useEffect } from "react";

export default function UserFormFields({ register, errors, reset }) {
  const { openCreateUserModal } = useModal();

  useEffect(() => {
    if (!openCreateUserModal) {
      reset();
    }
  }, [openCreateUserModal, reset]);

  return (
    <>
      <div className="form__field">
        <label htmlFor="name" className="form__label">
          Nombre
        </label>
        <input
          id="name"
          className={`form__input${errors.name ? " form__input--error" : ""}`}
          type="text"
          placeholder="Nombre que quieras incluir"
          {...register("name", {
            required: "El nombre es obligatorio."
          })}
        />

        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="form__field">
        <label htmlFor="lastName" className="form__label">
          Apellido
        </label>
        <input
          id="lastName"
          className={`form__input${
            errors.lastName ? " form__input--error" : ""
          }`}
          type="text"
          placeholder="Apellido que quieras incluir"
          {...register("lastName", {
            required: "El apellido es obligatorio."
          })}
        />

        {errors.lastName && (
          <ErrorMessage>{errors.lastName.message}</ErrorMessage>
        )}
      </div>

      <div className="form__field">
        <label htmlFor="email" className="form__label">
          Email
        </label>
        <input
          id="email"
          className={`form__input${errors.email ? " form__input--error" : ""}`}
          type="email"
          placeholder="Email deseado"
          {...register("email", {
            required: "El email es obligatorio.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Formato de email no válido."
            }
          })}
        />

        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>

      <div className="form__field">
        <label htmlFor="phone" className="form__label">
          Teléfono
        </label>
        <input
          id="phone"
          className={`form__input${errors.phone ? " form__input--error" : ""}`}
          type="number"
          placeholder="Teléfono que quieras incluir"
          {...register("phone", {
            required: "El teléfono es obligatorio."
          })}
        />

        {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
      </div>

      <div className="form__field">
        <label htmlFor="password" className="form__label">
          Password
        </label>
        <input
          id="password"
          className={`form__input${
            errors.password ? " form__input--error" : ""
          }`}
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "El password es obligatorio."
          })}
        />

        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>

      <div className="form__field">
        <label htmlFor="role" className="form__label">
          Rol
        </label>
        <select
          id="role"
          className={`form__input${errors.role ? " form__input--error" : ""}`}
          {...register("role", {
            required: "El rol es obligatorio."
          })}
        >
          <option value="">Selecciona un rol</option>
          <option value="admin">Administrador</option>
          <option value="user">Usuario</option>
        </select>

        {errors.role && <ErrorMessage>{errors.role.message}</ErrorMessage>}
      </div>
    </>
  );
}
