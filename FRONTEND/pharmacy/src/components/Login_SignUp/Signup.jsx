import React, { useState } from "react";
import "../../assets/css/style.css";

const Signup = ({ toggleToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isStrongPassword = (password) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some((field) => field.trim() === "")) {
      setError("Please fill in all fields.");
      return;
    }
    if (!isStrongPassword(formData.password)) {
      setError(
        "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character."
      );
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://online-pharmacy-jwkq.onrender.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to sign up");
      alert("Sign up successful!");
      toggleToLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="sign-up-form" onSubmit={handleSignup}>
      <h2 className="title">Sign up</h2>
      {error && (
        <p className="error" style={{ color: "red" }}>
          {error}
        </p>
      )}
      {["name", "firstName", "lastName", "mobile", "email", "password"].map(
        (field) => (
          <div className="input-field" key={field}>
            <i
              className={`fas ${
                field === "password"
                  ? "fa-lock"
                  : field === "email"
                  ? "fa-envelope"
                  : "fa-user"
              }`}
            ></i>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
            />
          </div>
        )
      )}
      <input
        type="submit"
        className="btn"
        value={loading ? "Signing up..." : "Sign up"}
        disabled={loading}
      />
      <div>
        {["google", "facebook-f", "twitter", "linkedin-in"].map((platform) => (
          <button
            key={platform}
            type="button"
            className="btn"
            style={{ width: "50px", margin: "5px" }}
          >
            <i className={`fab fa-${platform}`}></i>
          </button>
        ))}
      </div>
    </form>
  );
};

export default Signup;
