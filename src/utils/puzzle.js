import headbreaker from 'headbreaker';
import { puzzleLinks } from './puzzleLinks';

export const renderPuzzle = (currentPuzzle, showConfetti) => {
  const isMobileScreen = window.innerWidth < 768;
  let picture = new Image();
  picture.src = puzzleLinks[currentPuzzle];
  picture.onload = () => {
    let canvasWidth = isMobileScreen ? window.innerWidth * 0.9 : 800;
    let canvasHeight = isMobileScreen ? 300 : 550;

    const puzzle_canvas = new headbreaker.Canvas('puzzle_canvas', {
      width: canvasWidth, height: canvasHeight,
      pieceSize: isMobileScreen ? 50 : 100, proximity: 20,
      strokeWidth: isMobileScreen ? 5 : 10, strokeColor: '#F0F0F0',
      image: picture, fixed: true,
      outline: new headbreaker.outline.Rounded(),
      preventOffstageDrag: true
    });

    puzzle_canvas.adjustImagesToPuzzleHeight();
    puzzle_canvas.autogenerate({
      verticalPiecesCount: 4,
      insertsGenerator: headbreaker.generators.flipflop
    });

    puzzle_canvas.shuffle(0.8);
    puzzle_canvas.attachSolvedValidator();
    puzzle_canvas.draw();


    puzzle_canvas.onConnect((_piece, figure, _target, targetFigure) => {
      figure.shape.stroke('yellow');
      targetFigure.shape.stroke('yellow');
      puzzle_canvas.redraw();

      setTimeout(() => {
        figure.shape.stroke('#F0F0F0');
        targetFigure.shape.stroke('#F0F0F0');
        puzzle_canvas.redraw();
      }, 200);
    });

    puzzle_canvas.registerKeyboardGestures();

    if (document.getElementById("next-button")) {
      document.getElementById("next-button").onclick = () => currentPuzzle = currentPuzzle + 1;
    }
    document.getElementById("reset-button").onclick = () => puzzle_canvas.shuffle(0.8);
    puzzle_canvas.onValid((validator) => complete())

    let complete = async () => {
      puzzle_canvas.solve();
      puzzle_canvas.redraw();
      showConfetti();
    }
  }
};