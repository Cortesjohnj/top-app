import React from "react";
import AboutSection from "../components/AboutSection";
import Info from "../components/Info";
import HelpUsSection from "../components/HelpUs";
import Whastapp from "../components/Whastapp";

function Home() {
  return (
    <div data-testid="Home">
      <AboutSection />
      <Info />
      <HelpUsSection />
      <Whastapp />
    </div>
  );
}

export default Home;
