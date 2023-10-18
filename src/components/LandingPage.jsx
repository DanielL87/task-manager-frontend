import React from "react";
import landingPage from "../assets/landingPg.png";

export default function LandingPage() {
  const divStyle = {
    backgroundImage: `url(${landingPage})`,
    height: "calc(100vh-100px)",
    width:"100vw",
    marginTop: "5px",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition:"center",
    backgroundAttachment:"relative",
  };

  return <div style={divStyle}></div>;
}
