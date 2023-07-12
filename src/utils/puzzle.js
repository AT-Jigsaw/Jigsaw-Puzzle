import headbreaker from 'headbreaker';
import { puzzleLinks } from './puzzleLinks';

export const renderPuzzleOne = (showConfetti) => {
  const isMobileScreen = window.innerWidth < 768;
  let picture = new Image();
  picture.src = puzzleLinks[0];
  picture.onload = () => {
    let canvasWidth = isMobileScreen ? window.innerWidth * 0.9 : 1200;
    let canvasHeight = isMobileScreen ? 300 : 775;

    const puzzle_canvas = new headbreaker.Canvas('puzzle_canvas_1', {
      width: canvasWidth, height: canvasHeight,
      pieceSize: isMobileScreen ? 70 : 250, proximity: 20,
      image: picture, fixed: true,
      outline: new headbreaker.outline.Rounded(),
      preventOffstageDrag: true
    });

    puzzle_canvas.adjustImagesToPuzzleHeight();
    puzzle_canvas.autogenerate({
      verticalPiecesCount: 2,
      insertsGenerator: headbreaker.generators.flipflop
    });

    puzzle_canvas.shuffle(0.8);

    // puzzle_canvas.solve();

    // let firstClick = true;

    // document.getElementById("overlay-1").onclick = () => {
    //   if (firstClick) {
    //     puzzle_canvas.shuffle(0.8);
    //     firstClick = false;
    //   }
    // };

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

    // document.getElementById("reset-button").onclick = () => puzzle_canvas.shuffle(0.8);
    puzzle_canvas.onValid((validator) => complete())

    let complete = async () => {
      puzzle_canvas.solve();
      puzzle_canvas.redraw();
      showConfetti();
    }
  }
};

export const renderPuzzleTwo = (showConfetti) => {
  const isMobileScreen = window.innerWidth < 768;
  let picture = new Image();
  picture.src = puzzleLinks[1];
  picture.onload = () => {
    let canvasWidth = isMobileScreen ? window.innerWidth * 0.9 : 1200;
    let canvasHeight = isMobileScreen ? 300 : 775;

    const puzzle_canvas = new headbreaker.Canvas('puzzle_canvas_2', {
      width: canvasWidth, height: canvasHeight,
      pieceSize: isMobileScreen ? 70 : 200, proximity: 20,
      image: picture, fixed: true,
      outline: new headbreaker.outline.Rounded(),
      preventOffstageDrag: true
    });

    puzzle_canvas.adjustImagesToPuzzleHeight();
    puzzle_canvas.autogenerate({
      verticalPiecesCount: 2,
      insertsGenerator: headbreaker.generators.flipflop
    });

    puzzle_canvas.shuffle(0.8);

    // puzzle_canvas.solve();

    // let firstClick = true;

    // document.getElementById("overlay-2").onclick = () => {
    //   if (firstClick) {
    //     puzzle_canvas.shuffle(0.8);
    //     firstClick = false;
    //   }
    // };

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

    // document.getElementById("reset-button").onclick = () => puzzle_canvas.shuffle(0.8);
    puzzle_canvas.onValid((validator) => complete())

    let complete = async () => {
      puzzle_canvas.solve();
      puzzle_canvas.redraw();
      showConfetti();
    }
  }
};

export const renderPuzzleThree = (showConfetti) => {
  const isMobileScreen = window.innerWidth < 768;
  let picture = new Image();
  picture.src = puzzleLinks[2];
  picture.onload = () => {
    let canvasWidth = isMobileScreen ? window.innerWidth * 0.9 : 1200;
    let canvasHeight = isMobileScreen ? 300 : 775;

    const puzzle_canvas = new headbreaker.Canvas('puzzle_canvas_3', {
      width: canvasWidth, height: canvasHeight,
      pieceSize: isMobileScreen ? 50 : 150, proximity: 20,
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

    // puzzle_canvas.solve();

    // let firstClick = true;

    // document.getElementById("overlay-3").onclick = () => {
    //   if (firstClick) {
    //     puzzle_canvas.shuffle(0.8);
    //     firstClick = false;
    //   }
    // };

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

    // document.getElementById("reset-button").onclick = () => puzzle_canvas.shuffle(0.8);
    puzzle_canvas.onValid((validator) => complete())

    let complete = async () => {
      puzzle_canvas.solve();
      puzzle_canvas.redraw();
      showConfetti();
    }
  }
};