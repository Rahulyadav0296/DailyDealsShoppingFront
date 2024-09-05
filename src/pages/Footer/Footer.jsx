import React from "react";
import FooterPageOne from "./FooterPageOne";
import FooterPageTwo from "./FooterPageTwo";
function Footer() {
  return (
    <div className="container">
      <footer className="py-5">
        <FooterPageOne />
        <FooterPageTwo />
      </footer>
    </div>
  );
}

export default Footer;
