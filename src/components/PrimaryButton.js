import React from "react";
import "../assets/styles/PrimaryButton.css";

function PrimaryButton({ children, color, id }) {
  return (
    <button type="submit" className={color} id={id}>
      {children}
    </button>
  );
}

export { PrimaryButton };
