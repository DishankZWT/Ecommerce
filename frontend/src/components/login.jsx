/* eslint-disable react/prop-types */
import { useState } from "react";
import "./login.css";
// import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const { key } = data;
        if (key) {
          onLoginSuccess(key);
          navigate("/");
        }
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred during login.");
    }
  };

  const sendMail = (/*e*/) => {
    // e.preventDefault();
    // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
    //   .then((result) => {
    //       window.location.reload()
    //   }, (error) => {
    //       console.log(error.text);
    //   });
    const inputOtp = prompt("check your email and enter otp");
    if (inputOtp) {
      alert("hello");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <a style={{ cursor: "pointer" }} onClick={sendMail}>
        Forgot Password
      </a>
    </div>
  );
}

export default Login;
