import { useEffect } from "react";
import { confetti } from "../../utils/confetti";
import { renderPuzzleTwo } from "../../utils/puzzle";
import "./second-puzzle.css";

const SecondPuzzle = (props) => {
  const { setCompleted } = props;
  const isMobileScreen = window.innerWidth < 768;

  const showInfo = () => {
    confetti.start();
    setTimeout(() => confetti.stop(), 1000);
    setCompleted((prevCompleted) => prevCompleted + 1);
  };

  const loadContent = () => {
    renderPuzzleTwo(showInfo);
  };

  useEffect(() => {
    loadContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="desktop-display">
      <div className="puzzle-container">
        <div className="special-box">
          <div id="overlay-2">
            <div id="puzzle_canvas_2"></div>
          </div>
        </div>
        {!isMobileScreen && (
          <div style={{ height: "50px", width: "1px" }}></div>
        )}
      </div>
    </div>
  );
};

export default SecondPuzzle;
