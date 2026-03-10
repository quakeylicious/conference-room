// src/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // replace with real API call
    setLoading(false);
    navigate("/dashboard");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    setter(e.target.value);
  };

  return (
    <div className="lp-page">
      <div className="lp-glow lp-glow--1" />
      <div className="lp-glow lp-glow--2" />

      <div className="lp-card">
       
        <div className="lp-logo">
          <img className="logoContainer" src="./public/images/bigben.svg"></img>
          <span className="lp-logo-text">Conference Room</span>
        </div>

        <h1 className="lp-heading">Welcome back</h1>
        <p className="lp-subheading">Sign in to your account</p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="lp-field">
            <label className="lp-label">Email</label>
            <input
              type="text"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
              className={`lp-input ${errors.email ? "lp-input--error" : ""}`}
            />
            {errors.email && <p className="lp-error-msg">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="lp-field">
            <label className="lp-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
              className={`lp-input ${errors.password ? "lp-input--error" : ""}`}
            />
            {errors.password && <p className="lp-error-msg">{errors.password}</p>}
          </div>

          {/* Forgot */}
          <div className="lp-forgot">
            <a className="lp-forgot-link">Forgot password?</a>
          </div>

          <button type="submit" className="lp-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}