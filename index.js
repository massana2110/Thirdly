//default values
let lvlScale = 1;
let lvlRotation = 1;
let lvlTranslation = 1;
let x0 = 100;
let y0 = 100;

let a = 150; // escala de 100
let b = 50; // escala 100

let w = 2;
let h = 2;

let angle = 0; //pi radianes

let matrixTranslation = [
  1, 0, a,
  0, 1, b,
  0, 0, 1,
];

let matrixScale = [
  w, 0, 0,
  0, h, 0,
  0, 0, 1,
]

let matrixRotation = [
  Math.cos(angle), Math.sin(angle), 0,
  (-1) * Math.sin(angle), Math.cos(angle), 0,
  0, 0, 1
]

let matrixPoints = [ x0, y0, 1 ];

let previousPoints = [];

//html elements
const lvlRotationLabel = document.getElementById('lvl-rotation');
const lvlTranslationLabel = document.getElementById('lvl-translation');
const lvlScaleLabel = document.getElementById('lvl-scale');

const minusScaleBtn = document.getElementById('minus-scale');
const addScaleBtn = document.getElementById('add-scale');
const minusRotationBtn = document.getElementById('minus-rotation');
const addRotationBtn = document.getElementById('add-rotation');
const minusTranslationBtn = document.getElementById('minus-translation');
const addTranslationBtn = document.getElementById('add-translation');

const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

lvlRotationLabel.innerText = lvlRotation;
lvlTranslationLabel.innerText = lvlTranslation;
lvlScaleLabel.innerText = lvlScale;

//helpers

// point • matrix
function multiplyMatrixAndPoint(matrix, point) {
  // Give a simple variable name to each part of the matrix, a column and row number
  let c0r0 = matrix[ 0], c1r0 = matrix[ 1], c2r0 = matrix[ 2]
  let c0r1 = matrix[ 3], c1r1 = matrix[ 4], c2r1 = matrix[ 5]
  let c0r2 = matrix[ 6], c1r2 = matrix[ 7], c2r2 = matrix[ 8]

  // Now set some simple names for the point
  let x = point[0];
  let y = point[1];
  let z = point[2];

  // Multiply the point against each part of the 1st column, then add together
  let resultX = (x * c0r0) + (y * c1r0) + (z * c2r0)

  // Multiply the point against each part of the 2nd column, then add together
  let resultY = (x * c0r1) + (y * c1r1) + (z * c2r1)

  // Multiply the point against each part of the 3rd column, then add together
  let resultZ = (x * c0r2) + (y * c1r2) + (z * c2r2)

  return [resultX, resultY, resultZ];
}

//matrixA • matrixB
function multiplyMatrices(matrixA, matrixB) {
  // Slice the second matrix up into rows
  let row0 = [matrixB[ 0], matrixB[ 1], matrixB[ 2]];

  console.log('row0', row0)
  // Multiply each row by matrixA
  let result0 = multiplyMatrixAndPoint(matrixA, row0);

  // Turn the result rows back into a single matrix
  return [
    result0[0], result0[1], result0[2]
  ];
}

//methods of objects transformations

const addTranslation = () => {
  if (lvlTranslation === 5) {
    alert('Only 5 levels of translation');
    return;
  }

  lvlTranslation += 1;
  updateLabels('translation');

  previousPoints.push({x: x0, y: y0})
  //operation of translate
  let matrixProduct = multiplyMatrices(matrixTranslation, matrixPoints)

  x0 = matrixProduct[0]
  y0 = matrixProduct[1]

  matrixPoints = [x0, y0, 1]

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  canvas.width = 800;
  canvas.height = 1000;
  ctx.strokeStyle = '#CCC';
  ctx.lineWith = 2;
  drawGrid(100); // draw grid
  drawRect()

  console.log(matrixProduct);
};

const substractTranslation = () => {
  if (lvlTranslation === 1) {
    alert('No 0 level of translation');
    return;
  }

  lvlTranslation -= 1;
  updateLabels('translation');

};

const addRotation = () => {
  if (lvlRotation === 5) {
    alert('Only 5 levels of rotation');
    return;
  }

  lvlRotation += 1;
  updateLabels('rotation');

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  canvas.width = 800;
  canvas.height = 1000;
  ctx.strokeStyle = '#CCC';
  ctx.lineWith = 2;
  drawGrid(100); // draw grid

  ctx.beginPath();
  ctx.rotate((20 * (lvlRotation - 1)) * Math.PI / 180);
  ctx.rect(x0, y0, 100, 100);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.closePath();

  
  
};

const substractRotation = () => {
  if (lvlRotation === 1) {
    alert('No 0 level of rotation');
    return;
  }

  lvlRotation -= 1;
  updateLabels('rotation');

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  canvas.width = 800;
  canvas.height = 1000;
  ctx.strokeStyle = '#CCC';
  ctx.lineWith = 2;
  drawGrid(100); // draw grid

  ctx.beginPath();

  ctx.rotate((20 * (lvlRotation - 1)) * Math.PI / 180);

  ctx.rect(x0, y0, 100, 100);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.closePath();
};

const addScale = () => {
  if (lvlScale === 5) {
    alert('Only 5 levels of scale');
    return;
  }

  lvlScale += 1;
  updateLabels('scale');

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  canvas.width = 800;
  canvas.height = 1000;
  ctx.strokeStyle = '#CCC';
  ctx.lineWith = 2;
  drawGrid(100); // draw grid

  ctx.beginPath();
  ctx.scale(lvlScale, lvlScale)

  ctx.rect(x0, y0, 100, 100);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.closePath();
};

const substractScale = () => {
  if (lvlScale === 1) {
    alert('No 0 level of scale');
    return;
  }

  lvlScale -= 1;
  updateLabels('scale');

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  canvas.width = 800;
  canvas.height = 1000;
  ctx.strokeStyle = '#CCC';
  ctx.lineWith = 2;
  drawGrid(100); // draw grid

  ctx.beginPath();
  ctx.scale(lvlScale, lvlScale)

  ctx.rect(x0, y0, 100, 100);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.closePath();
};

/**
 *
 * @param {string} action -> accion que se realizara
 */
const updateLabels = (action) => {
  switch (action) {
    case 'translation':
      lvlTranslationLabel.innerText = lvlTranslation;
      break;

    case 'rotation':
      lvlRotationLabel.innerText = lvlRotation;
      break;

    case 'scale':
      lvlScaleLabel.innerText = lvlScale;
      break;
    default:
      break;
  }
};

const init = () => {
  canvas.width = 800;
  canvas.height = 1000;
  ctx.strokeStyle = '#CCC';
  ctx.lineWith = 2;
  drawGrid(100); // draw grid
  drawRect(); //draw rect
};

const drawRect = () => {
  ctx.beginPath();
  ctx.rect(x0, y0, 100, 100);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 4;
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

//listeners
addTranslationBtn.addEventListener('click', addTranslation);
minusTranslationBtn.addEventListener('click', substractTranslation);

addRotationBtn.addEventListener('click', addRotation);
minusRotationBtn.addEventListener('click', substractRotation);

addScaleBtn.addEventListener('click', addScale);
minusScaleBtn.addEventListener('click', substractScale);
