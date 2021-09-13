import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { Link } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
import { animateScroll as ScrollToTop } from "react-scroll";
import "../assets/styles/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { ISUSER } from "../store/actions";

function Navbar({ toggle }) {
  const dispatch = useDispatch();

  const activeUser = useSelector((state) => state.isUser);

  const recentUser = useSelector((state) => state.user);

  if (localStorage.getItem("Authorization")) {
    dispatch({ type: ISUSER, payload: true });
    console.log(dispatch);
  }

  const { photoUrl, name, _id } = recentUser;

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
    dispatch({ type: ISUSER, payload: false });
    localStorage.removeItem("Authorization");
  };

  return (
    <>
      <nav className="navBar">
        <div className="navBar__container">
          <Link className="navBar__container--logo" to="/">
            <MdPets className="navBar__container--pet" />
            ADOGTA
          </Link>

          {activeUser ? (
            <Link
              className="navBar__container--profilePicWrapper1"
              to={isMobile ? "" : `/${_id}/${name}`}
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
                activeUser
                  ? "navBar__container--navMenu2--hide"
                  : "navBar__container--navItem2"
              }
            >
              <Link className="navBar__container--navLinks2" to="login">
                LOG IN
              </Link>
            </li>
            <li
              className={
                activeUser
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
                activeUser
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
            {activeUser ? (
              <Link
                className="navBar__container--profilePicWrapper"
                to={`/${_id}/${name}`}
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
