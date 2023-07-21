import { useEffect } from "react";
import { confetti } from "../../utils/confetti";
import { renderPuzzleThree } from "../../utils/puzzle";
import { Button } from "react-bootstrap";
import "./third-puzzle.css";

const ThirdPuzzle = (props) => {
  const { setCompleted, setShowTandC } = props;
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
        <button class="pushable" onClick={loadContent}>
          <span class="shadow"></span>
          <span class="edge"></span>
          <span class="front">
            <span class="yassified-button">Reset</span>
          </span>
        </button>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button
          variant="link"
          onClick={() => setShowTandC(true)}
          style={{ color: "#6ec4d7", margin: "16px 0 0 0" }}
        >
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};

export default ThirdPuzzle;
