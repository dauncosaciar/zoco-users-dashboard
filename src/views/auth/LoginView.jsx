import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LogIn } from "lucide-react";
import Form from "@/components/form/Form";
import LoginFormFields from "@/components/auth/LoginFormFields";
import useAuth from "@/hooks/useAuth";
import { changeDocumentTitle } from "@/utils/functions";
import { toast } from "sonner";

export default function LoginView() {
  const { login } = useAuth();

  const initialValues = {
    email: "",
    password: ""
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: initialValues });

  useEffect(() => {
    changeDocumentTitle("Inicia Sesión");
  }, []);

  const handleForm = async formData => {
    const email = formData.email;
    const password = formData.password;
    const result = await login(email, password);

    if (!result.success) {
      toast.error(result.error);
    }
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
