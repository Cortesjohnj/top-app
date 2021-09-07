import { FaBars } from 'react-icons/fa';
import { MdPets } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';
import { animateScroll as ScrollToTop } from 'react-scroll';
import ProfilePic from '../assets/images/John.jpg';
import '../assets/styles/Navbar.css';

function Navbar({ toggle }) {
  //Establish the logic of user id with backend
  let isUser = false;

  return (
    <>
      <nav className="navBar">
        <div className="navBar__container">
          <Link className="navBar__container--logo" to="/">
            <MdPets className="navBar__container--pet" />
            ADOGTA
          </Link>
          {isUser ? (
            //Connect with backend//
            <Link
              className="navBar__container--profilePicWrapper1"
              to="/id/profile"
            >
              <img
                className="navBar__container--profilePic1"
                src={ProfilePic}
                /*{user.profilepic} import profile pic from backend*/ alt="profilePic"
              />
            </Link>
          ) : (
            <div className="navBar__container--mobileIcon">
              <FaBars onClick={toggle} />
            </div>
          )}
          <ul
            className={
              isUser
                ? 'navBar__container--navMenu--hide'
                : 'navBar__container--navMenu'
            }
          >
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
                isUser
                  ? 'navBar__container--navMenu2--hide'
                  : 'navBar__container--navItem2'
              }
            >
              <Link className="navBar__container--navLinks2" to="login">
                LOG IN
              </Link>
            </li>
            <li
              className={
                isUser
                  ? 'navBar__container--navItem2'
                  : 'navBar__container--navMenu2--hide'
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
                isUser
                  ? 'navBar__container--navItem2'
                  : 'navBar__container--navMenu2--hide'
              }
            >
              <Link className="navBar__container--navLinks2" to="/">
                LOG OUT
              </Link>
            </li>
          </ul>

          <nav className="navBar__container--nav">
            {isUser ? (
              //Connect with backend//
              <Link
                className="navBar__container--profilePicWrapper"
                to="/id:/profile"
              >
                <img
                  className="navBar__container--profilePic"
                  src={ProfilePic}
                  /*{user.profilepic} import profile pic from backend*/ alt="profilePic"
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
