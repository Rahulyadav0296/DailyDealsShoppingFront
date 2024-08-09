import React from "react";
import AboutPage from "./AboutPage";
import CustomerPolicy from "./CustomerPolicy";
import HelpPage from "./HelpPage";
import Subscribe from "./Subscribe";

function FooterPageOne() {
  return (
    <div className="row">
      <AboutPage />
      <HelpPage />
      <CustomerPolicy />
      <Subscribe />
    </div>
  );
}

export default FooterPageOne;
