import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Pencil, Plus } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import useUsers from "@/hooks/useUsers";
import useModal from "@/hooks/useModal";
import { ADMIN } from "@/utils/constants";
import EditUserModal from "./EditUserModal";
import CreateAddressModal from "./CreateAddressModal";
import EditAddressModal from "./EditAddressModal";
import CreateStudyModal from "./CreateStudyModal";
import EditStudyModal from "./EditStudyModal";

export default function ProfileInformation() {
  const location = useLocation();
  const { user: loggedUser } = useAuth();

  const {
    selectedUser,
    selectedUserLoading,
    fetchUserById,
    resetSelectedUser,
    addresses,
    studies,
    setSelectedAddress,
    setSelectedStudy
  } = useUsers();

  const {
    openEditUserModal,
    setOpenEditUserModal,
    openCreateAddressModal,
    setOpenCreateAddressModal,
    openEditAddressModal,
    setOpenEditAddressModal,
    openCreateStudyModal,
    setOpenCreateStudyModal,
    openEditStudyModal,
    setOpenEditStudyModal
  } = useModal();

  const passedUserId = location.state?.userId;
  const targetUserId = passedUserId || loggedUser.id;

  const handleEditUserModal = () => {
    setOpenEditUserModal(!openEditUserModal);
  };

  const handleCreateAddressModal = () => {
    setOpenCreateAddressModal(!openCreateAddressModal);
  };

  const handleEditAddressModal = address => {
    setSelectedAddress(address);
    setOpenEditAddressModal(true);
  };

  const handleCreateStudyModal = () => {
    setOpenCreateStudyModal(!openCreateStudyModal);
  };

  const handleEditStudyModal = study => {
    setSelectedStudy(study);
    setOpenEditStudyModal(true);
  };

  useEffect(() => {
    fetchUserById(targetUserId);

    return () => {
      resetSelectedUser();
    };
  }, [targetUserId, fetchUserById, resetSelectedUser]);

  const { name, lastName, phone, role, email } = selectedUser;

  if (selectedUserLoading) return "Cargando...";

  return (
    <div className="profile-information">
      <h2 className="profile-information__heading">
        Usuario: {name}, {lastName}
      </h2>

      <div className="profile-information__user">
        <div className="profile-information__user-content">
          <div className="profile-information__user-role">
            <span>Rol</span>
            <p>{role === ADMIN ? "Administrador" : "Usuario"}</p>
          </div>

          <div className="profile-information__user-email">
            <span>Email</span>
            <p>{email}</p>
          </div>

          <div className="profile-information__user-phone">
            <span>Teléfono</span>
            <p>{phone}</p>
          </div>
        </div>

        <div className="profile-information__edit">
          <button
            className="profile-information__edit-button"
            type="button"
            onClick={handleEditUserModal}
          >
            <Pencil /> Editar
          </button>
        </div>
      </div>

      <div className="profile-information__other">
        <div className="profile-information__addresses">
          <h3 className="profile-information__addresses-heading">
            <span>Direcciones</span>
            <button type="button" onClick={handleCreateAddressModal}>
              <Plus /> Agregar Dirección
            </button>
          </h3>

          <div className="profile-information__addresses-content">
            <div className="profile-information__responsive-frame">
              <table className="profile-information__table">
                <thead className="profile-information__table-thead">
                  <tr>
                    <th className="profile-information__table-th">Calle</th>
                    <th className="profile-information__table-th">Ciudad</th>
                    <th className="profile-information__table-th">País</th>
                    <th className="profile-information__table-th">Acciones</th>
                  </tr>
                </thead>

                <tbody className="profile-information__table-tbody">
                  {addresses.length !== 0 ? (
                    addresses.map(address => (
                      <tr
                        key={address.id}
                        className="profile-information__table-tr"
                      >
                        <td className="profile-information__table-td">
                          {address.street}
                        </td>
                        <td className="profile-information__table-td">
                          {address.city}
                        </td>
                        <td className="profile-information__table-td">
                          {address.country}
                        </td>
                        <td className="profile-information__table-td">
                          <div className="profile-information__table-actions">
                            <button
                              type="button"
                              className="profile-information__table-actions-edit"
                              onClick={() => handleEditAddressModal(address)}
                            >
                              <Pencil />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="profile-information__table-tr">
                      <td
                        className="profile-information__table-td--center"
                        colSpan={4}
                      >
                        No hay Direcciones cargadas
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="profile-information__studies">
          <h3 className="profile-information__studies-heading">
            <span>Estudios</span>
            <button type="button" onClick={handleCreateStudyModal}>
              <Plus /> Agregar Estudio
            </button>
          </h3>

          <div className="profile-information__studies-content">
            <div className="profile-information__responsive-frame">
              <table className="profile-information__table">
                <thead className="profile-information__table-thead">
                  <tr>
                    <th className="profile-information__table-th">Grado</th>
                    <th className="profile-information__table-th">
                      Institución
                    </th>
                    <th className="profile-information__table-th">Acciones</th>
                  </tr>
                </thead>

                <tbody className="profile-information__table-tbody">
                  {studies.length !== 0 ? (
                    studies.map(study => (
                      <tr
                        key={study.id}
                        className="profile-information__table-tr"
                      >
                        <td className="profile-information__table-td">
                          {study.degree}
                        </td>
                        <td className="profile-information__table-td">
                          {study.institution}
                        </td>
                        <td className="profile-information__table-td">
                          <div className="profile-information__table-actions">
                            <button
                              type="button"
                              className="profile-information__table-actions-edit"
                              onClick={() => handleEditStudyModal(study)}
                            >
                              <Pencil />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="profile-information__table-tr">
                      <td
                        className="profile-information__table-td--center"
                        colSpan={3}
                      >
                        No hay Estudios cargados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <EditUserModal
        isOpen={openEditUserModal}
        onClose={handleEditUserModal}
        title={`Editando datos personales de: ${selectedUser.name}, ${selectedUser.lastName}`}
      />

      <CreateAddressModal
        isOpen={openCreateAddressModal}
        onClose={handleCreateAddressModal}
        title="Crear Dirección"
      />

      <EditAddressModal
        isOpen={openEditAddressModal}
        onClose={setOpenEditAddressModal}
        title="Editar Dirección"
      />

      <CreateStudyModal
        isOpen={openCreateStudyModal}
        onClose={handleCreateStudyModal}
        title="Crear Estudio"
      />

      <EditStudyModal
        isOpen={openEditStudyModal}
        onClose={setOpenEditStudyModal}
        title="Editar Estudio"
      />
    </div>
  );
}
