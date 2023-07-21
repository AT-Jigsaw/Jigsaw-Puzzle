import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header/Header";
import FirstPuzzle from "../../components/FirstPuzzle/FirstPuzzle";
import SecondPuzzle from "../../components/SecondPuzzle/SecondPuzzle";
import ThirdPuzzle from "../../components/ThirdPuzzle/ThirdPuzzle";
import AdditionalDetails from "../../components/additionaldetails/AdditionalDetails";
import { Modal, Button } from "react-bootstrap";
import "./homepage.css";
import ThankYou from "../../components/ThankYou/Thankyou";
import TandC from "../../components/TandC/TandC";

const HomePage = () => {
  const [completed, setCompleted] = useState(0);
  const [additionalDetailsModalOpen, setAdditionalDetailsModalOpen] =
    useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef();
  const [currentPuzzle, setCurrentPuzzle] = useState(1);
  const [showTandC, setShowTandC] = useState(false);

  useEffect(() => {
    if (completed === 3) {
      clearInterval(intervalRef.current);
      setAdditionalDetailsModalOpen(true);
    }
  }, [completed]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleNextClick = () => {
    setCurrentPuzzle(currentPuzzle + 1);
  };

  const renderFirstPuzzle = () => {
    return (
      <div className="first-puzzle-root">
        <div className="puzzle-containers">
          <FirstPuzzle
            setCompleted={setCompleted}
            setShowTandC={setShowTandC}
          />
        </div>
      </div>
    );
  };

  const renderSecondPuzzle = () => {
    return (
      <div className="second-puzzle-root">
        <div className="puzzle-containers">
          <SecondPuzzle
            setCompleted={setCompleted}
            setShowTandC={setShowTandC}
          />
        </div>
      </div>
    );
  };

  const renderThirdPuzzle = () => {
    return (
      <div className="third-puzzle-root">
        <div className="puzzle-containers">
          <ThirdPuzzle
            setCompleted={setCompleted}
            setShowTandC={setShowTandC}
          />
        </div>
      </div>
    );
  };

  const getBackgroundColor = () => {
    if (currentPuzzle === 1) return "#5d6d87";
    else if (currentPuzzle === 2) return "#2b2c2e";
    else if (currentPuzzle === 3) return "#6e754c";
  };

  return (
    <div>
      <Header />
      <div className="fixed-timer">Time Elapsed: {timer} s</div>
      <div style={{ background: getBackgroundColor() }}>
        <img
          src={require("../../assets/american-tourister-logo.png")}
          alt="at-logo"
          className="at-logo"
        />
        <div className="header-text">
          solve these 3 puzzles as fast as you can
        </div>
        <div className="header-buttons">
          <button
            className={currentPuzzle === 1 ? "active-btn" : "disabled-btn"}
          >
            step <span>1</span>
          </button>
          <button
            className={currentPuzzle === 2 ? "active-btn" : "disabled-btn"}
          >
            step <span>2</span>
          </button>
          <button
            className={currentPuzzle === 3 ? "active-btn" : "disabled-btn"}
          >
            step <span>3</span>
          </button>
        </div>
        {currentPuzzle === 1 && renderFirstPuzzle()}
        {currentPuzzle === 2 && renderSecondPuzzle()}
        {currentPuzzle === 3 && renderThirdPuzzle()}
        <Modal
          show={currentPuzzle === completed && currentPuzzle !== 3}
          centered
          backdrop="static"
        >
          <div className="next-button-container">
            <div>
              Congratulations!🎉
              <br /> You have completed puzzle {completed}!
            </div>

            <Button
              variant="success"
              onClick={handleNextClick}
              className="next-button"
            >
              Next
            </Button>
          </div>
        </Modal>

        <Modal show={additionalDetailsModalOpen} centered backdrop="static">
          <AdditionalDetails
            timer={timer}
            setAdditionalDetailsModalOpen={setAdditionalDetailsModalOpen}
            setShowThankYouModal={setShowThankYouModal}
          />
        </Modal>

        <Modal show={showThankYouModal} centered backdrop="static" size="xl">
          <ThankYou />
        </Modal>

        <Modal show={showTandC} centered onHide={() => setShowTandC(false)}>
          <TandC />
        </Modal>
      </div>
    </div>
  );
};

export default HomePage;
