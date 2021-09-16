import React from "react";
import { Link } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
import { animateScroll as ScrollToTop } from "react-scroll";
import "../assets/styles/SideBar.css";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store/actionCreators";
import { AUTHENTICATED } from "../store/actions";

function SideBar({ isOpen, toggle }) {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.status);

  let recentUser = useSelector((state) => state.user);
  if (recentUser === null || recentUser === undefined) {
    recentUser = {};
  }
  const { name, _id } = recentUser;

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <aside
      className={`sideBar__container 
      ${isOpen ? "sideBar__container--show" : "sideBar__container--hide"}`}
      onClick={toggle}
    >
      <div className="sideBar__container--icon" onClick={toggle}>
        <div className="sideBar__container--closeIcon">
          <FaTimes />
        </div>
      </div>
      <div className="sideBar__container--wrapper">
        <ul className="sideBar__container--menu">
          <li
            className="sideBar__container--link"
            onClick={() => ScrollToTop.scrollToTop()}
          >
            ABOUT
          </li>
          <LinkScroll
            onClick={toggle}
            smooth={true}
            duration={1000}
            className="sideBar__container--link"
            to="info"
          >
            INFO
          </LinkScroll>
          <LinkScroll
            onClick={toggle}
            smooth={true}
            duration={1000}
            className="sideBar__container--link"
            to="helpUs"
          >
            HELP US
          </LinkScroll>
        </ul>
        <div className="sideBar__container--btnWrap">
          {status === AUTHENTICATED && (
            <Link className="sideBar__container--route" to={`/${_id}/${name}`}>
              PROFILE
            </Link>
          )}
        </div>
        <div className="sideBar__container--btnWrap">
          {status === AUTHENTICATED && (
            <Link className="sideBar__container--route" to="/foundations">
              FOUNDATIONS
            </Link>
          )}
        </div>
        <div className="sideBar__container--btnWrap">
          {status === AUTHENTICATED ? (
            <Link className="sideBar__container--route" to="/donate">
              DONATE
            </Link>
          ) : (
            <Link className="sideBar__container--route" to="/login">
              LOG IN
            </Link>
          )}
        </div>
        <div className="sideBar__container--btnWrap">
          {status === AUTHENTICATED ? (
            <Link
              className="sideBar__container--route"
              to="/"
              onClick={handleLogOut}
            >
              LOG OUT
            </Link>
          ) : (
            <Link className="sideBar__container--route" to="/signup">
              SIGN UP
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
