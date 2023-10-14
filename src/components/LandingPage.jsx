import React from "react";
import landingPage from "../assets/landing-page.png";

export default function LandingPage() {
  const divStyle = {
    backgroundImage: `url(${landingPage})`,
    height: "100vh",
    marginTop: "5px",
    fontSize: "50px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return <div style={divStyle}></div>;
}
