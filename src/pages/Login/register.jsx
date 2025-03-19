/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./register.css"; // Include the CSS file for the form styling

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePasswordStrength = (password) =>
    password.length < 6 ? "weak" : password.length < 10 ? "medium" : "strong";

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordStrength(validatePasswordStrength(e.target.value));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (!username.includes("@")) errors.username = "Username must contain '@'";
    if (!validateEmail(email)) errors.email = "Invalid email format";
    if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";

    setErrors(errors);
    if (Object.keys(errors).length === 0) console.log("Form Submitted");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <div className="signup-container">
        <div className="wrapper">
          <form onSubmit={handleFormSubmit}>
            <h1>Sign Up</h1>

            <div className="input-box">
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder=" " />
              <label htmlFor="username">Username</label>
              <FaUserAlt className="icon" />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>

            <div className="input-box">
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder=" " />
              <label htmlFor="email">Email</label>
              <FaEnvelope className="icon" />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="input-box">
              <input type="password" id="password" value={password} onChange={handlePasswordChange} required placeholder=" " />
              <label htmlFor="password">Password</label>
              <FaLock className="icon" />
            </div>

            {password && <div className={`password-strength ${passwordStrength}`}><span></span></div>}
            {password && <p className="strength-text">Password Strength: {passwordStrength}</p>}

            <div className="input-box">
              <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder=" " />
              <label htmlFor="confirm-password">Confirm Password</label>
              <FaLock className="icon" />
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>

            <button type="submit">Sign Up</button>
            <div className="login-link">
              <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
