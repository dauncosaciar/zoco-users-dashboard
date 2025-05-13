import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from "@headlessui/react";
import { UserPen, X } from "lucide-react";
import { useForm } from "react-hook-form";
import Form from "../form/Form";
import UserFormFields from "./UserFormFields";
import useUsers from "@/hooks/useUsers";
import { toast } from "sonner";

export default function EditUserModal({ isOpen, onClose, title }) {
  const { editUser, selectedUser } = useUsers();

  const initialValues = {
    name: selectedUser.name,
    lastName: selectedUser.lastName,
    email: selectedUser.email,
    phone: selectedUser.phone,
    password: selectedUser.password,
    role: selectedUser.role
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

    const result = await editUser(
      {
        name,
        lastName,
        email,
        phone,
        password,
        role
      },
      selectedUser.id
    );

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Usuario actualizado correctamente");
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="edit-user-modal" onClose={onClose}>
        <div className="edit-user-modal__container">
          <TransitionChild
            as={Fragment}
            enter="edit-user-modal__fade-enter"
            enterFrom="edit-user-modal__fade-from"
            enterTo="edit-user-modal__fade-to"
            leave="edit-user-modal__fade-leave"
            leaveFrom="edit-user-modal__fade-to"
            leaveTo="edit-user-modal__fade-from"
          >
            <div className="edit-user-modal__overlay" />
          </TransitionChild>

          <span className="edit-user-modal__trick" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as={Fragment}
            enter="edit-user-modal__panel-enter"
            enterFrom="edit-user-modal__panel-from"
            enterTo="edit-user-modal__panel-to"
            leave="edit-user-modal__panel-leave"
            leaveFrom="edit-user-modal__panel-to"
            leaveTo="edit-user-modal__panel-from"
          >
            <DialogPanel className="edit-user-modal__panel">
              <DialogTitle className="edit-user-modal__title">
                {title}
              </DialogTitle>

              <div className="edit-user-modal__content">
                <Form
                  handleSubmit={handleSubmit}
                  fnSubmit={handleForm}
                  InnerFormFields={UserFormFields}
                  register={register}
                  errors={errors}
                  submitIcon={UserPen}
                  submitText="Guardar Cambios"
                  reset={reset}
                  isEditing={true}
                />
              </div>

              <button onClick={onClose} className="edit-user-modal__close">
                <X />
              </button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
