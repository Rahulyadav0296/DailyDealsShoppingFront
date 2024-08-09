import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import React from "react";

function Location() {
  return (
    <div className="contact-me-info">
      {/* Location */}
      <div className="contact-me-info-item">
        <div className="mb-6">
          <LocationOnIcon />
          <h2>Location</h2>
          <p>
            House Number 43, Vard Number 02, Sharda Nagar, Gadasarai, Dindori,
            Madhya Pradesh, 481882
          </p>
        </div>
      </div>

      {/* Phone */}
      <div className="contact-me-info-item">
        <div className="mb-6">
          <PhoneIcon />
          <h2>Phone</h2>
          <p>+91-7509722382</p>
        </div>
      </div>

      {/* Email */}
      <div className="contact-me-info-item">
        <div className="mb-6">
          <EmailIcon />
          <h2>Email</h2>
          <p>rahulyadav0296@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default Location;
