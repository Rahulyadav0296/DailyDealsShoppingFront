import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import usePostRequest from "../../components/Hooks/usePostRequest";
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
    role: "user",
  };
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();
  const { postRequest, message, loading } = usePostRequest();
  const token = useSelector((state) => state.auth.token);

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await postRequest(
        "https://dailydealsbackend-18.onrender.com/signup",
        user,
        token
      );
      console.log("Data after registration is: ", data);
      setUser(initialState);
      navigate("/signin");
    } catch (error) {
      console.error("Error during Registration: ", error);
    }
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
        <select name="role" onChange={handleUser} className="form-input-select">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
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
