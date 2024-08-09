import React from "react";
import { Link } from "react-router-dom";
function HelpPage() {
  return (
    <div className="col-6 col-md-2 mb-3">
      <h5>Help</h5>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="#" className="nav-link p-0 text-body-secondary">
            Payments
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="#" className="nav-link p-0 text-body-secondary">
            Shipping
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="#" className="nav-link p-0 text-body-secondary">
            Cancellation & Returns
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="#" className="nav-link p-0 text-body-secondary">
            FAQs
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="#" className="nav-link p-0 text-body-secondary">
            Report Infringement
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default HelpPage;
