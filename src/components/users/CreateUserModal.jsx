import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from "@headlessui/react";
import { UserPlus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import Form from "../form/Form";
import UserFormFields from "./UserFormFields";
import useUsers from "@/hooks/useUsers";
import { toast } from "sonner";

export default function CreateUserModal({ isOpen, onClose, title }) {
  const { addUser } = useUsers();

  const initialValues = {
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: ""
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: initialValues });

  const handleForm = async formData => {
    const name = formData.name;
    const lastName = formData.lastName;
    const email = formData.email;
    const phone = +formData.phone;
    const password = formData.password;
    const role = formData.role;

    const result = await addUser({
      name,
      lastName,
      email,
      phone,
      password,
      role
    });

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Usuario creado correctamente");
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="create-user-modal" onClose={onClose}>
        <div className="create-user-modal__container">
          <TransitionChild
            as={Fragment}
            enter="create-user-modal__fade-enter"
            enterFrom="create-user-modal__fade-from"
            enterTo="create-user-modal__fade-to"
            leave="create-user-modal__fade-leave"
            leaveFrom="create-user-modal__fade-to"
            leaveTo="create-user-modal__fade-from"
          >
            <div className="create-user-modal__overlay" />
          </TransitionChild>

          <span className="create-user-modal__trick" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as={Fragment}
            enter="create-user-modal__panel-enter"
            enterFrom="create-user-modal__panel-from"
            enterTo="create-user-modal__panel-to"
            leave="create-user-modal__panel-leave"
            leaveFrom="create-user-modal__panel-to"
            leaveTo="create-user-modal__panel-from"
          >
            <DialogPanel className="create-user-modal__panel">
              <DialogTitle className="create-user-modal__title">
                {title}
              </DialogTitle>

              <div className="create-user-modal__content">
                <Form
                  handleSubmit={handleSubmit}
                  fnSubmit={handleForm}
                  InnerFormFields={UserFormFields}
                  register={register}
                  errors={errors}
                  submitIcon={UserPlus}
                  submitText="Crear"
                  reset={reset}
                />
              </div>

              <button onClick={onClose} className="create-user-modal__close">
                <X />
              </button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
