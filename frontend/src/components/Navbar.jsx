import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Navbar() {
 const { isAuthenticated, logout } = useAuth();
 const navigate = useNavigate();
 const navClass = ({ isActive }) =>
 `nav-link ${isActive ? "active fw-semibold" : ""}`;
 function handleLogout() {
 logout();
 navigate("/login");
 }
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
 <div className="navbar-nav ms-auto align-items-lg-center">
 <NavLink className={navClass} to="/">Home</NavLink>
 <NavLink className={navClass} to="/about">About</NavLink>
 <NavLink className={navClass} to="/contact">Contact</NavLink>
 {isAuthenticated ? (
 <>
 <NavLink className={navClass} to="/dashboard">
 Dashboard
 </NavLink>
 <button
 className="btn btn-outline-light ms-lg-2"
 onClick={handleLogout}
 >
 Logout
 </button>
 </>
 ) : (
 <>
 <NavLink className={navClass} to="/register">
 Register
 </NavLink>
 <NavLink className={navClass} to="/login">
 Login
 </NavLink>
 </>
 )}
 </div>
 </div>
 </div>
 </nav>
 );
}
export default Navbar;