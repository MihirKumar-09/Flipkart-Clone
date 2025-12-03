import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

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

  return (
    <AuthContext.Provider value={{ user, setUser, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
