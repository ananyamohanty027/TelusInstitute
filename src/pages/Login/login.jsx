/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./login.css";

export const Login = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [username, setUsername] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setStrength(value.length < 6 ? "weak" : value.length < 10 ? "medium" : "strong");
  };

  const validateUsername = (e) => setUsername(e.target.value);

  const handleBlurUsername = () => setShowAlert(!username.includes("@") && username);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(!username.includes("@"));
    if (username.includes("@")) console.log("Logging in with", { username, password });
  };

  useEffect(() => {
    const handleClickOutside = () => setStrength("");
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>Login</motion.h1>

          <motion.div className="input-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <input type="text" id="username" required placeholder=" " value={username} onChange={validateUsername} onBlur={handleBlurUsername} />
            <label htmlFor="username">Username</label>
            <FaUserAlt className="icon" />
            {showAlert && <p className="alert">Username must contain @</p>}
          </motion.div>

          <motion.div className="input-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <input type="password" id="password" required placeholder=" " value={password} onChange={handlePasswordChange} />
            <label htmlFor="password">Password</label>
            <FaLock className="icon" />
            {password && <div className={`password-strength ${strength}`}><span></span></div>}
            {password && <p className="strength-text">{strength === "weak" ? "Weak password" : strength === "medium" ? "Medium password" : "Strong password"}</p>}
          </motion.div>

          <motion.div className="remember-forgot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <label><input type="checkbox" /> Remember me</label>
            <br />
            <Link to="/forgot-password" className="forgot">Forgot password?</Link>
          </motion.div>

          <motion.button type="submit" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Login</motion.button>

          <motion.div className="register-link" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
