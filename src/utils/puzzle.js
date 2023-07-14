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
      pieceSize: isMobileScreen ? { x: 80, y: 68 } : { x: 300, y: 255 }, proximity: 20,
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
      pieceSize: isMobileScreen ? { x: 80, y: 44.5 } : { x: 300, y: 166.67 }, proximity: 20,
      image: picture, fixed: true,
      outline: new headbreaker.outline.Rounded(),
      preventOffstageDrag: true
    });

    puzzle_canvas.adjustImagesToPuzzleHeight();
    puzzle_canvas.autogenerate({
      verticalPiecesCount: 3,
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

export const renderPuzzleThree = (showConfetti) => {
  const isMobileScreen = window.innerWidth < 1024;
  let picture = new Image();
  picture.src = require('../assets/puzzle-3.jpg')
  picture.onload = () => {
    let canvasWidth = isMobileScreen ? window.innerWidth * 0.9 : 1200;
    let canvasHeight = isMobileScreen ? 300 : 775;

    const puzzle_canvas = new headbreaker.Canvas('puzzle_canvas_3', {
      width: canvasWidth, height: canvasHeight,
      pieceSize: isMobileScreen ? { x: 66, y: 48 } : { x: 240, y: 180 }, proximity: 20,
      image: picture, fixed: true,
      outline: new headbreaker.outline.Rounded(),
      preventOffstageDrag: true
    });

    puzzle_canvas.adjustImagesToPuzzleHeight();
    puzzle_canvas.autogenerate({
      verticalPiecesCount: 3,
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