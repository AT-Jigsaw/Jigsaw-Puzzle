import { useEffect, useState } from "react";
import { confetti } from "../../utils/confetti";
import { renderPuzzle } from "../../utils/puzzle";
import "./puzzles.css";
import { Modal } from "react-bootstrap";
import { puzzleLinks } from "../../utils/puzzleLinks";
import { signOut } from "firebase/auth";
import { auth } from "../../auth/firebase";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const Puzzles = () => {
  const isMobileScreen = window.innerWidth < 768;
  const [showNextButton, setShowNextButton] = useState(false);
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [stopTimer, setStopTimer] = useState(false);

  const formatTime = () => {
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer - hours * 3600) / 60);
    const seconds = timer - hours * 3600 - minutes * 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const showInfo = () => {
    confetti.start();
    setTimeout(() => confetti.stop(), 1000);
    setShowNextButton(true);
    if (currentPuzzle === puzzleLinks.length - 1) setStopTimer(true);
  };

  const loadContent = () => {
    renderPuzzle(currentPuzzle, showInfo);
  };

  const startTimer = () => {
    if (intervalId) clearInterval(intervalId);
    const id = setInterval(() => setTimer((t) => t + 1), 1000);
    setIntervalId(id);
  };

  const resetTimer = () => {
    if (currentPuzzle === 0) {
      if (intervalId) clearInterval(intervalId);
      setTimer(0);
      startTimer();
    }
  };

  useEffect(() => {
    if (stopTimer) {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopTimer]);

  useEffect(() => {
    loadContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPuzzle]);

  const saveToDatabase = async (timer) => {
    const db = getFirestore();
    const docRef = doc(db, "users", auth.currentUser.uid);
    await setDoc(docRef, { timer }, { merge: true });
  };
  
  const handleNextClick = async () => {
    setCurrentPuzzle(currentPuzzle + 1);
    setShowNextButton(false);
    if (currentPuzzle === puzzleLinks.length - 1) {
      await saveToDatabase(timer);
      signOut(auth);
    }
  };

  const handleStartNow = () => {
    setModalVisible(false);
    startTimer();
  };

  return (
    <div className="desktop-display">
      <Modal show={modalVisible} centered backdrop="static" keyboard={false}>
        <div className="start-now-modal">
          <div className="h2">Start Puzzle</div>
          <div className="fs-5">Click Start when you're ready</div>
          <button className="pushable" onClick={handleStartNow}>
            <span className="shadow"></span>
            <span className="edge next-edge"></span>
            <span className="front">
              <span id="next-button" className="yassified-button next-button">
                Start
              </span>
            </span>
          </button>
        </div>
      </Modal>
      <div className="puzzle-container">
        <div className="special-box">
          <div id="puzzle_canvas"></div>
        </div>
        <div>
          <div className="timer">Time elapsed: {formatTime(timer)}</div>
          <div className="instructions">
            <h3>Instructions:</h3>
            <div style={{ width: "300px" }}>
              Complete the puzzle
              {!isMobileScreen && (
                <>
                  <br />
                  <br />
                  Press <kbd>Shift</kbd> when dragging a clump of puzzle pieces.
                </>
              )}
            </div>
          </div>
          <div className="buttons">
            <button className="pushable" onClick={resetTimer}>
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front">
                <span
                  id="reset-button"
                  className="yassified-button reset-button"
                >
                  Reset
                </span>
              </span>
            </button>
            {showNextButton && (
              <button className="pushable" onClick={handleNextClick}>
                <span className="shadow"></span>
                <span className="edge next-edge"></span>
                <span className="front">
                  <span
                    id="next-button"
                    className="yassified-button next-button"
                  >
                    {currentPuzzle === puzzleLinks.length - 1
                      ? "Submit"
                      : "Next"}
                  </span>
                </span>
              </button>
            )}
          </div>
          {!isMobileScreen && (
            <div style={{ height: "50px", width: "1px" }}></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Puzzles;
