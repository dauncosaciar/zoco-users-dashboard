import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from "@headlessui/react";
import { School, X } from "lucide-react";
import { useForm } from "react-hook-form";
import Form from "../form/Form";
import StudiesFormFields from "./StudiesFormFields";
import useUsers from "@/hooks/useUsers";
import { toast } from "sonner";

export default function CreateStudyModal({ isOpen, onClose, title }) {
  const initialValues = {
    degree: "",
    institution: ""
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: initialValues });

  const handleForm = async formData => {
    console.log(formData);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="create-study-modal" onClose={onClose}>
        <div className="create-study-modal__container">
          <TransitionChild
            as={Fragment}
            enter="create-study-modal__fade-enter"
            enterFrom="create-study-modal__fade-from"
            enterTo="create-study-modal__fade-to"
            leave="create-study-modal__fade-leave"
            leaveFrom="create-study-modal__fade-to"
            leaveTo="create-study-modal__fade-from"
          >
            <div className="create-study-modal__overlay" />
          </TransitionChild>

          <span className="create-study-modal__trick" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as={Fragment}
            enter="create-study-modal__panel-enter"
            enterFrom="create-study-modal__panel-from"
            enterTo="create-study-modal__panel-to"
            leave="create-study-modal__panel-leave"
            leaveFrom="create-study-modal__panel-to"
            leaveTo="create-study-modal__panel-from"
          >
            <DialogPanel className="create-study-modal__panel">
              <DialogTitle className="create-study-modal__title">
                {title}
              </DialogTitle>

              <div className="create-study-modal__content">
                <Form
                  handleSubmit={handleSubmit}
                  fnSubmit={handleForm}
                  InnerFormFields={StudiesFormFields}
                  register={register}
                  errors={errors}
                  submitIcon={School}
                  submitText="Crear"
                  reset={reset}
                />
              </div>

              <button onClick={onClose} className="create-study-modal__close">
                <X />
              </button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
