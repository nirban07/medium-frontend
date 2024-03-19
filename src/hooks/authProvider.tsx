import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const signup = "https://backend.nirban012.workers.dev/api/v1/user/signup"
  const signin = "https://backend.nirban012.workers.dev/api/v1/user/signin"
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const loginAction = async (data, sign) => {
    const url = sign == "signup" ? signup : signin
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();

      if (res.jwt) {
        setUser(res.user);
        setToken(res.jwt);
        localStorage.setItem("site", res.jwt);
        navigate("/blog/bulk");
        return;
      }
      throw new Error(res.message);

    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/signin");
  };

  return <AuthContext.Provider value={{ user, token, loginAction, logOut }}>{children} </AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
