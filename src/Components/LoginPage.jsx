import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setShowMessage(true);
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-title">Clicksoft Login</h1>

        <form className="form-container">
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="button" onClick={handleLogin} className="login-button">
            Login
          </button>
          <p className="note-login">*Please Register Your Details First</p>
        </form>

        {showMessage && (
          <div className="message-container">
            <p>Please Register Your Details</p>
            <button onClick={handleRegister} className="register-button">
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
