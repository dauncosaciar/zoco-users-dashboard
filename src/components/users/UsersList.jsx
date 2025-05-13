import { useNavigate } from "react-router-dom";
import { Eye, Trash2, UserPlus } from "lucide-react";
import useUsers from "@/hooks/useUsers";
import useModal from "@/hooks/useModal";
import { ADMIN } from "@/utils/constants";
import CreateUserModal from "./CreateUserModal";

export default function UsersList() {
  const navigate = useNavigate();
  const { users, usersLoading } = useUsers();
  const { openCreateUserModal, setOpenCreateUserModal } = useModal();

  const handleCreateUserModal = () => {
    setOpenCreateUserModal(!openCreateUserModal);
  };

  if (usersLoading) return "Cargando...";

  return (
    <div className="users-list">
      <div className="users-list__new">
        <button
          className="users-list__new-button"
          type="button"
          onClick={handleCreateUserModal}
        >
          <UserPlus /> Crear Usuario
        </button>
      </div>

      <div className="users-list__content">
        <div className="users-list__responsive-frame">
          <table className="users-list__table">
            <thead className="users-list__table-thead">
              <tr>
                <th className="users-list__table-th">Nombre</th>
                <th className="users-list__table-th">Apellido</th>
                <th className="users-list__table-th">Email</th>
                <th className="users-list__table-th">Rol</th>
                <th className="users-list__table-th">Acciones</th>
              </tr>
            </thead>

            <tbody className="users-list__table-tbody">
              {users.length ? (
                users.map(user => (
                  <tr key={user.id} className="users-list__table-tr">
                    <td className="users-list__table-td">{user.name}</td>
                    <td className="users-list__table-td">{user.lastName}</td>
                    <td className="users-list__table-td">{user.email}</td>
                    <td className="users-list__table-td">
                      {user.role === ADMIN ? "Administrador" : "Usuario"}
                    </td>
                    <td className="users-list__table-td">
                      <div className="users-list__table-actions">
                        <button
                          type="button"
                          className="users-list__table-actions-see"
                          onClick={() =>
                            navigate("/dashboard/user-details", {
                              state: { userId: user.id }
                            })
                          }
                        >
                          <Eye />
                        </button>
                        <button
                          type="button"
                          className="users-list__table-actions-delete"
                        >
                          <Trash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="users-list__table-tr">
                  <td
                    className="users-list__table-td users-list__table-td--center"
                    colSpan={5}
                  >
                    No hay Usuarios cargados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateUserModal
        isOpen={openCreateUserModal}
        onClose={handleCreateUserModal}
        title="Crear Usuario"
      />
    </div>
  );
}
