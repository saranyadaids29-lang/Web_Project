import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">

        <NavLink to="/" className="logo">
          TaskFlow
        </NavLink>

        <nav className="nav-links">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/daily"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Daily
          </NavLink>

          <NavLink
            to="/weekly"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Weekly
          </NavLink>

          <NavLink
            to="/important-days"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Calendar
          </NavLink>

        </nav>

      </div>
    </header>
  );
}

export default Navbar;