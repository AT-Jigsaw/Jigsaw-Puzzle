import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header/Header";
import FirstPuzzle from "../../components/FirstPuzzle/FirstPuzzle";
import SecondPuzzle from "../../components/SecondPuzzle/SecondPuzzle";
import ThirdPuzzle from "../../components/ThirdPuzzle/ThirdPuzzle";
import AdditionalDetails from "../../components/additionaldetails/AdditionalDetails";
import "./homepage.css";
import Footer from "../../components/Footer/Footer";
import { Modal } from "react-bootstrap";
import StartNow from "../../components/StartNow/StartNow";

const HomePage = () => {
  const [completed, setCompleted] = useState(0);
  const [additionalDetailsModalOpen, setAdditionalDetailsModalOpen] =
    useState(false);
  const [showStartModal, setShowStartModal] = useState(true);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    if (completed === 3) {
      clearInterval(intervalRef.current);
      setAdditionalDetailsModalOpen(true);
    }
  }, [completed]);

  useEffect(() => {
    if (!showStartModal && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [showStartModal]);

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
      <Modal show={showStartModal} centered backdrop="static">
        <StartNow setShowStartModal={setShowStartModal} />
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
