import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import "./Registration.css";

function Registration() {
  const initialState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    contactNumber: "",
    profilePicture: "",
  };
  const [user, setUser] = useState(initialState);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setError(data.error);
        } else {
          console.log(data.message);
          setMessage(data.message);
          setUser(initialState);
          navigate("/signin");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("An error occurred during registration.");
      });
  };

  return (
    <form className="registration-form" onSubmit={handleRegister}>
      <h1>Sign Up</h1>

      <div className="form-input">
        <Input
          name="firstName"
          value={user.firstName}
          onChange={handleUser} // Ensure onChange is correctly passed
          placeholder="First Name"
        />
        <Input
          name="lastName"
          value={user.lastName}
          onChange={handleUser} // Ensure onChange is correctly passed
          placeholder="Last Name"
        />
        <Input
          name="username"
          value={user.username}
          onChange={handleUser} // Ensure onChange is correctly passed
          placeholder="Username"
        />
        <Input
          name="email"
          value={user.email}
          onChange={handleUser} // Ensure onChange is correctly passed
          placeholder="Email"
        />
        <Input
          name="password"
          value={user.password}
          onChange={handleUser} // Ensure onChange is correctly passed
          placeholder="Password"
        />
        <Input
          type="tel"
          name="contactNumber"
          value={user.contactNumber}
          onChange={handleUser} // Ensure onChange is correctly passed
          placeholder="Contact Number"
        />
        <Input
          name="profilePicture"
          value={user.profilePicture}
          onChange={handleUser} // Ensure onChange is correctly passed
          placeholder="Profile Picture URL"
          className="form-input profile-picture-input"
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="submit-button">
        Register
      </button>
      {message && <p> {message}</p>}

      <p style={{ color: "#fff" }}>
        Already have an account?{" "}
        <Link to="/signin" style={{ color: "#03e9f4" }}>
          Login
        </Link>{" "}
        here
      </p>
    </form>
  );
}

export default Registration;
