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
  const [isOverlayClicked, setIsOverlayClicked] = useState(false);
  const intervalRef = useRef();

  useEffect(() => {
    if (completed === 3) {
      clearInterval(intervalRef.current);
      setAdditionalDetailsModalOpen(true);
    }
  }, [completed]);

  useEffect(() => {
    if (isOverlayClicked && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isOverlayClicked]);

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
        <div className="puzzle-containers">
          <FirstPuzzle
            setCompleted={setCompleted}
            setIsOverlayClicked={setIsOverlayClicked}
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
            setIsOverlayClicked={setIsOverlayClicked}
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
            setIsOverlayClicked={setIsOverlayClicked}
          />
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
