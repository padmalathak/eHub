import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import siteLogo from "../../../assets/logo/download.png";

function Header() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <header className="header">
      <div className="header__list">
        <div className="header__logo-container">
          <Link to="/">
            <img className="header__logo" src={siteLogo} alt="Instock Logo" />
          </Link>
        </div>

        <div className="header__button-container">
          <NavLink to="/" className="header__users-button">
            Users
          </NavLink>
          <NavLink to="/roles" className="header__users-button">
            Roles
          </NavLink>
          <NavLink to="/import" className="header__users-button">
            Import
          </NavLink>
        </div>

        <div>
          <button className="signout_button" onClick={handleSignOut}>
            SignOut
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
