import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header/Header";
import FirstPuzzle from "../../components/FirstPuzzle/FirstPuzzle";
import SecondPuzzle from "../../components/SecondPuzzle/SecondPuzzle";
import ThirdPuzzle from "../../components/ThirdPuzzle/ThirdPuzzle";
import AdditionalDetails from "../../components/additionaldetails/AdditionalDetails";
import "./homepage.css";
import Footer from "../../components/Footer/Footer";
import { Modal } from "react-bootstrap";

const HomePage = () => {
  const [completed, setCompleted] = useState(0);
  const [additionalDetailsModalOpen, setAdditionalDetailsModalOpen] =
    useState(false);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef();
  const [currentStep, setCurrentStep] = useState();

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

  const renderFirstPuzzle = () => {
    return (
      <div className="first-puzzle-root">
        <div className="fixed-timer">Time Elapsed: {timer} s</div>
        <img
          src={require("../../assets/american-tourister-logo.png")}
          alt="at-logo"
          className="at-logo"
        />
        <div className="header-text">
          solve these 3 puzzles as fast as you can
        </div>
        <div className="header-buttons">
          <button className="step1-btn" onClick={() => setCurrentStep(1)}>
            STEP 1
          </button>
          <button className="step2-btn" onClick={() => setCurrentStep(1)}>
            STEP 2
          </button>
          <button className="step3-btn" onClick={() => setCurrentStep(1)}>
            STEP 3
          </button>
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
