import { Fragment, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from "@headlessui/react";
import { SquarePen, X } from "lucide-react";
import { useForm } from "react-hook-form";
import Form from "../form/Form";
import StudiesFormFields from "./StudiesFormFields";
import useUsers from "@/hooks/useUsers";
import { toast } from "sonner";

export default function EditStudyModal({ isOpen, onClose, title }) {
  const { selectedStudy, fetchStudyById, editStudy } = useUsers();

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

  useEffect(() => {
    if (isOpen && selectedStudy?.id) {
      fetchStudyById(selectedStudy.id);
      reset(selectedStudy);
    }
  }, [isOpen, selectedStudy, fetchStudyById, reset]);

  const handleForm = async formData => {
    const result = await editStudy(formData, selectedStudy.id);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Estudio actualizado correctamente");
    onClose(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="edit-study-modal"
        onClose={() => onClose(false)}
      >
        <div className="edit-study-modal__container">
          <TransitionChild
            as={Fragment}
            enter="edit-study-modal__fade-enter"
            enterFrom="edit-study-modal__fade-from"
            enterTo="edit-study-modal__fade-to"
            leave="edit-study-modal__fade-leave"
            leaveFrom="edit-study-modal__fade-to"
            leaveTo="edit-study-modal__fade-from"
          >
            <div className="edit-study-modal__overlay" />
          </TransitionChild>

          <span className="edit-study-modal__trick" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as={Fragment}
            enter="edit-study-modal__panel-enter"
            enterFrom="edit-study-modal__panel-from"
            enterTo="edit-study-modal__panel-to"
            leave="edit-study-modal__panel-leave"
            leaveFrom="edit-study-modal__panel-to"
            leaveTo="edit-study-modal__panel-from"
          >
            <DialogPanel className="edit-study-modal__panel">
              <DialogTitle className="edit-study-modal__title">
                {title}
              </DialogTitle>

              <div className="edit-study-modal__content">
                <Form
                  handleSubmit={handleSubmit}
                  fnSubmit={handleForm}
                  InnerFormFields={StudiesFormFields}
                  register={register}
                  errors={errors}
                  submitIcon={SquarePen}
                  submitText="Guardar Cambios"
                  reset={reset}
                />
              </div>

              <button
                onClick={() => onClose(false)}
                className="edit-study-modal__close"
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
