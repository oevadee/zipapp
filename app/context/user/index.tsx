import * as React from "react";
import { User } from "../../types/user";

interface UserStore {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = React.createContext<UserStore | null>(null);

export const useUser = () => React.useContext(UserContext) as UserStore;

interface Props {
  children: React.ReactNode;
}

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = React.useState<null | User>(null);

  React.useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setUser({
        email: token,
      });
    }
  }, []);

  const userStore = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={userStore}>{children}</UserContext.Provider>
  );
};
