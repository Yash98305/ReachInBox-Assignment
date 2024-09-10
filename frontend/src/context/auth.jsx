import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: "",
  });
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [sel, setSel] = useState();
  const [theme, setTheme] = useState("light");

  // Set the Authorization token in Axios whenever auth.token changes
  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"]; // Remove the header if no token
    }
  }, [auth.token]);

  // Load token from localStorage
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        token: parseData.token,
      });
    }
  }, []);

  // Handle theme change
  useEffect(() => {
    if (theme === "dark") {
      document.body.style.backgroundColor = "#000000"; // Dark mode
      document.body.style.color = "#ffffff"; // Optional: Set text color
    } else {
      document.body.style.backgroundColor = "#ffffff"; // Light mode
      document.body.style.color = "#000000"; // Optional: Set text color
    }
  }, [theme]);

  return (
    <AuthContext.Provider
      value={{
        setTheme,
        theme,
        auth,
        setAuth,
        sel,
        setSel,
        open,
        setOpen,
        dialog,
        setDialog,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming the AuthContext
const useAuth = () => useContext(AuthContext);

export default useAuth;
export { AuthProvider };
