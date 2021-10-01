import React from "react";
import "../assets/styles/Whatsapp.css";
import { IoLogoWhatsapp } from "react-icons/io5";

const Whastapp = () => {
  return (
    <a
      href="https://wa.me/+573204534334?text=I'm%20interested%20in%20adopting%20a%20pet%20or%20donating"
      rel="noreferrer"
      className="whatsappfloat"
      target="_blank"
      aria-label="whastapp"
    >
      {" "}
      <IoLogoWhatsapp className="whatsappfloat__IoLogoWhatsapp" />
    </a>
  );
};

export default Whastapp;
