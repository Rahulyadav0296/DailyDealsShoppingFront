import React from "react";

function Form({ handleSubmit, user, handleUser, warning }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Your Name"
        onChange={handleUser}
        className="form-input"
      />
      <input
        type="email"
        name="email"
        value={user.email}
        placeholder="Your Email"
        onChange={handleUser}
        className="form-input"
      />
      <input
        type="text"
        name="phone"
        value={user.phone}
        placeholder="Your Phone"
        onChange={handleUser}
        className="form-input"
      />
      <input
        type="text"
        name="subject"
        value={user.subject}
        placeholder="Your Subject"
        onChange={handleUser}
        className="form-input"
      />
      <textarea
        name="message"
        rows="4"
        placeholder="Start Writing Message Here!"
        value={user.message}
        onChange={handleUser}
        className="form-input"
      />
      {warning && (
        <div className="error-message">Please fill out all fields</div>
      )}
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
}

export default Form;
