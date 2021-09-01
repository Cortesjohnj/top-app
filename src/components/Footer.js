import React from 'react';
import '../assets/styles/Footer.css';
import {
  FaFacebook,
  FaTwitterSquare,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';
import { Link as LinkScroll } from 'react-scroll';
import { animateScroll as ScrollToTop } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__wrapper--social-links">
          <ul>
            <li className="footer__wrapper--social-items">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebook />
              </a>
            </li>
            <li className="footer__wrapper--social-items">
              <a
                href="https://www.twitter.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitterSquare />
              </a>
            </li>
            <li className="footer__wrapper--social-items">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
            </li>
            <li className="footer__wrapper--social-items">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__wrapper--quick-links">
          <ul>
            <li
              className="footer__wrapper--quick-items"
              onClick={() => ScrollToTop.scrollToTop()}
            >
              <div className="footer__wrapper--navLinks">ABOUT</div>
            </li>
            <li className="footer__wrapper--quick-items">
              <LinkScroll
                className="footer__wrapper--navLinks"
                to="info"
                smooth={true}
                duration={1000}
              >
                INFO
              </LinkScroll>
            </li>
            <li className="footer__wrapper--quick-items">
              <LinkScroll
                className="footer__wrapper--navLinks"
                to="helpUs"
                smooth={true}
                duration={1000}
              >
                HELP US
              </LinkScroll>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__outer-footer">
        Copyright &copy; Top Group II All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
