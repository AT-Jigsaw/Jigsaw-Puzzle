import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header/Header";
import FirstPuzzle from "../../components/FirstPuzzle/FirstPuzzle";
import SecondPuzzle from "../../components/SecondPuzzle/SecondPuzzle";
import ThirdPuzzle from "../../components/ThirdPuzzle/ThirdPuzzle";
import Login from "../../components/Login/Login";
import Signup from "../../components/signup/Signup";
import AdditionalDetails from "../../components/additionaldetails/AdditionalDetails";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../auth/firebase";
import "./homepage.css";
import Footer from "../../components/Footer/Footer";
import { Modal } from "react-bootstrap";

const HomePage = () => {
  const [user, setUser] = useState();
  const [completed, setCompleted] = useState(0);
  const [additionalDetailsModalOpen, setAdditionalDetailsModalOpen] =
    useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    if (!user) setSignupModalOpen(true);
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (completed === 3) {
      clearInterval(intervalRef.current);
      setAdditionalDetailsModalOpen(true);
    }
  }, [completed]);

  useEffect(() => {
    if (!loginModalOpen && !signupModalOpen && user && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [loginModalOpen, signupModalOpen, user]);

  const renderFirstPuzzle = () => {
    return (
      <div className="first-puzzle-root">
        <div className="fixed-timer">Time Elapsed: {timer} s</div>
        <img
          src={require("../../assets/american-tourister-logo.jpg")}
          alt="at-logo"
          className="at-logo"
        />
        <div className="header-text">
          solve these 3 puzzles as fast as you can
        </div>
        <div className="puzzle-containers">
          <FirstPuzzle setCompleted={setCompleted} />
        </div>
      </div>
    );
  };

  const renderSecondPuzzle = () => {
    return (
      <div className="second-puzzle-root">
        <div className="puzzle-containers">
          <SecondPuzzle setCompleted={setCompleted} />
        </div>
      </div>
    );
  };

  const renderThirdPuzzle = () => {
    return (
      <div className="third-puzzle-root">
        <div className="puzzle-containers">
          <ThirdPuzzle setCompleted={setCompleted} />
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header />
      {renderFirstPuzzle()}
      {renderSecondPuzzle()}
      {renderThirdPuzzle()}
      <Footer />
      <Modal
        show={loginModalOpen}
        onHide={() => setLoginModalOpen(false)}
        centered
        backdrop="static"
      >
        <Login
          setLoginModalOpen={setLoginModalOpen}
          setSignupModalOpen={setSignupModalOpen}
        />
      </Modal>
      <Modal
        show={signupModalOpen}
        onHide={() => setSignupModalOpen(false)}
        centered
        backdrop="static"
      >
        <Signup
          setSignupModalOpen={setSignupModalOpen}
          setLoginModalOpen={setLoginModalOpen}
        />
      </Modal>
      <Modal show={additionalDetailsModalOpen} centered backdrop="static">
        <AdditionalDetails
          timer={timer}
          setAdditionalDetailsModalOpen={setAdditionalDetailsModalOpen}
        />
      </Modal>
    </div>
  );
};

export default HomePage;
