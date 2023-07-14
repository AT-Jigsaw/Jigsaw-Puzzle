import { useEffect } from "react";
import { confetti } from "../../utils/confetti";
import { renderPuzzleThree } from "../../utils/puzzle";
import "./third-puzzle.css";

const ThirdPuzzle = (props) => {
  const { setCompleted } = props;
  const isMobileScreen = window.innerWidth < 1024;

  const showInfo = () => {
    confetti.start();
    setTimeout(() => confetti.stop(), 1000);
    setCompleted((prevCompleted) => prevCompleted + 1);
  };

  const loadContent = () => {
    renderPuzzleThree(showInfo);
  };

  useEffect(() => {
    loadContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="desktop-display">
      <div className="puzzle-container">
        <div className="special-box">
            <div id="puzzle_canvas_3"></div>
        </div>
        {!isMobileScreen && (
          <div style={{ height: "50px", width: "1px" }}></div>
        )}
      </div>
    </div>
  );
};

export default ThirdPuzzle;
