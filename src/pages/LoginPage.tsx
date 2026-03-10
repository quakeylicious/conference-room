import { useState } from "react";
import "./LoginPage.css";

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>): void => {
    setter(e.target.value);
  };

  return (
    <div className="page">
      <div className="card">

        <div className="logoContainer">
        <img src = "/images/bbg_logo.webp" className="bigBenLogo"/>
        </div>

        <h1 className="heading">Welcome back</h1>
        <p className="subheading">Sign in to your account</p>

        {success && <p className="success-msg">✓ Login successful!</p>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <input
              type="text"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
              className={`input ${errors.email ? 'input--error' : ''}`}
            />
            {errors.email && <p className="error-msg">{errors.email}</p>}
          </div>

          <div className="field">
            <label className="label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
              className={`input ${errors.password ? 'input--error' : ''}`}
            />
            {errors.password && <p className="error-msg">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="btn"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}