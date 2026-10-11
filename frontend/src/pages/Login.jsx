import { useState } from "react";
import {
 Link,
 useLocation,
 useNavigate,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getApiErrorMessage } from "../services/authService";
function Login() {
const { login } = useAuth();
 const location = useLocation();
 const navigate = useNavigate();
 const [form, setForm] = useState({ email: "", password: "" });
 const [error, setError] = useState("");
 const [submitting, setSubmitting] = useState(false);
 function handleChange(event) {
 const { name, value } = event.target;
 setForm((current) => ({ ...current, [name]: value }));
 }
 async function handleSubmit(event) {
 event.preventDefault();
 setError("");
 setSubmitting(true);
 try {
 await login(form.email, form.password);
 navigate("/dashboard", { replace: true });
 } catch (requestError) {
 setError(getApiErrorMessage(requestError));
 } finally {
 setSubmitting(false);
 }
 }
 return (
 <div className="container py-5">
 <div className="card shadow-sm mx-auto" style={{ maxWidth: 520 }}>
 <div className="card-body p-4">
 <h1 className="h3 mb-4">Login</h1>
 {location.state?.message && (
 <div className="alert alert-success">
 {location.state.message}
 </div>
 )}
 {error && <div className="alert alert-danger">{error}</div>}
 <form onSubmit={handleSubmit}>
 <label className="form-label" htmlFor="email">Email</label>
 <input
 className="form-control mb-3"
 id="email"
 name="email"
 type="email"
 value={form.email}
 onChange={handleChange}
 required
 />
 <label className="form-label" htmlFor="password">Password</label>
 <input
 className="form-control mb-3"
 id="password"
 name="password"
 type="password"
 value={form.password}
 onChange={handleChange}
 required
 />
 <button className="btn btn-primary w-100" disabled={submitting}>
 {submitting ? "Signing in..." : "Login"}
 </button>
 </form>
 <p className="mt-3 mb-0 text-center">
 New user? <Link to="/register">Create account</Link>
 </p>
 </div>
 </div>
 </div>
 );
}
export default Login;
