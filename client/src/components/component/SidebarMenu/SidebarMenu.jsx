import "./SidebarMenu.scss";
import "bootstrap/dist/css/bootstrap-grid.css";

import "bootstrap/js/dist/dropdown";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import AppList from "../AppList/AppList";

function SidebarMenu({ name }) {
  return (
    <section className="sidebar__main">
      <div className="wrap">
        <div className="d-flex justify-content-between flex-column sidebar">
          <div>

            <ul className="sidebar__ul">
              <li className="nav-item text-white fs-4 sidebar--active">
                <Link
                  to="/dashboard"
                  className="sidebar__link"
                  aria-current="page"
                >
                  <i className="bi bi-window-stack  sidebar__icon"></i>
                  <span className="sidebar__text ">
                    Dashboard
                  </span>
                </Link>
              </li>
              <li className="nav-item text-white fs-4 ">
                <Link
                  to="#"
                  className="sidebar__link"
                  aria-current="page"
                >
                  <i className="bi bi-person-heart  sidebar__icon"></i>
                  <span className="sidebar__text">
                    Edit
                  </span>
                </Link>
              </li>
              <li className="nav-item text-white fs-4">
                <Link
                  to="#"
                  className="sidebar__link"
                  aria-current="page"
                >
                  <i className="bi bi-gear sidebar__icon "></i>
                  <span className="sidebar__text">
                    Settings
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="sidebar__user">
            <a
              className="text-decoration-none text-white p-3 dropdown-toggle"
              type="button"
              id="triggerID"
              aria-expanded="false"
            >
              <i className="bi bi-person-circle"></i>
              <span className="sidebar__name">{name}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SidebarMenu;
