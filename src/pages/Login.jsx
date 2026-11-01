import { useState, useContext } from "react"; // 👈 1. Importamos useContext
import { UserContext } from "../context/UserContext"; // 👈 2. Importamos UserContext

const Login = () => {
    // Definimos los estados para email y password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 👈 3. Extraemos la función login desde nuestro UserContext
    const { login } = useContext(UserContext);

    // 👈 4. Convertimos handleSubmit en async para esperar la respuesta del backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación 1: que ningún campo esté vacío
        if (email.trim() === '' || password.trim() === '') {
            alert('Todos los campos son obligatorios');
            return;
        }

        // Validación 2: El password al menos debe tener 6 caracteres
        if (password.length < 6) {
            alert('El password debe tener al menos 6 caracteres');
            return;
        }

        // 👈 5. Llamamos al método login del contexto (que hace el fetch a Render)
        const success = await login(email, password);

        if (success) {
            alert('¡Login exitoso!');
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div className="container mt-5 mb-5" style={{ maxWidth: "400px" }}>
            <h2 className="mb-4">Login</h2>
            <form onSubmit={handleSubmit}>

                {/* Campo 1: email */}
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Campo 2: password */}
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-dark w-100">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;