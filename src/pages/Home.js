import React, { useState } from "react";
import AboutSection from "../components/AboutSection";
import Info from "../components/Info";
import HelpUsSection from "../components/HelpUs";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import Whastapp from "../components/Whastapp";

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <SideBar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <AboutSection />
      <Info />
      <HelpUsSection />
      <Footer />
      <Whastapp />
    </>
  );
}

export default Home;
