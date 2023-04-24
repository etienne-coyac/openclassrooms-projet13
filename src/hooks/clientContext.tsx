import React, { ReactNode, useContext, useState } from "react";
import Client from "../api/client";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/features/userSlice";

interface Auth {
  client: Client;
  signin: (email: string, password: string, remember: boolean) => void;
}

const authContext = React.createContext<Auth>(undefined!);

const useAuthProvider = () => {
  const url = "http://localhost:3001/api/v1";
  const dispatch = useAppDispatch();
  const [client, setClient] = useState<Client>(function () {
    const auth = localStorage.getItem("auth");
    if (auth === null) {
      return new Client(url);
    }
    return new Client(url).parse(auth);
  });

  const signin = async (email: string, password: string, remember: boolean) => {
    try {
      const client = await new Client(url).login({ email, password });
      if (remember) {
        localStorage.setItem("auth", client.stringify());
      }
      setClient(client);
      const user = await client.profile.get();
      dispatch(setUser(user));
    } catch (e) {
      /* empty */
    }
  };

  const signout = async () => {
    //@TODO clear redux states
    localStorage.clear();
    setClient(new Client(url));
  };

  return {
    client,
    signin
  };
};

export default function AuthProvider(props: { children: ReactNode }) {
  const auth = useAuthProvider();

  return <authContext.Provider value={auth}>{props.children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}
