import {
  FaFileAlt,
  FaHistory,
  FaCog
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  return (
    <nav className="site-navbar" aria-label="Main navigation">
      <NavLink className="brand" to="/summarize" aria-label="Sift home">
        <span className="brand-mark" aria-hidden="true">s</span>
        <span className="brand-name">sift<span>.</span></span>
      </NavLink>

      <ul className="site-navbar-links">
        <li>
          <NavLink to="/summarize">
            <FaFileAlt aria-hidden="true" />
            <span>Summarize</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/history">
            <FaHistory aria-hidden="true" />
            <span>History</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings">
            <FaCog aria-hidden="true" />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;