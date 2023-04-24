import { Link } from "react-router-dom";
import argentBankLogo from "../assets/images/argentBankLogo.png";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { useAuth } from "../hooks/clientContext";
function Header() {
  const profile = useAppSelector((state: RootState) => state.user.value);
  const auth = useAuth();
  const handleSignOut = () => {
    auth.signout();
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {profile ? (
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {profile.firstName}
            </Link>
            <Link className="main-nav-item" to="/sign-in" onClick={handleSignOut}>
              Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
