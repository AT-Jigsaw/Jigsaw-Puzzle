import React, { useState } from "react";
import "./header.css";
import { Modal } from "react-bootstrap";
import Login from "../../components/login/Login";
import Signup from "../../components/signup/Signup";
import { signOut } from "firebase/auth";
import { auth } from "../../auth/firebase";

const Header = (props) => {
  const { isLoggedIn, setIsSignupComplete } = props;
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="header-root">
      <a href="/" className="header-text">
        Jigsaw Puzzle
      </a>

      <div className="header-buttons">
        {!isLoggedIn ? (
          <>
            <button className="pushable" onClick={() => setLoginModalOpen(true)}>
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
              onClick={() => setSignupModalOpen(true)}
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
              <span className="auth-yassified-button">Logout</span>
            </span>
          </button>
        )}
      </div>

      <Modal show={loginModalOpen} onHide={() => setLoginModalOpen(false)} centered>
        <Login setLoginModalOpen={setLoginModalOpen} />
      </Modal>
      <Modal show={signupModalOpen} onHide={() => setSignupModalOpen(false)} centered>
        <Signup setSignupModalOpen={setSignupModalOpen} setIsSignupComplete={setIsSignupComplete} />
      </Modal>
    </div>
  );
};

export default Header;
