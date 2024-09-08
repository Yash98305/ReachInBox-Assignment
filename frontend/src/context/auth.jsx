import { useState, useEffect, useContext, createContext, useRef } from "react";
import axios from "axios";

const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: "",
  });
 
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

  return (
    <AuthContext.Provider
      value={{
        
        auth,
        setAuth,
       
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