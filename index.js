//default values
let lvlScale = 1;
let lvlRotation = 1;
let lvlTranslation = 1;

//html elements
const lvlRotationLabel = document.getElementById('lvl-rotation');
const lvlTranslationLabel = document.getElementById('lvl-translation');
const lvlScaleLabel = document.getElementById('lvl-scale');
const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

lvlRotationLabel.innerText = lvlRotation;
lvlTranslationLabel.innerText = lvlTranslation;
lvlScaleLabel.innerText = lvlScale;

const init = () => {
  canvas.width = 600;
  canvas.height = 800;
  ctx.strokeStyle = '#CCC';
  ctx.lineWith = 2;
  drawGrid(100); // draw grid
  drawRect(); //draw rect
};

const drawRect = () => {
  ctx.beginPath();
  ctx.rect(200, 300, 200, 200);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 4
  ctx.stroke();
  ctx.closePath();
};

/**
 *
 * @param {*} gap : Int -> width of each square
 */
const drawGrid = (gap) => {
  ctx.beginPath();
  for (let x = gap; x < canvas.width; x = x + gap) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
  }

  for (let y = gap; y < canvas.height; y = y + gap) {
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.height, y);
  }

  ctx.stroke();
  ctx.closePath();
};

//Entry point
init();
