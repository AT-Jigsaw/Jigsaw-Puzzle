import { useEffect } from "react";
import { confetti } from "../../utils/confetti";
import { renderPuzzleOne } from "../../utils/puzzle";
import "./first-puzzle.css";

const FirstPuzzle = (props) => {
  const { setCompleted } = props;
  const isMobileScreen = window.innerWidth < 768;

  const showInfo = () => {
    confetti.start();
    setTimeout(() => confetti.stop(), 1000);
    setCompleted((prevCompleted) => prevCompleted + 1);
  };

  const loadContent = () => {
    renderPuzzleOne(showInfo);
  };

  useEffect(() => {
    loadContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="desktop-display">
      <div className="puzzle-container">
        <div className="special-box">
          <div id="overlay-1">
            <div id="puzzle_canvas_1"></div>
          </div>
        </div>
        {!isMobileScreen && (
          <div style={{ height: "50px", width: "1px" }}></div>
        )}
      </div>
    </div>
  );
};

export default FirstPuzzle;
