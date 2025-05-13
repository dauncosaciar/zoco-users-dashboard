import { createContext, useState } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const [openCreateAddressModal, setOpenCreateAddressModal] = useState(false);
  const [openEditAddressModal, setOpenEditAddressModal] = useState(false);
  const [openCreateStudyModal, setOpenCreateStudyModal] = useState(false);
  const [openEditStudyModal, setOpenEditStudyModal] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        openCreateUserModal,
        openEditUserModal,
        openCreateAddressModal,
        openEditAddressModal,
        openCreateStudyModal,
        openEditStudyModal,
        setOpenCreateUserModal,
        setOpenEditUserModal,
        setOpenCreateAddressModal,
        setOpenEditAddressModal,
        setOpenCreateStudyModal,
        setOpenEditStudyModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider };

export default ModalContext;
