import { Eye, Trash2, UserPlus } from "lucide-react";

export default function UsersList() {
  return (
    <div className="users-list">
      <div className="users-list__new">
        <button
          className="users-list__new-button"
          type="button"
          onClick={() => {
            console.log("Nuevo usuario...");
          }}
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
              <tr className="users-list__table-tr">
                <td className="users-list__table-td">Juan</td>
                <td className="users-list__table-td">Pérez</td>
                <td className="users-list__table-td">juan.perez@correo.com</td>
                <td className="users-list__table-td">Administrador</td>
                <td className="users-list__table-td">
                  <div className="users-list__table-actions">
                    <a href="#" className="users-list__table-actions-see">
                      <Eye />
                    </a>
                    <button
                      type="button"
                      className="users-list__table-actions-delete"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
