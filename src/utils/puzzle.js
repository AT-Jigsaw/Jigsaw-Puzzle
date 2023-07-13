import headbreaker from 'headbreaker';

export const renderPuzzleOne = (showConfetti) => {
  const isMobileScreen = window.innerWidth < 1024;
  let picture = new Image();
  picture.src = require('../assets/puzzle-1.jpg')
  picture.onload = () => {
    let canvasWidth = isMobileScreen ? window.innerWidth * 0.9 : 1200;
    let canvasHeight = isMobileScreen ? 300 : 775;

    const puzzle_canvas = new headbreaker.Canvas('puzzle_canvas_1', {
      width: canvasWidth, height: canvasHeight,
      pieceSize: isMobileScreen ? { x: 90, y: 76.25 } : { x: 300, y: 255 }, proximity: 20,
      image: picture, fixed: true,
      outline: new headbreaker.outline.Rounded(),
      preventOffstageDrag: true
    });

    puzzle_canvas.adjustImagesToPuzzleHeight();
    puzzle_canvas.autogenerate({
      verticalPiecesCount: 2,
      horizontalPiecesCount: 3,
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
  const isMobileScreen = window.innerWidth < 1024;
  let picture = new Image();
  picture.src = require('../assets/puzzle-2.jpg')
  picture.onload = () => {
    let canvasWidth = isMobileScreen ? window.innerWidth * 0.9 : 1200;
    let canvasHeight = isMobileScreen ? 300 : 775;

    let puzzle_canvas = new headbreaker.Canvas('puzzle_canvas_2', {
      width: canvasWidth, height: canvasHeight,
      pieceSize: isMobileScreen ? { x: 70, y: 98 } : { x: 242, y: 270 }, proximity: 20,
      image: picture, fixed: true,
      outline: new headbreaker.outline.Rounded(),
      preventOffstageDrag: true
    });

    puzzle_canvas.adjustImagesToPuzzleHeight();
    puzzle_canvas.autogenerate({
      verticalPiecesCount: 2,
      horizontalPiecesCount: 4,
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
  const isMobileScreen = window.innerWidth < 1024;
  let picture = new Image();
  picture.src = require('../assets/puzzle-3.jpg')
  picture.onload = () => {
    let canvasWidth = isMobileScreen ? window.innerWidth * 0.9 : 1200;
    let canvasHeight = isMobileScreen ? 300 : 775;

    const puzzle_canvas = new headbreaker.Canvas('puzzle_canvas_3', {
      width: canvasWidth, height: canvasHeight,
      pieceSize: isMobileScreen ? { x: 39, y: 43.33 } : { x: 135, y: 150 }, proximity: 20,
      image: picture, fixed: true,
      outline: new headbreaker.outline.Rounded(),
      preventOffstageDrag: true
    });

    puzzle_canvas.adjustImagesToPuzzleHeight();
    puzzle_canvas.autogenerate({
      verticalPiecesCount: 4,
      horizontalPiecesCount: 8,
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

    // document.getElementById("reset-button").onclick = () => puzzle_canvas.shuffle(0.8);
    puzzle_canvas.onValid((validator) => complete())

    let complete = async () => {
      puzzle_canvas.solve();
      puzzle_canvas.redraw();
      showConfetti();
    }
  }
};