import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContextValue";

function Navbar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={darkMode ? "dark" : ""}>
      <nav className="navbar">

        <NavLink to="/" className="logo">
          Saranya D
        </NavLink>

        <div className="nav-links">

          <NavLink to="/">
            About
          </NavLink>

          <NavLink to="/skills">
            Skills
          </NavLink>

          <NavLink to="/projects">
            Projects
          </NavLink>

          <NavLink to="/contact">
            Contact
          </NavLink>

          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

        </div>

      </nav>
    </header>
  );
}

export default Navbar;