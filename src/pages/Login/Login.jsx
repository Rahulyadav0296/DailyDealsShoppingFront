import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToken, setUserId } from "../../utils/authSlice.js";
import "./Login.css"; // Import the CSS
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (!userId) {
          setMessage("User Does Not Exists!");
        } else {
          setMessage("Email or password is wrong!");
        }

        throw new Error(
          `Network response was not ok: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Token set after login: ", data.user._id);
      dispatch(setToken(data.token)); // ensuring the data has been set
      dispatch(setUserId(data.user._id));
      // navigate("/");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.message);
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
          <button onClick={handleSubmit}>Sign in</button>
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
