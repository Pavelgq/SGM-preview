/**
 * Функция счетчик вызовов
 */
 const makeCounter = function makeCounter() {
  var currentCount = 1;

  function counter() {
    return currentCount++;
  }

  counter.set = function (value) {
    currentCount = value;
  };

  counter.reset = function () {
    currentCount = 1;
  };

  return counter;
}

const randomNumber = function randomNumber(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const scaleCanvas =  function scaleCanvas(canvas, context, width, height) {
  // assume the device pixel ratio is 1 if the browser doesn't specify it
  const devicePixelRatio = window.devicePixelRatio || 1;

  // determine the 'backing store ratio' of the canvas context
  const backingStoreRatio = (
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio || 1
  );

  // determine the actual ratio we want to draw at
  const ratio = devicePixelRatio / backingStoreRatio;

  if (devicePixelRatio !== backingStoreRatio) {
    // set the 'real' canvas size to the higher width/height
    canvas.width = width * ratio;
    canvas.height = height * ratio;

    // ...then scale it back down with CSS
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
  }
  else {
    // this is a normal 1:1 device; just scale it simply
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = '';
    canvas.style.height = '';
  }

  // scale the drawing context so everything will work at the higher ratio
  context.scale(ratio, ratio);
}

const formatDate = function formatDate(date) {

  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy = date.getFullYear();

  return dd + '.' + mm + '.' + yy;
}

export default {
  makeCounter,
  randomNumber,
  scaleCanvas,
  formatDate
};