import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import EquipoMedico from "../pages/EquipoMedico";
import Vulnerabilities from "../pages/Vulnerabilities";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
import '../App.css';
import DoctorContextProvider from '../context/DoctorContextProvider';

const AppRoutes = () => {

  return (
    <AuthProvider>
      <Router>
      <DoctorContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/equipo-medico"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <EquipoMedico />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vulnerabilities"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Vulnerabilities />
              </ProtectedRoute>
            }
          />
        </Routes>
      </DoctorContextProvider>
      </Router>
      <div id="doctor-modal" />
    </AuthProvider>
  );
};

export default AppRoutes;
