import { useState, useEffect, useContext, createContext, useRef } from "react";
import axios from "axios";

const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: "",
  });
  const [open, setOpen] = useState(false);

  const [sel,setSel] = useState();
  const [theme, setTheme] = useState('light');  
 
  axios.defaults.headers.common["Authorization"] = `Bearer ${auth?.token}`;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        token: parseData.token,
      });
    }
  }, []);
  useEffect(() => {
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#000000'; // Dark mode
      document.body.style.color = '#ffffff'; // Optional: Set text color
    } else {
      document.body.style.backgroundColor = '#ffffff'; // Light mode
      document.body.style.color = '#000000'; // Optional: Set text color
    }
  }, [theme]);

  return (
    <AuthContext.Provider
      value={{
        setTheme,theme,
        auth,
        setAuth,
        sel,setSel,open, setOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export default useAuth;
export { AuthProvider};