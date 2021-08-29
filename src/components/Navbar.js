import React from 'react';
import { FaBars } from 'react-icons/fa';
import { MdPets } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';
import '../assets/styles/Navbar.css';

function Navbar({ toggle }) {
  return (
    <>
      <nav className="navBar">
        <div className="navBar__container">
          <Link className="navBar__container--logo" to="/">
            <MdPets className="navBar__container--pet" />
            ADOGTA
          </Link>
          <div className="navBar__container--mobileIcon">
            <FaBars onClick={toggle} />
          </div>
          <ul className="navBar__container--navMenu">
            <li className="navBar__container--navItem">
              <LinkScroll className="navBar__container--navLinks" to="about">
                ABOUT
              </LinkScroll>
            </li>
            <li className="navBar__container--navItem">
              <LinkScroll className="navBar__container--navLinks" to="services">
                SERVICES
              </LinkScroll>
            </li>
            <li className="navBar__container--navItem">
              <LinkScroll className="navBar__container--navLinks" to="signUp">
                SIGN UP
              </LinkScroll>
            </li>
          </ul>
          <nav className="navBar__container--nav">
            <Link className="navBar__container--navBtnLink" to="/signIn">
              SIGN IN
            </Link>
          </nav>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
