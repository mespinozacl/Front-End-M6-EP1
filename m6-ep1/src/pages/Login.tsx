import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {User} from "../objects/User";

const Login = () => {
  const { login, authError } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(authError);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setIsLoading(true);

    if (!username || !password) {
      setError("Por favor, ingrese usuario y contraseña.");
      setIsLoading(false);
      return;
    }

    /*
    try {
      const response = await fetch("/api/login", { // Replace with your API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const data = await response.json(); // Get error message from the server
        setError(data.message || "Error al iniciar sesión."); // Display server error or generic message
        setIsLoading(false);
        return;
      }
      const data = await response.json();
      login(data.token); // Store the token
      navigate("/dashboard"); // Or wherever you want to redirect
    } catch (err) {
      console.error("Login error:", err);
      setError("Ocurrió un error. Inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
    */
    try {
      if (username == "admin" && password == "password") {
        login(new User(1,"admin","admin","Administrador"));
        navigate("/dashboard");
      } else if (username == "user" && password == "password") {
        //login("user");
        login(new User(2,"user",'user',"User"));
        navigate("/");
      } else {
        alert("Credenciales incorrectas");
      } 
    } catch (err) {
        console.error("Login error:", err);
        setError("Ocurrió un error. Inténtalo de nuevo más tarde.");
    } finally {
        setIsLoading(false);
      }
  };

  return (
    <MainLayout>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <label>
          Usuario:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Cargando..." : "Entrar"} {/* Loading state */}
        </button>
      </form>
    </MainLayout>
  );
};

export default Login;