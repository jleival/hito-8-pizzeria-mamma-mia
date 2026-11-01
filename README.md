# 🍕 Pizzería Mamma Mía - Hito 8 (Autenticación con JWT)

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.0-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

Aplicación web full-stack para **Pizzería Mamma Mía**, desarrollada como parte del **Hito 8 (Final)** del módulo de React en **Desafío Latam**. En esta entrega se implementa la autenticación y autorización real de usuarios mediante **JSON Web Tokens (JWT)**, gestión de estado global con **Context API**, protección de rutas con **React Router** y simulación de pago del carrito conectado a un backend en producción desplegado en **Render**.

---

## 🌐 Demo en Vivo y Repositorio

- 🚀 **Deploy en Producción (Vercel):** [https://hito-8-pizzeria-mamma-mia-bice.vercel.app/](https://hito-8-pizzeria-mamma-mia-bice.vercel.app/)
- 💻 **Repositorio en GitHub:** [https://github.com/jleival/hito-8-pizzeria-mamma-mia](https://github.com/jleival/hito-8-pizzeria-mamma-mia)
- ⚙️ **Backend API (Render):** `https://pizzeria-backend-60le.onrender.com`

---

## ✨ Características y Requerimientos Implementados

1. **Autenticación y Registro con JWT (`UserContext.jsx`):**
   - Consumo de los endpoints `POST /api/auth/login` y `POST /api/auth/register`.
   - Almacenamiento del `token` JWT y del `email` del usuario autenticado en el estado global y en `localStorage`.
2. **Cierre de Sesión (`logout`):**
   - Método centralizado en `UserContext` que limpia los estados `token` y `email`, además de remover el token de `localStorage`.
   - Integrado tanto en el botón **Logout** del `Navbar` como en la vista `Profile`.
3. **Obtención de Perfil Protegido (`/api/auth/me`):**
   - Petición `GET /api/auth/me` enviando el token en el encabezado `Authorization: Bearer <token>`.
   - Visualización dinámica del correo real del usuario autenticado en la página `/profile`.
4. **Rutas Protegidas y Redirección (`App.jsx`):**
   - Protección de `/profile` redirigiendo a `/login` si el usuario no posee un token activo.
   - Redirección automática al `/` (Home) desde `/login` y `/register` una vez que el usuario inicia sesión o se registra exitosamente.
5. **Checkout y Procesamiento de Compra (`Cart.jsx`):**
   - Envío del carrito de compras mediante `POST /api/checkouts` adjuntando el token JWT en las cabeceras.
   - Renderizado de alerta visual de confirmación cuando la orden es procesada con éxito.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React, React Router DOM, Context API (`UserContext`, `CartContext`, `PizzaContext`).
- **Estilos:** Bootstrap 5 & React-Bootstrap.
- **Autenticación:** JSON Web Token (JWT) + `fetch` API nativa.
- **Despliegue:** Frontend en **Vercel** y Backend Node.js/Express en **Render**.

---

## 📂 Estructura del Proyecto

```text
src/
├── assets/             # Imágenes y recursos estáticos
├── components/         # Componentes reutilizables
│   ├── CardPizza.jsx   # Tarjeta individual de cada pizza
│   ├── Footer.jsx      # Pie de página
│   ├── Header.jsx      # Banner principal
│   └── Navbar.jsx      # Barra de navegación dinámica según sesión
├── context/            # Estado global con Context API
│   ├── CartContext.jsx # Lógica del carrito de compras y cálculo de totales
│   ├── PizzaContext.jsx# Consumo del catálogo de pizzas desde la API
│   └── UserContext.jsx # Autenticación JWT (login, register, logout, getProfile)
├── pages/              # Vistas principales de la aplicación
│   ├── Cart.jsx        # Carrito de compras y checkout con JWT
│   ├── Home.jsx        # Catálogo principal de pizzas
│   ├── Login.jsx       # Formulario de inicio de sesión conectado a UserContext
│   ├── NotFound.jsx    # Página 404
│   ├── Pizza.jsx       # Detalle dinámico de pizza (/pizza/:id)
│   ├── Profile.jsx     # Perfil protegido del usuario autenticado
│   └── Register.jsx    # Formulario de registro conectado a UserContext
├── App.jsx             # Configuración de rutas públicas y protegidas
└── main.jsx            # Punto de entrada de la aplicación
```

---

## 🚀 Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/jleival/hito-8-pizzeria-mamma-mia.git
   cd hito-8-pizzeria-mamma-mia
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto con la URL del backend:
   ```env
   VITE_API_URL=https://pizzeria-backend-60le.onrender.com
   ```

4. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

---

## 🧪 Credenciales de Prueba

Puedes registrar un nuevo usuario desde la vista `/register` o utilizar las credenciales de prueba por defecto:

- **Email:** `test@test.com`
- **Password:** `123123`

---

## 👨‍💻 Autor

Desarrollado por **Jorge Leiva** para el Bootcamp Full Stack JavaScript de **Desafío Latam**.
