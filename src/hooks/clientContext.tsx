import React, { ReactNode, useContext, useState } from "react";
import Client from "../api/client";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/features/userSlice";
import { useNavigate } from "react-router-dom";

interface Auth {
  client: Client;
  signin: (email: string, password: string, remember: boolean) => Promise<boolean>;
  signout: () => void;
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
    const client = new Client(url).parse(auth);
    client.profile.get().then((profile) => dispatch(setUser(profile)));
    return client;
  });

  const signin = async (email: string, password: string, remember: boolean) => {
    try {
      if (client.isLoggedIn()) {
        throw new Error("User is already logged in.");
      }
      await client.login({ email, password });
      if (remember) {
        localStorage.setItem("auth", client.stringify());
      }
      dispatch(setUser(client.user));
    } catch (e) {
      return false;
    }
    return true;
  };

  const signout = async () => {
    //@TODO clear redux states
    localStorage.clear();
    clearRedux();
    setClient(new Client(url));
  };

  const clearRedux = () => {
    dispatch(setUser(undefined));
  };

  return {
    client,
    signin,
    signout
  };
};

export default function AuthProvider(props: { children: ReactNode }) {
  const auth = useAuthProvider();

  return <authContext.Provider value={auth}>{props.children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}
