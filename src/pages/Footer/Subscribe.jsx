import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Subscribe() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleEmail = () => {
    setEmail("");
    navigate("/");
  };
  return (
    <div className="col-md-5 offset-md-1 mb-3">
      <form>
        <h5>Subscribe to our newsletter</h5>
        <p>Subscribe newsletter to get 5% on all products.</p>
        <div className="d-flex flex-column flex-sm-row w-100 gap-2">
          <label htmlFor="newsletter1" className="visually-hidden">
            Email address
          </label>
          <input
            id="newsletter1"
            type="text"
            className="form-control"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button
            className="btn btn-primary"
            type="button"
            style={{
              color: "white",
              backgroundColor: "red",
              border: "none",
            }}
            onClick={handleEmail}
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
}

export default Subscribe;
