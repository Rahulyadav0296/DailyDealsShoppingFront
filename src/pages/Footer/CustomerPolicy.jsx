import React from "react";
import { Link } from "react-router-dom";

function CustomerPolicy() {
  return (
    <div className="col-6 col-md-2 mb-3">
      <h5>Cutomer Policy</h5>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="#" className="nav-link p-0 text-body-secondary">
            Cancellation & Returns
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="#" className="nav-link p-0 text-body-secondary">
            Terms of Use
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="#" className="nav-link p-0 text-body-secondary">
            Security
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="#" className="nav-link p-0 text-body-secondary">
            Privacy
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="#" className="nav-link p-0 text-body-secondary">
            Sitemap
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default CustomerPolicy;
