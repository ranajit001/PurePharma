import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await fetch(
        "https://online-pharmacy-jwkq.onrender.com/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.userName);
      setUserName(data.userName);
      setSuccessMessage("Login Successful!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset password.");
      return;
    }
  
    try {
      const response = await fetch(
        "https://online-pharmacy-jwkq.onrender.com/api/users/forget_password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to reset password");
  
      setSuccessMessage("Password reset email sent. Check your inbox.");
    } catch (err) {
      setError(err.message);
    }
  };
  

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <form action="#" className="sign-in-form" onSubmit={handleLogin}>
      <h2 className="title">Sign in</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success" style={{ color: "green", fontWeight: "bold" }}>{successMessage}</p>}
      {userName && <p className="user-name">Welcome, {userName}!</p>}

      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <input type="submit" value="Login" className="btn solid" />
      <button type="button" className="btn forgot-password" onClick={handleForgotPassword}>
        Forgot Password?
      </button>
    </form>
  );
};

export default Login;