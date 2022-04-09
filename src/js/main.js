// Chathead implementation

import InertiaDrag from "./inertia-drag";
import {
  computePosition,
  shift,
  autoPlacement,
  arrow,
  offset,
} from "@floating-ui/dom";

const resistanceFactor = 0.8;
const reboundFactor = 0.1;
const $el = document.querySelector("#dragMe");
const $container = document.querySelector("#container");

const $tip_container = document.querySelector(".tooltip-container");
const $arrow = document.querySelector("#arrow");
const $tip = document.querySelector(".tooltip");
const $tip_text = document.querySelector(".tooltip-text");

const inertiaDrag = new InertiaDrag($el);
var containerRect;
var offsetLeft;
var offsetTop;
const minX = 0;
const minY = 0;
var maxX;
var maxY;

var fixed = false; // is position==='fixed' for $container

window.onload = initValues;
window.onresize = initValues;

function initValues() {
  containerRect = $container.getBoundingClientRect();
  offsetLeft = containerRect.left;
  offsetTop = containerRect.top;
  maxX = window.innerWidth - $el.offsetWidth;
  maxY = window.innerHeight - $el.offsetHeight;
  if (fixed) onEnd();
}

function onMove(event) {
  if (!fixed) {
    $container.style.position = "fixed";
    $el.style.transition = "transform 0s";
    fixed = true;
  }
  const elRect = $el.getBoundingClientRect();
  const x = event.deltaX + elRect.left;
  const y = event.deltaY + elRect.top;

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

  $el.style.transform = "translate( " + x2 + "px, " + y2 + "px )";
  moveTooltip();
  checkUnder(x2 + offsetLeft, y2 + offsetTop);
}

function onEnd() {
  const elRect = $el.getBoundingClientRect();
  const x = elRect.left;
  const y = elRect.top;

  const reboundX = x < minX ? minX - x : x > maxX ? maxX - x : 0;
  const reboundY = y < minY ? minY - y : y > maxY ? maxY - y : 0;

  const x2 = reboundX * reboundFactor + elRect.left - offsetLeft;
  const y2 = reboundY * reboundFactor + elRect.top - offsetTop;

  $el.style.transform = "translate( " + x2 + "px, " + y2 + "px )";
  moveTooltip();
  checkUnder(x2 + offsetLeft, y2 + offsetTop);
  snapToSlot(x2 + offsetLeft, y2 + offsetTop);
  if (x2 < minX || x2 > maxX || y2 < minY || y2 > maxY)
    if (Math.abs(reboundX) > 1 || Math.abs(reboundY) > 1)
      requestAnimationFrame(onEnd);
}

inertiaDrag.addEventListener("dragmove", onMove);
inertiaDrag.addEventListener("inertiamove", onMove);
inertiaDrag.addEventListener("dragend", onEnd);
inertiaDrag.addEventListener("inertiaend", onEnd);

// Tooltip implementation

function moveTooltip() {
  computePosition($el, $tip_container, {
    middleware: [
      shift(),
      autoPlacement(),
      offset(10),
      arrow({
        element: $arrow,
      }),
    ],
  }).then(({ x, y, placement, middlewareData }) => {
    $tip_container.style.transform = "translate( " + x + "px, " + y + "px )";

    const { x: arrowX, y: arrowY } = middlewareData.arrow;

    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    }[placement.split("-")[0]];

    Object.assign($arrow.style, {
      left: arrowX != null ? `${arrowX}px` : "",
      top: arrowY != null ? `${arrowY}px` : "",
      [staticSide]: "-4px",
    });
  });
}

// Detect element under chathead

function checkUnder(x, y) {
  const elem = document.elementFromPoint(x, y);
  const chat = elem ? elem.getAttribute("chat") : null;
  if (chat) {
    $tip_text.innerHTML = chat;
    $tip.style.transform = "scale(1, 1)";
    $tip.style.opacity = "1";
  } else {
    $tip.style.transform = "scale(0, 0)";
    $tip.style.opacity = "0";
  }
}

const $slot = document.querySelector(".mii-slot");

function snapToSlot(x, y) {
  const elem = document.elementFromPoint(x, y);
  if (elem && elem.className === "mii-slot") {
    const slotRect = $slot.getBoundingClientRect();
    $el.style.transition = "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
    $el.style.transform =
      "translate( " +
      (slotRect.left - offsetLeft) +
      "px, " +
      (slotRect.top - offsetTop) +
      "px )";
    $container.style.position = "absolute";
    fixed = false;
  }
}
