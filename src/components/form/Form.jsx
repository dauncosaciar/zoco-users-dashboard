import { createElement } from "react";

export default function Form({
  handleSubmit,
  fnSubmit,
  InnerFormFields,
  register,
  errors,
  submitIcon,
  submitText
}) {
  const Icon = submitIcon;

  return (
    <form className="form" onSubmit={handleSubmit(fnSubmit)} noValidate>
      {createElement(InnerFormFields, { register, errors })}

      <button className="form__submit" type="submit">
        <Icon /> {submitText}
      </button>
    </form>
  );
}
