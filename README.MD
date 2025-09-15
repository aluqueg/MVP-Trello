# 📝 MVP Trello

Este proyecto es un **MVP (Minimum Viable Product) de un clon de Trello**, desarrollado con:

- **Frontend**: React + Vite + Chakra UI  
- **Backend**: Node.js + Express + Sequelize  
- **Base de datos**: MySQL  
- **Autenticación**: JWT  
- **Gestión de contraseñas**: Recuperación de contraseña con tokens de reseteo  

El objetivo es ofrecer un sistema Kanban donde los usuarios pueden:
- Registrarse e iniciar sesión.
- Crear tableros.
- Crear, editar y eliminar tareas.
- Mover tareas entre columnas (pendiente, en progreso, terminado).
- Editar o eliminar tableros.
- Recuperar contraseña (flujo simulado con token, sin envío de correo).

---

## 🚀 Instalación

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/aluqueg/MVP-Trello.git
cd MVP-Trello
```

### 2️⃣ Configuración Backend

Ir a la carpeta del servidor:

``` bash
cd server
```

Instalar dependencias:

``` bash
npm install
```

Crear un archivo .env en la carpeta server/ con esta configuración:

``` bash
#puerto del servidor
PORT=3000

#database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=trello

#jwt
JWT_SECRET=secreto
JWT_EXPIRES=15m
```
Configura la base de datos:

- Abre MySQL Workbench (o tu cliente preferido).

- Crea la base de datos trello.

- Ejecuta el script que encontrarás en la carpeta `BD/trello.sql` para crear las tablas iniciales.

⚡ Opcionalmente, Sequelize ajustará los modelos con:

```bash
sequelize.sync({ alter: true })
```

Iniciar el servidor:

``` bash
npm run dev
```

El backend corre en http://localhost:3000.

### 3️⃣ Configuración Frontend

Ir a la carpeta del cliente:

``` bash
cd ../client
```

Instalar dependencias:

``` bash
npm install
```

Iniciar el cliente:

``` bash
npm run dev
```

El frontend corre en http://localhost:5173.

### 📂 Estructura del proyecto

``` bash
MVP-Trello/
│── client/              # Frontend con React + Vite
│   └── src/
│       ├── components/  # Componentes reutilizables (modales, formularios...)
│       ├── pages/       # Páginas principales (login, tableros, tablero)
│       └── App.jsx
│
│── server/              # Backend con Node.js + Express
│   ├── config/          # Configuración de Sequelize y DB
│   ├── controllers/     # Lógica de negocio (users, tasks, tableros, auth)
│   ├── models/          # Modelos Sequelize (User, Board, Task)
│   ├── routes/          # Endpoints de la API
│   └── app.js           # Configuración principal del servidor
│
└── README.md
```

### ⚙️ Endpoints principales
**🔐 Auth**

`POST /api/users/register` → Registro de usuario

`POST /api/users/login` → Login

`POST /api/auth/recover` → Iniciar recuperación de contraseña

`POST /api/auth/reset-password` → Resetear contraseña

**📌 Tableros**

`POST /api/tableros/createTablero` → Crear tablero

`GET /api/tableros/getTableros/:user_id` → Listar tableros de usuario

`PUT /api/tableros/updateTableros/:tablero_id` → Editar tablero

`DELETE /api/tableros/deleteTableros/:tablero_id` → Eliminar tablero

**✅ Tareas**

`POST /api/tasks/createTasks` → Crear tarea

`GET /api/tasks/getTasks/:tablero_id` → Listar tareas de un tablero

`PUT /api/tasks/updateTasks/:task_id` → Editar tarea

`DELETE /api/tasks/deleteTasks/:task_id` → Eliminar tarea
-----------------------------------------

**🖥️ Uso**

**Regístrate e inicia sesión.**

Crea un tablero desde la pantalla de "Tus Tableros".

Accede a un tablero y crea tareas en cualquiera de las columnas.

Edita tareas y cámbialas de estado para moverlas entre columnas.

Elimina tareas o tableros cuando quieras.

Recupera tu contraseña desde la pantalla de login (flujo simulado con token).
-------------------------------------

**🛠️ Tecnologías utilizadas**

Frontend: React, Vite, Chakra UI, Axios, React Router

Backend: Node.js, Express, Sequelize, DotEnv, Cors

Base de datos: MySQL

Autenticación: JWT + bcrypt

Control de versiones: GitHub
--------------------------------------

## 📌 Notas

Por simplicidad, el sistema de **recuperación de contraseña** guarda el token en **localStorage** en lugar de enviar un correo real.

El backend está configurado para permitir solicitudes desde http://localhost:5173 (puerto por defecto de Vite).
--------------------------------------

Desarrollado por Álvaro Luque 🚀
Repositorio GitHub - https://github.com/aluqueg
