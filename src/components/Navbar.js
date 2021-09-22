import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { Link } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
import { animateScroll as ScrollToTop } from "react-scroll";
import "../assets/styles/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store/actionCreators";
import { AUTHENTICATED, NOT_AUTHENTICATED } from "../store/actions";

function Navbar({ toggle }) {
  const dispatch = useDispatch();

  let recentUser = useSelector((state) => state.user);
  if (recentUser === null || recentUser === undefined) {
    recentUser = {};
  }

  const status = useSelector((state) => state.status);

  const { photoUrl, name, _id, role } = recentUser;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth < 768;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile]);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <>
      <nav className="navBar">
        <div className="navBar__container">
          <Link className="navBar__container--logo" to="/">
            <MdPets className="navBar__container--pet" />
            ADOGTA
          </Link>

          {status === AUTHENTICATED ? (
            <Link
              className="navBar__container--profilePicWrapper1"
              to={isMobile ? "" : `/${_id}/profile`}
            >
              <img
                onClick={toggle}
                className="navBar__container--profilePic1"
                src={photoUrl}
                alt={name}
              />
            </Link>
          ) : (
            <div className="navBar__container--mobileIcon">
              <FaBars onClick={toggle} />
            </div>
          )}
          <ul className="navBar__container--navMenu">
            <li
              className="navBar__container--navItem"
              onClick={() => ScrollToTop.scrollToTop()}
            >
              <div className="navBar__container--navLinks">ABOUT</div>
            </li>
            <li className="navBar__container--navItem">
              <LinkScroll
                className="navBar__container--navLinks"
                to="info"
                smooth={true}
                duration={1000}
              >
                INFO
              </LinkScroll>
            </li>
            <li className="navBar__container--navItem">
              <LinkScroll
                className="navBar__container--navLinks"
                to="helpUs"
                smooth={true}
                duration={1000}
              >
                HELP US
              </LinkScroll>
            </li>
          </ul>

          <ul className="navBar__container--navMenu2">
            <li
              className={
                status === AUTHENTICATED
                  ? "navBar__container--navMenu2--hide"
                  : "navBar__container--navItem2"
              }
            >
              <Link className="navBar__container--navLinks2" to="login">
                LOG IN
              </Link>
            </li>{" "}
            <li
              className={
                status === AUTHENTICATED && role === "foundation"
                  ? "navBar__container--navItem2"
                  : "navBar__container--navMenu2--hide"
              }
            >
              <Link
                className="navBar__container--navLinks2"
                to={`/foundations/${_id}/pets`}
              >
                PETS
              </Link>
            </li>
            <li
              className={
                status === AUTHENTICATED && role === "user"
                  ? "navBar__container--navItem2"
                  : "navBar__container--navMenu2--hide"
              }
            >
              <Link className="navBar__container--navLinks2" to="/foundations">
                FOUNDATIONS
              </Link>
            </li>
            <li
              className={
                status === NOT_AUTHENTICATED || role === "user"
                  ? "navBar__container--navItem2"
                  : "navBar__container--navMenu2--hide"
              }
            >
              <Link
                className="navBar__container--navLinks2 navBar__container--donate"
                to="donate"
              >
                DONATE
              </Link>
            </li>
            <li
              className={
                status === AUTHENTICATED
                  ? "navBar__container--navItem2"
                  : "navBar__container--navMenu2--hide"
              }
            >
              <Link
                className="navBar__container--navLinks2"
                to="/"
                onClick={handleLogOut}
              >
                LOG OUT
              </Link>
            </li>
          </ul>

          <nav className="navBar__container--nav">
            {status === AUTHENTICATED ? (
              <Link
                className="navBar__container--profilePicWrapper"
                to={`/${_id}/profile`}
              >
                <img
                  className="navBar__container--profilePic"
                  src={photoUrl}
                  alt={name}
                />
              </Link>
            ) : (
              <Link className="navBar__container--navBtnLink" to="/signup">
                SIGN UP
              </Link>
            )}
          </nav>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
