import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
import { animateScroll as ScrollToTop } from "react-scroll";
import "../assets/styles/SideBar.css";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store/actionCreators";
import { AUTHENTICATED, NOT_AUTHENTICATED } from "../store/actions";
import history from "../history";

function SideBar({ isOpen, toggle }) {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.status);

  const [location, setLocation] = useState(history.location.pathname);

  let recentUser = useSelector((state) => state.user);
  if (recentUser === null || recentUser === undefined) {
    recentUser = {};
  }
  const { _id, role } = recentUser;

  const handleLogOut = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    return history.listen((location) => {
      setLocation(location.pathname);
    });
  }, [location]);

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
        {location === "/" && (
          <ul className="sideBar__container--menu">
            <li
              className="sideBar__container--link"
              onClick={() => ScrollToTop.scrollToTop()}
            >
              ABOUT
            </li>
            <li>
              <LinkScroll
                onClick={toggle}
                smooth={true}
                duration={1000}
                className="sideBar__container--link"
                to="info"
              >
                INFO
              </LinkScroll>
            </li>
            <li>
              <LinkScroll
                onClick={toggle}
                smooth={true}
                duration={1000}
                className="sideBar__container--link"
                to="helpUs"
              >
                HELP US
              </LinkScroll>
            </li>
          </ul>
        )}

        <div className="sideBar__container--btnWrap">
          {status === AUTHENTICATED && (
            <Link className="sideBar__container--route" to={`/${_id}/profile`}>
              PROFILE
            </Link>
          )}
        </div>
        <div className="sideBar__container--btnWrap">
          {status === AUTHENTICATED && role === "user" ? (
            <Link className="sideBar__container--route" to="/foundations">
              FOUNDATIONS
            </Link>
          ) : (
            status === AUTHENTICATED &&
            role === "foundation" && (
              <Link
                className="sideBar__container--route"
                to={`/foundations/${_id}/pets`}
              >
                PETS
              </Link>
            )
          )}
          {status === AUTHENTICATED && role === "admin" && (
            <Link className="sideBar__container--route" to="/admin/users">
              USERS
            </Link>
          )}
        </div>
        <div className="sideBar__container--btnWrap">
          {status === NOT_AUTHENTICATED ? (
            <Link className="sideBar__container--route" to="/donate">
              DONATE
            </Link>
          ) : (
            (status === AUTHENTICATED || role === "foundation") && (
              <Link
                className="sideBar__container--route"
                to="/"
                onClick={handleLogOut}
              >
                LOG OUT
              </Link>
            )
          )}
        </div>

        <div className="sideBar__container--btnWrap">
          {status === AUTHENTICATED && role === "admin" ? (
            <Link className="sideBar__container--route" to="/admin">
              FOUNDATIONS
            </Link>
          ) : status === NOT_AUTHENTICATED ? (
            <Link className="sideBar__container--route" to="/login">
              LOG IN
            </Link>
          ) : (
            status === AUTHENTICATED &&
            role === "user" && (
              <Link className="sideBar__container--route" to="/donate">
                DONATE
              </Link>
            )
          )}
        </div>
        <div className="sideBar__container--btnWrap">
          {status === NOT_AUTHENTICATED && (
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
