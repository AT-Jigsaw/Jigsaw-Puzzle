import React, { useState } from "react";
import "./header.css";
import { Modal } from "react-bootstrap";
import Login from "../../components/login/Login";
import Signup from "../../components/signup/Signup";

const Header = (props) => {
  const { isLoggedIn } = props;
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showSignupPage, setShowSignupPage] = useState(false);

  const handleLogout = () => {};

  return (
    <div className="header-root">
      <a href="/" className="header-text">
        Jigsaw Puzzle
      </a>

      <div className="header-buttons">
        {!isLoggedIn ? (
          <>
            <button className="pushable" onClick={() => setShowLoginPage(true)}>
              <span className="auth-shadow"></span>
              <span className="auth-edge login-edge"></span>
              <span className="front">
                <span className="auth-yassified-button login-button">
                  Login
                </span>
              </span>
            </button>
            <button
              className="pushable"
              onClick={() => setShowSignupPage(true)}
            >
              <span className="auth-shadow"></span>
              <span className="auth-edge signup-edge"></span>
              <span className="front">
                <span className="auth-yassified-button signup-button">
                  Signup
                </span>
              </span>
            </button>
          </>
        ) : (
          <button className="pushable" onClick={handleLogout}>
            <span className="auth-shadow"></span>
            <span className="auth-edge"></span>
            <span className="front">
              <span className="auth-yassified-button">
                Logout
              </span>
            </span>
          </button>
        )}
      </div>

      <Modal show={showLoginPage} onHide={() => setShowLoginPage(false)}>
        <Login />
      </Modal>
      <Modal show={showSignupPage} onHide={() => setShowSignupPage(false)}>
        <Signup />
      </Modal>
    </div>
  );
};

export default Header;
