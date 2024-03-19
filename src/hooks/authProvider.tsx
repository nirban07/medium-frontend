import { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type DataType = { email: string, password: string, username?: string }

type AuthContextType = {
  user: null,
  token: string,
  loginAction: (data: DataType, sign: string) => void,
  logOut: () => void,
};

export const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children?: ReactNode
  // any props that come into the component
}




const AuthProvider = ({ children }: Props) => {
  const signup = "https://backend.nirban012.workers.dev/api/v1/user/signup"
  const signin = "https://backend.nirban012.workers.dev/api/v1/user/signin"
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loginAction = async (data: DataType, sign: string) => {
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


