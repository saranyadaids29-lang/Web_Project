import { useEffect, useState } from "react";
import "./FormValidation.css";

function FormValidation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));
  };

  useEffect(() => {
    const newErrors = {};

    // Name
    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must contain at least 3 characters";
    }

    // Email
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (formData.email === "") {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Password
    if (formData.password === "") {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain a capital letter";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Password must contain a small letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain a number";
    } else if (!/[!@#$%^&*]/.test(formData.password)) {
      newErrors.password = "Password must contain a special character";
    }

    // Confirm password
    if (formData.confirmPassword === "") {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
  }, [formData]);

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    if (isFormValid) {
      alert("Registration successful!");
    }
  };

  return (
    <div className="page">
      <form className="registration-form" onSubmit={handleSubmit}>

        <h1>Create Account</h1>
        <p className="subtitle">Register your account</p>

        {/* NAME */}
        <div className="input-group">
          <label>Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              touched.name
                ? errors.name
                  ? "invalid"
                  : "valid"
                : ""
            }
          />

          {touched.name && errors.name && (
            <span className="error">
              {errors.name}
            </span>
          )}
        </div>

        {/* EMAIL */}
        <div className="input-group">
          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              touched.email
                ? errors.email
                  ? "invalid"
                  : "valid"
                : ""
            }
          />

          {touched.email && errors.email && (
            <span className="error">
              {errors.email}
            </span>
          )}
        </div>

        {/* PASSWORD */}
        <div className="input-group">
          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              touched.password
                ? errors.password
                  ? "invalid"
                  : "valid"
                : ""
            }
          />

          {touched.password && errors.password && (
            <span className="error">
              {errors.password}
            </span>
          )}
        </div>

        {/* PASSWORD REQUIREMENTS */}
        <div className="password-rules">

          <p>Password requirements</p>

          <div className={
            formData.password.length >= 8
              ? "rule success"
              : "rule"
          }>
            <span>
              {formData.password.length >= 8 ? "✓" : "○"}
            </span>
            At least 8 characters
          </div>

          <div className={
            /[A-Z]/.test(formData.password)
              ? "rule success"
              : "rule"
          }>
            <span>
              {/[A-Z]/.test(formData.password) ? "✓" : "○"}
            </span>
            One uppercase letter
          </div>

          <div className={
            /[a-z]/.test(formData.password)
              ? "rule success"
              : "rule"
          }>
            <span>
              {/[a-z]/.test(formData.password) ? "✓" : "○"}
            </span>
            One lowercase letter
          </div>

          <div className={
            /[0-9]/.test(formData.password)
              ? "rule success"
              : "rule"
          }>
            <span>
              {/[0-9]/.test(formData.password) ? "✓" : "○"}
            </span>
            One number
          </div>

          <div className={
            /[!@#$%^&*]/.test(formData.password)
              ? "rule success"
              : "rule"
          }>
            <span>
              {/[!@#$%^&*]/.test(formData.password) ? "✓" : "○"}
            </span>
            One special character
          </div>

        </div>

        {/* CONFIRM PASSWORD */}
        <div className="input-group">
          <label>Confirm Password</label>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              touched.confirmPassword
                ? errors.confirmPassword
                  ? "invalid"
                  : "valid"
                : ""
            }
          />

          {touched.confirmPassword &&
            errors.confirmPassword && (
              <span className="error">
                {errors.confirmPassword}
              </span>
            )}
        </div>

        <button type="submit" disabled={!isFormValid}>
          Create Account
        </button>

      </form>
    </div>
  );
}

export default FormValidation;