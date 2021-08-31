import React, { useState } from 'react';
import AboutSection from '../components/AboutSection';
import Info from '../components/Info';
import JoinUsSection from '../components/JoinUs';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';

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
      <JoinUsSection />
    </>
  );
}

export default Home;
