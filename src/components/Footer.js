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
import { useState } from "react";
import history from "../history";
import { useEffect } from "react";

const Footer = () => {
  const status = useSelector((state) => state.status);
  let recentUser = useSelector((state) => state.user);
  if (recentUser === null || recentUser === undefined) {
    recentUser = {};
  }
  const { role, _id } = recentUser;

  const [location, setLocation] = useState(history.location.pathname);

  useEffect(() => {
    return history.listen((location) => {
      setLocation(location.pathname);
    });
  }, [location]);

  return (
    <footer className="footer" data-testid="footer">
      <div className="footer__wrapper">
        <div className="footer__wrapper--social-links">
          <ul>
            <li className="footer__wrapper--social-items">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                data-testid="facebook"
              >
                <FaFacebook />
              </a>
            </li>
            <li className="footer__wrapper--social-items">
              <a
                href="https://www.twitter.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="twitter"
                data-testid="twitter"
              >
                <FaTwitterSquare />
              </a>
            </li>
            <li className="footer__wrapper--social-items">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="instagram"
                data-testid="instagram"
              >
                <FaInstagram />
              </a>
            </li>
            <li className="footer__wrapper--social-items">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                data-testid="linkedin"
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
                  <Link className="footer__wrapper--navLinks" to="/foundations">
                    FOUNDATIONS
                  </Link>
                ) : (
                  role === "foundation" && (
                    <Link
                      className="navBar__container--navLinks2"
                      to={`/foundations/${_id}/pets`}
                    >
                      PETS
                    </Link>
                  )
                )
              ) : (
                status === NOT_AUTHENTICATED &&
                location === "/" && (
                  <div
                    className="footer__wrapper--navLinks"
                    onClick={() => ScrollToTop.scrollToTop()}
                  >
                    ABOUT
                  </div>
                )
              )}
              {status === AUTHENTICATED && role === "admin" && (
                <Link className="footer__wrapper--navLinks" to="/">
                  HOME
                </Link>
              )}
            </li>
            <li className="footer__wrapper--quick-items">
              {status === NOT_AUTHENTICATED && location === "/" ? (
                <LinkScroll
                  className="footer__wrapper--navLinks"
                  to="info"
                  smooth={true}
                  duration={1000}
                >
                  INFO
                </LinkScroll>
              ) : (
                status === NOT_AUTHENTICATED &&
                location !== "/" && (
                  <Link className="footer__wrapper--navLinks" to="/">
                    HOME
                  </Link>
                )
              )}
            </li>
            <li className="footer__wrapper--quick-items">
              {status === AUTHENTICATED ? (
                <Link
                  className="footer__wrapper--navLinks"
                  to={`/${_id}/profile`}
                >
                  PROFILE
                </Link>
              ) : (
                status === NOT_AUTHENTICATED &&
                location === "/" && (
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
