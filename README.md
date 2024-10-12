INSTRUCCIONES
Descubre como funciona mi pagina web.
Para ejecutar el proyecto es recomendable hacerlo desde Visual Studio Code con Node.js y MySQL previamente instalados, estos son los pasos para poner en marcha tanto el frontend como el backend:

1. Configuración del Backend (Node.js y MySQL)
Se instalan las dependencias necesarias: En la carpeta del proyecto, abre una terminal y ejecuta el siguiente comando para instalar los paquetes requeridos:

bash
Copiar código
npm install express mysql2 body-parser cors

2.- Tambien debemos asegurarnos de tener MySQL en ejecución:
  - Verificar que la base de datos MySQL esté corriendo.
  - Conéctate a MySQL y asegúrate de que la base de datos listatareas esté creada:
sql
Copiar código
CREATE DATABASE listatareas;

3.- Estructura de la Base de Datos:

Verifica que la tabla tareasagregadas tenga la estructura:
sql
Copiar código
USE listatareas;
DESCRIBE tareasagregadas;

  -Si no está creada, puedes crearla manualmente con el siguiente comando SQL:
sql
Copiar código
CREATE TABLE IF NOT EXISTS tareasagregadas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT NOT NULL,
    completada BOOLEAN DEFAULT 0
);

4.- Ejecuta el backend: En tu terminal de VS Code, dentro de la carpeta donde se encuentra tu archivo server.js, ejecuta:
bash
Copiar código
node server/server.js
Esto levantará el servidor en el puerto 3000 y te permitirá conectarte con la base de datos y gestionar las tareas.

5.- Configuración del Frontend (HTML, CSS y JavaScript)
Abre tu archivo index.html en Visual Studio Code y asegúrate de que todos los archivos referenciados (style.css, app.js) estén correctamente vinculados.

6.- Ejecuta el frontend: Puedes abrir directamente el archivo index.html en tu navegador, haciendo clic derecho sobre el archivo en VS Code y seleccionando "Abrir con Live Server" (si tienes la extensión Live Server instalada) o simplemente arrastrando el archivo al navegador.

7.- Conexión con el backend: Cuando ambos (frontend y backend) estén ejecutándose, las solicitudes hechas desde el frontend (app.js) a las rutas del backend (server.js) se realizarán a través de http://localhost:3000.

8. Probando la Aplicación
Abre tu frontend en el navegador y prueba agregando una tarea en el campo de texto.
El backend recibirá la tarea, la almacenará en la base de datos y el frontend se actualizará para mostrar la nueva tarea.
