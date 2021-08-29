import React from 'react';
import { Link } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';
import '../assets/styles/SideBar.css';
import { FaTimes } from 'react-icons/fa';

function SideBar({ isOpen, toggle }) {
  return (
    <aside
      className={`sideBar__container 
      ${isOpen ? 'sideBar__container--show' : 'sideBar__container--hide'}`}
      onClick={toggle}
    >
      <div className="sideBar__container--icon" onClick={toggle}>
        <div className="sideBar__container--closeIcon">
          <FaTimes />
        </div>
      </div>
      <div className="sideBar__container--wrapper">
        <ul className="sideBar__container--menu">
          <LinkScroll className="sideBar__container--link" to="about">
            ABOUT
          </LinkScroll>
          <LinkScroll className="sideBar__container--link" to="services">
            SERVICES
          </LinkScroll>
          <LinkScroll className="sideBar__container--link" to="signUp">
            SIGN UP
          </LinkScroll>
        </ul>
        <div className="sideBar__container--btnWrap">
          <Link className="sideBar__container--route" to="/signIn">
            SIGN IN
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
