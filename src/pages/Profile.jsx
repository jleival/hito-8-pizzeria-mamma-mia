import { useContext, useEffect } from "react"; // 👈 1. Importamos useEffect
import { UserContext } from "../context/UserContext";

const Profile = () => {
    // 👈 2. Extraemos email, logout y getProfile desde UserContext
    const { email, logout, getProfile } = useContext(UserContext);

    // 👈 3. Al cargar la página, consultamos /api/auth/me por si hace falta refrescar el perfil
    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div className="container mt-5 text-center">
            <h2>Perfil de Usuario</h2>
            {/* 👈 4. Mostramos el email real del estado global */}
            <p className="text-muted">Email: {email}</p>
            <button onClick={logout} className="btn btn-danger">
                Cerrar Sesión
            </button>
        </div>
    );
};

export default Profile;