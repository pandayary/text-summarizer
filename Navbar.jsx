import { Link } from "react-router-dom";

function Navbar() {

  return (
    <nav className="navbar">

      <div className="logo">
        Summarize
      </div>

      <ul className="nav-links">

        <li>
          <Link to="/">
            Home
          </Link>
        </li>

        <li>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/about">
            About
          </Link>
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;