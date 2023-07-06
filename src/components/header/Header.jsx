import React, { useState } from "react";
import "./header.css";
import { Button, Modal } from "react-bootstrap";
import Login from '../../components/login/Login';
import Signup from '../../components/signup/Signup'

const Header = () => {
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showSignupPage, setShowSignupPage] = useState(false);
  return (
    <div className="header-root">
      <Button variant="link" className="header-text">
        Jigsaw Puzzle
      </Button>

      <div className="header-buttons">
        <button className="pushable" onClick={() => setShowLoginPage(true)}>
          <span className="shadow"></span>
          <span className="edge login-edge"></span>
          <span className="front">
            <span id="login-button" className="yassified-button">
              Login
            </span>
          </span>
        </button>
        <button className="pushable" onClick={() => setShowSignupPage(true)}>
          <span className="shadow"></span>
          <span className="edge signup-edge"></span>
          <span className="front">
            <span id="signup-button" className="yassified-button">
              Signup
            </span>
          </span>
        </button>
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
