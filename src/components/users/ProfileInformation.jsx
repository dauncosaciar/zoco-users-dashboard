import { Pencil, Plus } from "lucide-react";

export default function ProfileInformation() {
  return (
    <div className="profile-information">
      <h2 className="profile-information__heading">
        Usuario: Nombre, Apellido
      </h2>

      <div className="profile-information__user">
        <div className="profile-information__user-content">
          <div className="profile-information__user-role">
            <span>Rol</span>
            <p>Administrador</p>
          </div>

          <div className="profile-information__user-email">
            <span>Email</span>
            <p>user@mail.com</p>
          </div>

          <div className="profile-information__user-phone">
            <span>Teléfono</span>
            <p>3810003344</p>
          </div>
        </div>

        <div className="profile-information__edit">
          <button
            className="profile-information__edit-button"
            type="button"
            onClick={() => {
              console.log("Editar usuario...");
            }}
          >
            Editar
          </button>
        </div>
      </div>

      <div className="profile-information__other">
        <div className="profile-information__addresses">
          <h3 className="profile-information__addresses-heading">
            <span>Direcciones</span>
            <button type="button">
              <Plus /> Agregar Dirección
            </button>
          </h3>

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
                <tr className="profile-information__table-tr">
                  <td className="profile-information__table-td">Italia 123</td>
                  <td className="profile-information__table-td">SM Tucumán</td>
                  <td className="profile-information__table-td">Argentina</td>
                  <td className="profile-information__table-td">
                    <div className="profile-information__table-actions">
                      <button
                        type="button"
                        className="profile-information__table-actions-edit"
                      >
                        <Pencil />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="profile-information__studies">
          <h3 className="profile-information__studies-heading">
            <span>Estudios</span>
            <button type="button">
              <Plus /> Agregar Estudio
            </button>
          </h3>

          <div className="profile-information__responsive-frame">
            <table className="profile-information__table">
              <thead className="profile-information__table-thead">
                <tr>
                  <th className="profile-information__table-th">Grado</th>
                  <th className="profile-information__table-th">Institución</th>
                  <th className="profile-information__table-th">Acciones</th>
                </tr>
              </thead>

              <tbody className="profile-information__table-tbody">
                <tr className="profile-information__table-tr">
                  <td className="profile-information__table-td">
                    Ciencia de Datos
                  </td>
                  <td className="profile-information__table-td">UTN</td>
                  <td className="profile-information__table-td">
                    <div className="profile-information__table-actions">
                      <button
                        type="button"
                        className="profile-information__table-actions-edit"
                      >
                        <Pencil />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
