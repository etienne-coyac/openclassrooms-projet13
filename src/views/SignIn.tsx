import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/clientContext";
import { Navigate, useNavigate } from "react-router-dom";

function SignIn() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await auth.signin(login, password, remember);
      if (res === true) {
        navigate("/profile");
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (auth.client.isLoggedIn()) {
    return <Navigate to="/" />;
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={login} onChange={(e) => setLogin(e.target.value)} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" onChange={(e) => setRemember(e.target.checked)} />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" type="submit">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}

export default SignIn;
