import { useForm } from "react-hook-form";
import Form from "@/components/form/Form";
import LoginFormFields from "@/components/auth/LoginFormFields";
import { LogIn } from "lucide-react";

export default function LoginView() {
  const initialValues = {
    email: "",
    password: ""
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: initialValues });

  const handleForm = formData => {
    console.log("formData:", formData);
  };

  return (
    <div className="login-view">
      <h1 className="login-view__heading">Iniciar Sesión</h1>
      <p className="login-view__text">
        Completa tu email y password para loguearte.
      </p>

      <Form
        handleSubmit={handleSubmit}
        fnSubmit={handleForm}
        InnerFormFields={LoginFormFields}
        register={register}
        errors={errors}
        submitIcon={LogIn}
        submitText="Ingresar"
      />
    </div>
  );
}
