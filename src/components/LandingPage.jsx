import React from "react";
import landingPage from "../assets/landingPg.png";

export default function LandingPage() {
  const divStyle = {
    backgroundImage: `url(${landingPage})`,
    height: "100vh",
    width:"100vw",
    marginTop: "5px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition:"center",
    backgroundAttachment:"relative",
  };

  return <div style={divStyle}></div>;
}
