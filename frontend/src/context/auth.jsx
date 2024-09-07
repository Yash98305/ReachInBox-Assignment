import { useState, useEffect, useContext, createContext, useRef } from "react";
import axios from "axios";

const AuthContext = createContext(null);
const api = "https://saastensorgobackend.onrender.com/api/v1";
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  const [mot, setmot] = useState(true);
  const [o, so] = useState(true);
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }

    //eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider
      value={{
        api,
        auth,
        setAuth,
        mot,
        setmot,
        o,
        so,
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