import { Link } from "react-router-dom";
import argentBankLogo from "../assets/images/argentBankLogo.png";
import { useAuth } from "../hooks/clientContext";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

function Header() {
  const auth = useAuth();
  const profile = useAppSelector((state: RootState) => state.user.value);
  const handleSignOut = () => {
    auth.signout();
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {profile ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {profile.firstName}
            </Link>
            <Link className="main-nav-item" to="/login" onClick={handleSignOut}>
              Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
