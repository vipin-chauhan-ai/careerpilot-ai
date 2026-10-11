import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApiErrorMessage, registerUser } from "../services/authService";
function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  function handleChange(event) {
    const { name, value } = event.target;
    setForm(current => ({
      ...current,
      [name]: value
    }));
  }
  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setSubmitting(true);
    try {
      await registerUser({
        full_name: form.full_name,
        email: form.email,
        password: form.password
      });
      navigate("/login", {
        state: {
          message: "Registration successful. Please login."
        }
      });
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container py-5">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: 560 }}>
        <div className="card-body p-4">
          <h1 className="h3 mb-4">Create Account</h1>
          {error &&
            <div className="alert alert-danger">
              {error}
            </div>}
          <form onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="full_name">
              Full Name
            </label>
            <input
              className="form-control mb-3"
              id="full_name"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              minLength={2}
              required
            />
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="form-control mb-3"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              required
            />
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-control mb-3"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              minLength={8}
              required
            />
            <label className="form-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="form-control mb-3"
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              type="password"
              minLength={8}
              required
            />
            <button className="btn btn-primary w-100" disabled={submitting}>
              {submitting ? "Creating account..." : "Register"}
            </button>
          </form>
          <p className="mt-3 mb-0 text-center">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Register;
