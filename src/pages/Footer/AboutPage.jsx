import React from "react";
import { Link } from "react-router-dom";
function AboutPage() {
  return (
    <div className="col-6 col-md-2 mb-3">
      <h5>About</h5>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/" className="nav-link p-0 text-body-secondary">
            Home
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/contact" className="nav-link p-0 text-body-secondary">
            Contact Us
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/products" className="nav-link p-0 text-body-secondary">
            Pricing
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/blog" className="nav-link p-0 text-body-secondary">
            Blog
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/" className="nav-link p-0 text-body-secondary">
            Careers
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AboutPage;
