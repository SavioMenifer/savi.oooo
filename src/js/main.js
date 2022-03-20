// manual implementation

import InertiaDrag from "./inertia-drag";

const resistanceFactor = 0.8;
const reboundFactor = 0.1;
const $el = document.querySelector("#dragMe");
const $container = document.querySelector("#container");
const $tip = document.querySelector(".tooltip-container");

const inertiaDrag = new InertiaDrag($el);
const elRect = $el.getBoundingClientRect();
const offsetLeft = elRect.left;
const offsetTop = elRect.top;
const minX = 0;
const minY = 0;
const maxX = $container.offsetWidth - $el.offsetWidth;
const maxY = $container.offsetHeight - $el.offsetHeight;

const onMove = function (event) {
  const elRect = $el.getBoundingClientRect();
  const x = event.deltaX + elRect.left - offsetLeft;
  const y = event.deltaY + elRect.top - offsetTop;

  var resistanceX = 1;
  var resistanceY = 1;
  var reboundX = 0;
  var reboundY = 0;

  if (event.type === "inertiamove" && (x < minX || x > maxX)) {
    resistanceX = resistanceFactor;
    reboundX = x < minX ? minX - x : x > maxX ? maxX - x : 0;
  }
  if (event.type === "inertiamove" && (y < minY || y > maxY)) {
    resistanceY = resistanceFactor;
    reboundY = y < minY ? minY - y : y > maxY ? maxY - y : 0;
  }

  const x2 =
    event.deltaX * resistanceX +
    reboundX * reboundFactor +
    elRect.left -
    offsetLeft;
  const y2 =
    event.deltaY * resistanceY +
    reboundY * reboundFactor +
    elRect.top -
    offsetTop;

  moveTooltip(x2, y2);
  $el.style.transform = "translate( " + x2 + "px, " + y2 + "px )";
};

const onEnd = function () {
  const elRect = $el.getBoundingClientRect();
  const x = elRect.left - offsetLeft;
  const y = elRect.top - offsetTop;

  const reboundX = x < minX ? minX - x : x > maxX ? maxX - x : 0;
  const reboundY = y < minY ? minY - y : y > maxY ? maxY - y : 0;

  const x2 = reboundX * reboundFactor + elRect.left - offsetLeft;
  const y2 = reboundY * reboundFactor + elRect.top - offsetTop;

  $el.style.transform = "translate( " + x2 + "px, " + y2 + "px )";

  if (x2 < minX || x2 > maxX || y2 < minY || y2 > maxY)
    if (Math.abs(reboundX) > 1 || Math.abs(reboundY) > 1)
      requestAnimationFrame(onEnd);
};

inertiaDrag.addEventListener("dragmove", onMove);
inertiaDrag.addEventListener("inertiamove", onMove);
inertiaDrag.addEventListener("dragend", onEnd);
inertiaDrag.addEventListener("inertiaend", onEnd);

const moveTooltip = function (x, y) {
  //const tipRect = $tip.getBoundingClientRect();
  $tip.style.transform = "translate( " + x + "px, " + y + "px )";
};
