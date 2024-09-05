import React, { useState } from "react";
import Map from "../Map/Map";
import "./Contact.css";
import Form from "./Form";
import Location from "./Location";
import Modals from "./Modals";

function Contact() {
  const initialUser = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };
  const [user, setUser] = useState(initialUser);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(false);
  const [warning, setWarning] = useState(false);
  const [output, setOutput] = useState("");

  const handleClose = () => {
    setOpen(false);
    setWarning(false);
  };

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    setWarning(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      user.name === "" ||
      user.email === "" ||
      user.phone === "" ||
      user.subject === "" ||
      user.message === ""
    ) {
      setResult(true);
      setWarning(true);
    } else {
      fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setOutput(data.message);
          setResult(true);
          setWarning(false);
          setOpen(true);
          setUser(initialUser);
        })
        .catch((err) => {
          setOutput(err);
          console.error(err);
        });
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "40px" }}>Get in Touch</h1>
      <div className="contact-me-container-summary">
        <div className="contact-me-container">
          <Location />
          {/* Contact Form */}
          <div className="contact-form">
            <Form
              handleSubmit={handleSubmit}
              user={user}
              handleUser={handleUser}
              warning={warning}
            />

            {/* Modal */}
            {open && (
              <Modals
                handleClose={handleClose}
                result={result}
                output={output}
              />
            )}
          </div>
        </div>
        <Map />
      </div>
    </>
  );
}

export default Contact;
