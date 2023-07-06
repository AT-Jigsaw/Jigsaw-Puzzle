import headbreaker from 'headbreaker';
import { puzzleLinks } from './puzzleLinks'

export const renderPuzzle = (currentPuzzle, stroke_width, showConfetti) => {
  let picture = new Image();
  picture.src = puzzleLinks[currentPuzzle];
  picture.onload = () => {
    const puzzle_canvas = new headbreaker.Canvas('puzzle_canvas', {
      width: 800, height: 550,
      pieceSize: 100, proximity: 20,
      strokeWidth: stroke_width, strokeColor: '#F0F0F0',
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

    let complete = () => {
      puzzle_canvas.solve();
      puzzle_canvas.redraw();
      showConfetti();
      currentPuzzle = 1
    }
  }
};