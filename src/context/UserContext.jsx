import { createContext, useState } from "react";

// 1. Creamos y exportamos el UserContext
export const UserContext = createContext();

// URL base de tu backend en Render (tomada de tu archivo .env)
const API_URL = import.meta.env.VITE_API_URL;

export const UserProvider = ({ children }) => {
    // 📌 ESTADOS: Ahora guardamos el token real (string) y el email del usuario
    // Empezamos en null (nadie logueado al inicio)
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState(null);

    // 🔹 REQ 1 (Parte A): Método para hacer Login (/api/auth/login)
    const login = async (emailInput, passwordInput) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailInput,
                    password: passwordInput,
                }),
            });

            const data = await response.json();

            if (data?.error) {
                alert(data.error);
                return false;
            }

            // Guardamos el token y el email en los estados y en localStorage
            setToken(data.token);
            setEmail(data.email);
            localStorage.setItem("token", data.token);
            return true;
        } catch (error) {
            console.error("Error en login:", error);
            return false;
        }
    };

    // 🔹 REQ 1 (Parte B): Método para hacer Register (/api/auth/register)
    const register = async (emailInput, passwordInput) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailInput,
                    password: passwordInput,
                }),
            });

            const data = await response.json();

            if (data?.error) {
                alert(data.error);
                return false;
            }

            // Guardamos el token y el email en los estados y en localStorage
            setToken(data.token);
            setEmail(data.email);
            localStorage.setItem("token", data.token);
            return true;
        } catch (error) {
            console.error("Error en register:", error);
            return false;
        }
    };

    // 🔹 REQ 2: Método para hacer Logout (limpia token y email)
    const logout = () => {
        setToken(null);
        setEmail(null);
        localStorage.removeItem("token");
    };

    // 🔹 REQ 3: Método para obtener el perfil del usuario (/api/auth/me)
    const getProfile = async () => {
        if (!token) return;

        try {
            const response = await fetch(`${API_URL}/api/auth/me`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (data?.email) {
                setEmail(data.email);
            }
        } catch (error) {
            console.error("Error al obtener perfil:", error);
        }
    };

    return (
        // 📌 Compartimos token, email y los 4 métodos con toda la aplicación
        <UserContext.Provider value={{ token, email, login, register, logout, getProfile }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;