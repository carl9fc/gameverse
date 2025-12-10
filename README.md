#  GameVerse

**GameVerse** es una aplicación web Full-Stack diseñada para los amantes de los videojuegos. Permite a los usuarios explorar un amplio catálogo de juegos, consultar detalles técnicos, y participar en la comunidad publicando reseñas y calificaciones. La plataforma cuenta con autenticación segura y roles de usuario.

---

##  Características Principales

* **Autenticación de Usuarios:** Registro e inicio de sesión seguro (JWT).
* **Gestión de Roles:** Permisos diferenciados para Usuarios y Administradores.
* **Catálogo de Juegos:** Visualización atractiva de videojuegos con filtros y detalles.
* **Sistema de Reseñas:** Los usuarios pueden comentar y puntuar los juegos.
* **Panel de Administración:** Funcionalidad para agregar, editar o eliminar juegos (CRUD).
* **Diseño Responsivo:** Interfaz moderna adaptada a dispositivos móviles y escritorio.

---

## Alcance del Proyecto
* **Lo que HACE el sistema:
* **Gestión de Usuarios: Registro e inicio de sesión seguro (Autenticación mediante JWT).
* **Gestión de Roles: Diferenciación entre usuarios normales y administradores (Middleware role.js).
* **Catálogo de Juegos: Visualización de un listado de juegos con imágenes y descripciones.
* **Detalles y Reseñas: Permite ver la ficha técnica de un juego y leer o escribir reseñas/comentarios sobre el mismo.
* **Gestión de Contenido (CRUD): Los usuarios autorizados pueden agregar, editar o eliminar juegos (addGame.jsx, gameController.js).
* **Perfil de Usuario: Visualización y edición de datos del perfil propio.

* **Lo que NO HACE el sistema (Fuera de alcance):
* **Comercio Electrónico: No permite la compra o venta de videojuegos (no hay pasarela de pagos).
* **Multijugador en tiempo real: No es un juego en sí mismo, sino una wiki/catálogo.
* **Chat en vivo: No posee sistema de mensajería instantánea entre usuarios.

---

##  Tecnologías Utilizadas

El proyecto sigue una arquitectura separada (Frontend y Backend).

### Frontend (Cliente)
* **React + Vite:** Para una experiencia de usuario rápida y fluida.
* **Tailwind CSS:** Para el diseño y estilos modernos.
* **Axios:** Para el consumo de la API.
* **Context API:** Para el manejo del estado global (Autenticación).

### Backend (Servidor)
* **Node.js & Express:** Servidor RESTful API.
* **Sequelize (ORM):** Para la interacción con la base de datos SQL.
* **JWT & Bcrypt:** Para seguridad y encriptación de contraseñas.
* **Docker:** Para la contenerización del entorno.

### Base de Datos
* **PostgreSQL / MySQL:** (Dependiendo de tu configuración en `config/db.js`).

---

##  Pre-requisitos

Antes de comenzar, asegúrate de tener instalado:
* [Node.js](https://nodejs.org/) (v14 o superior)
* [Git](https://git-scm.com/)
* Un motor de base de datos SQL (PostgreSQL o MySQL) en ejecución localmente.

---

##  Instalación y Configuración

* **Sigue estos pasos para ejecutar el proyecto en tu entorno local:

###  Clonar el repositorio
* **```bash
* **git clone [https://github.com/carl9fc/gameverse.git](https://github.com/carl9fc/gameverse.git)
* **cd gameverse

### Configuración del Backend
* **Navega a la carpeta del servidor e instala las dependencias:

## Bash
* **cd gameverse_backend
* **npm install
* **Variables de Entorno: Crea un archivo .env en la raíz de gameverse_backend basándote en el archivo .env.example. Debería verse similar a esto:

## Fragmento de código

* **PORT=3000
* **DB_NAME=gameverse_db
* **DB_USER=root
* **DB_PASS=tu_password
* **DB_HOST=localhost
* **JWT_SECRET=tu_secreto_seguro
* **Base de Datos y Seeds: Ejecuta los siguientes comandos para crear las tablas y poblar datos de prueba:

##Bash

# Inicializar base de datos (si usas Sequelize CLI)
npx sequelize-cli db:migrate

# Cargar datos de prueba (Juegos iniciales)
node src/seeders/seedGames.js 
# o
npm run seed
Iniciar Servidor:

Bash

npm run dev
El servidor correrá en http://localhost:3000

3. Configuración del Frontend
Abre una nueva terminal, navega a la carpeta del cliente e instala dependencias:

Bash

cd gameverse_frontend
npm install
Iniciar Cliente:

Bash

npm run dev
La aplicación abrirá en http://localhost:5173 (o el puerto que indique Vite).
