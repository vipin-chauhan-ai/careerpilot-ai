import { NavLink } from "react-router-dom";
function Navbar() {
  const navClass = ({ isActive }) =>
    `nav-link ${isActive ? "active fw-semibold" : ""}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">
          CareerPilot AI
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <div className="navbar-nav ms-auto">
            <NavLink className={navClass} to="/">
              Home
            </NavLink>
            <NavLink className={navClass} to="/about">
              About
            </NavLink>
            <NavLink className={navClass} to="/contact">
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
