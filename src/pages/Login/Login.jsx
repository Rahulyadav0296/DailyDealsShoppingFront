import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import usePostRequest from "../../components/Hooks/usePostRequest.jsx";
import { setToken, setUserId } from "../../utils/authSlice.js";
import "./Login.css"; // Import the CSS
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postRequest, message, loading } = usePostRequest();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await postRequest(
        "https://dailydealsbackend-26.onrender.com/signin",
        {
          email,
          password,
        }
      );

      if (data.token) {
        dispatch(setToken(data.token));
      }

      if (data.user && data.user._id) {
        dispatch(setUserId(data.user._id));
      }

      navigate("/");
    } catch (error) {
      console.error("Error during login: ", error);
    }
  };

  return (
    <>
      <div className="login-box">
        <h2>Please sign in</h2>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Enter Your Email...</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Enter Your Password...</label>
          </div>
          <button type="submit" disabled={loading}>
            {" "}
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <p style={{ color: "#fff" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#03e9f4" }}>
              Sign Up
            </Link>{" "}
            here
          </p>
        </form>
        {message && (
          <p style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
            {message}
          </p>
        )}
      </div>
    </>
  );
}

export default Login;
