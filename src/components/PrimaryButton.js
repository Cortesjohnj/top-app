import React from "react";
import "../assets/styles/PrimaryButton.css";

function PrimaryButton({ children, color }) {
  return (
    <button type="submit" className={color}>
      {children}
    </button>
  );
}

export { PrimaryButton };
