import React, { useEffect, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import hmsContext from "../context/hmsContext";
import { toast } from "react-toastify";
import logo from "../images/logo.png";
import "./style1.css";

export default function Navbar(props) {
  const context = useContext(hmsContext);
  const {
    navbarComponent1,
    navbarLink1,
    navbarComponent2,
    navbarLink2,
    navbarComponent3,
    navbarLink3,
    navbarComponent4,
    navbarLink4,
    changeNavbar,
    changeNavbar2,
    changeNavbar3,
    changeNavbar4,
  } = context;

  let location = useLocation();
  const history = useHistory();
  useEffect(() => {
    //console.log(location.pathname)
  }, [location]);

  const handleSignout = () => {
    localStorage.removeItem("token");
    history.push("/login");
    changeNavbar("", "");
    changeNavbar2("", "");
    changeNavbar3("", "");
    changeNavbar4("", "");
    toast.success("Signed Out Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <div>
        <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand HeadingColor" to="/">
              <h3>Rejuvenate Hospital</h3>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === `${navbarLink1}` ? "active" : ""
                    }`}
                    aria-current="page"
                    to={`${navbarLink1}`}
                  >
                    {navbarComponent1}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === `${navbarLink2}` ? "active" : ""
                    }`}
                    aria-current="page"
                    to={`${navbarLink2}`}
                  >
                    {navbarComponent2}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === `${navbarLink3}` ? "active" : ""
                    }`}
                    aria-current="page"
                    to={`${navbarLink3}`}
                  >
                    {navbarComponent3}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === `${navbarLink4}` ? "active" : ""
                    }`}
                    aria-current="page"
                    to={`${navbarLink4}`}
                  >
                    {navbarComponent4}
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto" style={{ marginRight: 50 }}>
                <li className="nav-item">
                  <HashLink
                    smooth
                    className={`nav-link ${
                      location.pathname === "#" ? "active" : ""
                    } `}
                    to="#services"
                  >
                    Services
                  </HashLink>
                </li>
                <li className="nav-item">
                  <HashLink
                    smooth
                    className={`nav-link ${
                      location.pathname === "#" ? "active" : ""
                    } `}
                    to="#Departments"
                  >
                    Departments
                  </HashLink>
                </li>
                <li className="nav-item">
                  <HashLink
                    smooth
                    className={`nav-link ${
                      location.pathname === "#" ? "active" : ""
                    } `}
                    to="#Team"
                  >
                    Team
                  </HashLink>
                </li>
                <li className="nav-item">
                  <HashLink
                    smooth
                    className={`nav-link ${
                      location.pathname === "#" ? "active" : ""
                    } `}
                    to="#FAQ"
                  >
                    FAQ
                  </HashLink>
                </li>
                <li className="nav-item">
                  <HashLink
                    smooth
                    className={`nav-link ${
                      location.pathname === "#" ? "active" : ""
                    } `}
                    to="#Gallary"
                  >
                    Gallary
                  </HashLink>
                </li>
                <li className="nav-item">
                  <HashLink
                    smooth
                    className={`nav-link ${
                      location.pathname === "/about" ? "active" : ""
                    } `}
                    to="#About"
                  >
                    About
                  </HashLink>
                </li>
                <li className="nav-item mt-3 mt-lg-0">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/contact" ? "active" : ""
                    } `}
                    to="/contact"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
              {!localStorage.getItem("token") ? (
                <form className="d-flex">
                  <Link
                    className="btn btn-primary mx-1 BtnLogin"
                    role="button"
                    to="/login"
                  >
                    Login
                  </Link>
                </form>
              ) : (
                <button className="btn btn-primary" onClick={handleSignout}>
                  Sign out
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
