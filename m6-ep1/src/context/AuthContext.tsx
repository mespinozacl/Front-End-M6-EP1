import React, { createContext, useContext, useState, useEffect } from "react";
import { encryptData, decryptData } from "../utils/encryption";
import {User} from "../objects/User";

interface UserApiResponse { // Interface for API response
  id: number;
  email: string;
  role: 'admin' | 'user';
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: UserApiResponse) => void; // Type the login function argument
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  authError: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false, // Initialize to false
  loading: true,
  authError: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // Use correct type
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        try {
            const decryptedUser = decryptData(storedUser);
            setUser(decryptedUser);
        } catch (error) {
            console.error("Error decrypting user data:", error);
            localStorage.removeItem("user");
            setUser(null);
            setAuthError("Error loading session."); // Set error message
        }
    }
    setLoading(false);
  }, []);

  const login = (userData: UserApiResponse) => {
    const user = new User(userData.id, userData.email, userData.role, userData.name); // Create User instance
    setUser(user);
    const encryptedUser = encryptData(user);
    localStorage.setItem("user", encryptedUser);
    setAuthError(null); // Clear any previous errors
  };



  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setAuthError(null); // Clear any previous errors
  };

  const value:AuthContextType = { user, login, logout, isAuthenticated: user !== null, loading, authError, };

  return (
      <AuthContext.Provider value={value}>
          {!loading ? children : <p>Cargando...</p>}
      </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export type { AuthContextType, User, UserApiResponse }; // Export UserApiResponse