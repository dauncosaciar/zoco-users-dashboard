import { Fragment, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from "@headlessui/react";
import { FilePenLine, X } from "lucide-react";
import { useForm } from "react-hook-form";
import Form from "../form/Form";
import AddressFormFields from "./AddressFormFields";
import useUsers from "@/hooks/useUsers";
import { toast } from "sonner";

export default function EditAddressModal({ isOpen, onClose, title }) {
  const { selectedAddress, fetchAddressById, editAddress } = useUsers();

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

  useEffect(() => {
    if (isOpen && selectedAddress?.id) {
      fetchAddressById(selectedAddress.id);
      reset(selectedAddress);
    }
  }, [isOpen, selectedAddress, fetchAddressById, reset]);

  const handleForm = async formData => {
    const result = await editAddress(formData, selectedAddress.id);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Dirección actualizada correctamente");
    onClose(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="edit-address-modal"
        onClose={() => onClose(false)}
      >
        <div className="edit-address-modal__container">
          <TransitionChild
            as={Fragment}
            enter="edit-address-modal__fade-enter"
            enterFrom="edit-address-modal__fade-from"
            enterTo="edit-address-modal__fade-to"
            leave="edit-address-modal__fade-leave"
            leaveFrom="edit-address-modal__fade-to"
            leaveTo="edit-address-modal__fade-from"
          >
            <div className="edit-address-modal__overlay" />
          </TransitionChild>

          <span className="edit-address-modal__trick" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as={Fragment}
            enter="edit-address-modal__panel-enter"
            enterFrom="edit-address-modal__panel-from"
            enterTo="edit-address-modal__panel-to"
            leave="edit-address-modal__panel-leave"
            leaveFrom="edit-address-modal__panel-to"
            leaveTo="edit-address-modal__panel-from"
          >
            <DialogPanel className="edit-address-modal__panel">
              <DialogTitle className="edit-address-modal__title">
                {title}
              </DialogTitle>

              <div className="edit-address-modal__content">
                <Form
                  handleSubmit={handleSubmit}
                  fnSubmit={handleForm}
                  InnerFormFields={AddressFormFields}
                  register={register}
                  errors={errors}
                  submitIcon={FilePenLine}
                  submitText="Guardar Cambios"
                  reset={reset}
                />
              </div>

              <button
                onClick={() => onClose(false)}
                className="edit-address-modal__close"
              >
                <X />
              </button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
