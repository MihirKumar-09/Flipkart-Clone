import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();
import { useNavigate } from "react-router-dom";
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle Login;
  const handleLogin = async (username, password) => {
    try {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        navigate("/");
      } else {
        setError("Invalid username or password");
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Check user login or not ;
  const checkUser = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/check-login", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log(err);
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  // Update User;
  const updateUser = async (updates) => {
    try {
      const res = await fetch("http://localhost:8080/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      console.log(err);
      return { success: false, error: err.message };
    }
  };

  // Logout the user;
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setUser(null);
        navigate("/");
      } else {
        console.log("Logout failed", data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ handleLogin, error, user, checkUser, updateUser, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
