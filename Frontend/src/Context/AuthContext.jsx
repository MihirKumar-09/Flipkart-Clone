import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();
import { useNavigate } from "react-router-dom";
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle SignUp
  const handleSignup = async (username, email, password, confirmPassword) => {
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
          credentials: "include",
        },
      );

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
        return true;
      } else {
        setError(data.message);
        return false;
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
      return false;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      // 1️⃣ LOGIN → session create
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (!res.ok) {
        setError("Invalid username or password");
        setUser(null);
        return false;
      }

      // session verify
      const checkRes = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/check`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!checkRes.ok) {
        setUser(null);
        return false;
      }

      const checkData = await checkRes.json();

      // 3️⃣ FRONTEND AUTH STATE SET
      setUser(checkData.user);
      setError("");
      navigate("/");

      return true;
    } catch (error) {
      console.log(error);
      setUser(null);
      return false;
    }
  };

  // Check user login or not ;
  const checkUser = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/check`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data.user);
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
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updates),
        },
      );
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
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
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
      value={{
        handleSignup,
        handleLogin,
        error,
        setError,
        user,
        checkUser,
        updateUser,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
