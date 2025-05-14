import { useEffect } from "react";
import useModal from "@/hooks/useModal";
import ErrorMessage from "../form/ErrorMessage";

export default function StudiesFormFields({ register, errors, reset }) {
  const { openCreateStudyModal } = useModal();

  useEffect(() => {
    if (!openCreateStudyModal) {
      reset();
    }
  }, [openCreateStudyModal, reset]);

  return (
    <>
      <div className="form__field">
        <label htmlFor="degree" className="form__label">
          Grado
        </label>
        <input
          id="degree"
          className={`form__input${errors.degree ? " form__input--error" : ""}`}
          type="text"
          placeholder="Título del grado"
          {...register("degree", {
            required: "El grado es obligatorio."
          })}
        />

        {errors.degree && <ErrorMessage>{errors.degree.message}</ErrorMessage>}
      </div>

      <div className="form__field">
        <label htmlFor="institution" className="form__label">
          Institución
        </label>
        <input
          id="institution"
          className={`form__input${
            errors.institution ? " form__input--error" : ""
          }`}
          type="text"
          placeholder="Nombre de la institución"
          {...register("institution", {
            required: "La institución es obligatoria."
          })}
        />

        {errors.institution && (
          <ErrorMessage>{errors.institution.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
