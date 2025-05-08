import ErrorMessage from "../form/ErrorMessage";

export default function LoginFormFields({ register, errors }) {
  return (
    <>
      <div className="form__field">
        <label htmlFor="email" className="form__label">
          Email
        </label>
        <input
          id="email"
          className={`form__input${errors.email ? " form__input--error" : ""}`}
          type="email"
          placeholder="Tu email"
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
        <label htmlFor="password" className="form__label">
          Password
        </label>
        <input
          id="password"
          className={`form__input${
            errors.password ? " form__input--error" : ""
          }`}
          type="password"
          placeholder="Tu password"
          {...register("password", {
            required: "El password es obligatorio."
          })}
        />

        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
