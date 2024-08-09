import React from "react";
import { Link } from "react-router-dom";

function FooterPageTwo() {
  return (
    <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
      <p>&copy; 2024 Company, Inc. All rights reserved.</p>
      <ul className="list-unstyled d-flex">
        <li className="ms-3">
          <Link
            target="_blank"
            className="link-body-emphasis"
            to="https://x.com/RahulYa93729679"
          >
            <i className="fa-brands fa-x-twitter"></i>
          </Link>
        </li>
        <li className="ms-3">
          <Link
            target="_blank"
            className="link-body-emphasis"
            to="https://www.instagram.com/rahulyadav0296/"
          >
            <i className="fa-brands fa-instagram"></i>
          </Link>
        </li>
        <li className="ms-3">
          <Link
            target="_blank"
            className="link-body-emphasis"
            to="https://www.facebook.com/profile.php?id=100008159375289"
          >
            <i className="fa-brands fa-facebook"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default FooterPageTwo;
