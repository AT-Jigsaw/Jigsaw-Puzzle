import { useEffect, useState } from "react";
import { confetti } from "../../utils/confetti";
import { renderPuzzle } from "../../utils/puzzle";
import "./puzzles.css";

const Puzzles = () => {
  const isMobileScreen = window.innerWidth < 768;
  const [showNextButton, setShowNextButton] = useState(false);
  const [currentPuzzle, setCurrentPuzzle] = useState(0);

  const showInfo = () => {
    confetti.start();
    setTimeout(() => confetti.stop(), 1000);
    setShowNextButton(true);
  };

  const loadContent = () => {
    renderPuzzle(currentPuzzle, showInfo);
  };

  useEffect(() => {
    loadContent();
  }, [currentPuzzle]);

  const handleNextClick = () => {
    setCurrentPuzzle(currentPuzzle + 1);
    setShowNextButton(false);
  };

  return (
    <div className="desktop-display">
      <div className="puzzle-container">
        <div className="special-box">
          <div id="puzzle_canvas"></div>
        </div>
        <div>
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
            <button className="pushable">
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
                    Next
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
