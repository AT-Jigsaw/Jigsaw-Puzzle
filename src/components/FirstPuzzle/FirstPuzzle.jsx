import { useEffect, useState } from "react";
import { confetti } from "../../utils/confetti";
import { renderPuzzleOne } from "../../utils/puzzle";
import "./first-puzzle.css";

const FirstPuzzle = (props) => {
  const { setCompleted } = props;
  const isMobileScreen = window.innerWidth < 1024;

  const [overlayVisible, setOverlayVisible] = useState(true);

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
          {overlayVisible && (
            <img
              src={require("../../assets/puzzle-1.jpg")}
              alt="overlay"
              onClick={() => setOverlayVisible(false)}
              style={{
                position: "absolute",
                zIndex: 1,
                width: "100%",
                height: "100%",
                cursor: "pointer",
                top: 0,
                left: 0,
              }}
            />
          )}
          <div id="puzzle_canvas_1"></div>
        </div>
        {!isMobileScreen && (
          <div style={{ height: "50px", width: "1px" }}></div>
        )}
      </div>
    </div>
  );
};

export default FirstPuzzle;
