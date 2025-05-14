import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from "@headlessui/react";
import { NotebookTabs, X } from "lucide-react";
import { useForm } from "react-hook-form";
import Form from "../form/Form";
import AddressFormFields from "./AddressFormFields";
import useUsers from "@/hooks/useUsers";
import { toast } from "sonner";

export default function CreateAddressModal({ isOpen, onClose, title }) {
  const { selectedUser, addAddressForUser } = useUsers();
  const selectedUserId = selectedUser.id;

  const initialValues = {
    street: "",
    city: "",
    country: ""
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: initialValues });

  const handleForm = async formData => {
    const result = await addAddressForUser(formData, selectedUserId);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Dirección creada correctamente");
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="create-address-modal" onClose={onClose}>
        <div className="create-address-modal__container">
          <TransitionChild
            as={Fragment}
            enter="create-address-modal__fade-enter"
            enterFrom="create-address-modal__fade-from"
            enterTo="create-address-modal__fade-to"
            leave="create-address-modal__fade-leave"
            leaveFrom="create-address-modal__fade-to"
            leaveTo="create-address-modal__fade-from"
          >
            <div className="create-address-modal__overlay" />
          </TransitionChild>

          <span className="create-address-modal__trick" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as={Fragment}
            enter="create-address-modal__panel-enter"
            enterFrom="create-address-modal__panel-from"
            enterTo="create-address-modal__panel-to"
            leave="create-address-modal__panel-leave"
            leaveFrom="create-address-modal__panel-to"
            leaveTo="create-address-modal__panel-from"
          >
            <DialogPanel className="create-address-modal__panel">
              <DialogTitle className="create-address-modal__title">
                {title}
              </DialogTitle>

              <div className="create-address-modal__content">
                <Form
                  handleSubmit={handleSubmit}
                  fnSubmit={handleForm}
                  InnerFormFields={AddressFormFields}
                  register={register}
                  errors={errors}
                  submitIcon={NotebookTabs}
                  submitText="Crear"
                  reset={reset}
                />
              </div>

              <button onClick={onClose} className="create-address-modal__close">
                <X />
              </button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
