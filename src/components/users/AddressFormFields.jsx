import { useEffect } from "react";
import useModal from "@/hooks/useModal";
import ErrorMessage from "../form/ErrorMessage";

export default function AddressFormFields({ register, errors, reset }) {
  const { openCreateAddressModal } = useModal();

  useEffect(() => {
    if (!openCreateAddressModal) {
      reset();
    }
  }, [openCreateAddressModal, reset]);

  return (
    <>
      <div className="form__field">
        <label htmlFor="street" className="form__label">
          Calle
        </label>
        <input
          id="street"
          className={`form__input${errors.street ? " form__input--error" : ""}`}
          type="text"
          placeholder="Nombre de la calle"
          {...register("street", {
            required: "La calle es obligatoria."
          })}
        />

        {errors.street && <ErrorMessage>{errors.street.message}</ErrorMessage>}
      </div>

      <div className="form__field">
        <label htmlFor="city" className="form__label">
          Ciudad
        </label>
        <input
          id="city"
          className={`form__input${errors.city ? " form__input--error" : ""}`}
          type="text"
          placeholder="Nombre de la ciudad"
          {...register("city", {
            required: "La ciudad es obligatoria."
          })}
        />

        {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}
      </div>

      <div className="form__field">
        <label htmlFor="country" className="form__label">
          País
        </label>
        <input
          id="country"
          className={`form__input${
            errors.country ? " form__input--error" : ""
          }`}
          type="text"
          placeholder="Nombre del país"
          {...register("country", {
            required: "El país es obligatorio."
          })}
        />

        {errors.country && (
          <ErrorMessage>{errors.country.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
