import React from "react";
import "../assets/styles/Footer.css";
import {
  FaFacebook,
  FaTwitterSquare,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
import { animateScroll as ScrollToTop } from "react-scroll";
import { useSelector } from "react-redux";
import { AUTHENTICATED, NOT_AUTHENTICATED } from "../store/actions";

const Footer = () => {
  const status = useSelector((state) => state.status);
  let recentUser = useSelector((state) => state.user);
  if (recentUser === null || recentUser === undefined) {
    recentUser = {};
  }
  const { role, _id } = recentUser;

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
            <li className="footer__wrapper--quick-items">
              {status === AUTHENTICATED ? (
                role === "user" ? (
                  <Link className="footer__wrapper--navLinks" to="foundations">
                    FOUNDATIONS
                  </Link>
                ) : (
                  <Link
                    className="navBar__container--navLinks2"
                    to={`/foundations/${_id}/pets`}
                  >
                    PETS
                  </Link>
                )
              ) : (
                <div
                  className="footer__wrapper--navLinks"
                  onClick={() => ScrollToTop.scrollToTop()}
                >
                  ABOUT
                </div>
              )}
            </li>
            <li className="footer__wrapper--quick-items">
              {status === AUTHENTICATED ? null : (
                <LinkScroll
                  className="footer__wrapper--navLinks"
                  to="info"
                  smooth={true}
                  duration={1000}
                >
                  INFO
                </LinkScroll>
              )}
            </li>
            <li className="footer__wrapper--quick-items">
              {status === AUTHENTICATED ? (
                role === "user" ? (
                  <Link className="footer__wrapper--navLinks" to="donate">
                    DONATE
                  </Link>
                ) : (
                  <Link
                    className="footer__wrapper--navLinks"
                    to={`/${_id}/profile`}
                  >
                    PROFILE
                  </Link>
                )
              ) : (
                status === NOT_AUTHENTICATED && (
                  <LinkScroll
                    className="footer__wrapper--navLinks"
                    to="helpUs"
                    smooth={true}
                    duration={1000}
                  >
                    HELP US
                  </LinkScroll>
                )
              )}
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
