# 🎮 GameVerse

**GameVerse** es una aplicación web Full-Stack diseñada para los amantes de los videojuegos. Permite a los usuarios explorar un amplio catálogo de juegos, consultar detalles técnicos, y participar en la comunidad publicando reseñas y calificaciones. La plataforma cuenta con autenticación segura y roles de usuario.

---

## 🚀 Características Principales

* **Autenticación de Usuarios:** Registro e inicio de sesión seguro (JWT).
* **Gestión de Roles:** Permisos diferenciados para Usuarios y Administradores.
* **Catálogo de Juegos:** Visualización atractiva de videojuegos con filtros y detalles.
* **Sistema de Reseñas:** Los usuarios pueden comentar y puntuar los juegos.
* **Panel de Administración:** Funcionalidad para agregar, editar o eliminar juegos (CRUD).
* **Diseño Responsivo:** Interfaz moderna adaptada a dispositivos móviles y escritorio.

---

## 🛠️ Tecnologías Utilizadas

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

## 📋 Pre-requisitos

Antes de comenzar, asegúrate de tener instalado:
* [Node.js](https://nodejs.org/) (v14 o superior)
* [Git](https://git-scm.com/)
* Un motor de base de datos SQL (PostgreSQL o MySQL) en ejecución localmente.

---

## 🔧 Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/carl9fc/gameverse.git](https://github.com/carl9fc/gameverse.git)
cd gameverse
