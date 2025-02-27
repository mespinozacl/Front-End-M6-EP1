import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <MainLayout>
      <h1>Bienvenido a SafeApp</h1>
      {!user && <p><a href="/login">Iniciar Sesión</a></p>}
      {user && <p>Estás autenticado como <strong>{user.role}</strong>.</p>}
    </MainLayout>
  );
};

export default Home;