### Resumen de App

**URL de App en línea:** [https://zoco-dashboard.netlify.app/](https://zoco-dashboard.netlify.app/)

### Pasos de instalación y ejecución del Proyecto en máquina local

1. Asegúrate de clonar en tu PC el repositorio de GitHub de nombre `zoco-users-dashboard`.
2. Una vez clonado, dentro de la raíz de la carpeta `zoco-users-dashboard` crear un archivo `.env.local` y colocar el siguiente contenido en su interior:

```
VITE_BACKEND_URL=http://localhost:8888
```

3. Para la carpeta `zoco-users-dashboard`, ejecutar una terminal. En ella ejecutar el comando `npm install` o `npm i` para instalar las dependencias del proyecto.
4. **Levantar el frontend:** Cuando se terminen de instalar las dependencias, en la misma terminal ejecutar el comando `npm run dev`. Si todo marchó bien, la misma terminal te mostrará la url donde puedes ingresar en tu navegador web, en este caso es `http://localhost:9999/`. El puerto 9999 está configurado en el archivo `vite.config.js` dentro de la propiedad `server`; si deseas cambiar dicho puerto puedes hacerlo desde ahí y ejecutar nuevamente la aplicación.
5. **Levantar el backend simulado:** Abre otra terminal para el mismo proyecto y ejecuta el comando `npm run api` para levantar el **Backend Simulado**. El mismo se ejecuta en el puerto `8888`, por eso el valor de la variable `VITE_BACKEND_URL`, la cual también puedes cambiar. Tener en cuenta que se utilizó la dependencia `json-server` para simular el backend, el cual va acompañado con un archivo `db.json` en la raíz del proyecto, y que hace de base de datos.
6. Copia la url `http://localhost:9999/` e ingresa desde tu navegador preferido.

### Datos de prueba de acceso

- Email: `admin@mail.com`
- Pass: `123456`

### Consideraciones adicionales

El proyecto en línea puede tener una demora en la devolución de los datos, ya que consulta un servicio gratuito que se pone en estado de reposo si no se lo utiliza durante cierto tiempo hasta la siguiente vez que alguien ingresa.
