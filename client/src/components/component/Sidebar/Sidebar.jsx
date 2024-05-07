import "./Sidebar.scss";
import { NavLink } from "react-router-dom";
import AddButton from "../AddButton/AddButton";

function Sidebar() {
  return (
    <div className="sidebar-main">
      <div className="test-container">
        <NavLink to="/" className="header__users-button">
          Users
        </NavLink>
        <NavLink to="/roles" className="header__users-button">
          Roles
        </NavLink>
        <NavLink to="/applications" className="header__users-button">
          Applications
        </NavLink>
        <NavLink to="/import" className="header__users-button">
          Import
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
