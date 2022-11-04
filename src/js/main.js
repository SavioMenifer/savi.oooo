// Chathead implementation

import InertiaDrag from "./inertia-drag";
import {
  computePosition,
  shift,
  autoPlacement,
  arrow,
  offset,
} from "@floating-ui/dom";
import "lite-youtube-embed";

const resistanceFactor = 0.8;
const reboundFactor = 0.1;
const $mii = document.querySelector("#dragMe");
const $container = document.querySelector("#container");

const $tip_container = document.querySelector(".tooltip-container");
const $arrow = document.querySelector("#arrow");
const $tip = document.querySelector(".tooltip");
const $tip_text = document.querySelector(".tooltip-text");

const inertiaDrag = new InertiaDrag($mii);
var containerRect;
var offsetLeft;
var offsetTop;
const minX = 0;
const minY = 0;
var maxX;
var maxY;

var fixed = false; // is position==='sticky | fixed' for $container
var fixedPosition = "fixed";
const mediaQuery = window.matchMedia("(min-width: 60em)");

var snapped = true;

window.onload = initValues;
window.onresize = initValues;

function initValues() {
  containerRect = $container.getBoundingClientRect();
  offsetLeft = containerRect.left;
  offsetTop = containerRect.top;
  maxX = window.innerWidth - $mii.offsetWidth;
  maxY = window.innerHeight - $mii.offsetHeight;
  if (mediaQuery.matches) {
    fixedPosition = "sticky";
  } else {
    fixedPosition = "fixed";
  }
  if (fixed) onEnd();
}

function onMove(event) {
  if (!fixed) {
    $container.style.position = fixedPosition;
    fixed = true;
  }
  $mii.style.transition = "transform 0s";
  snapped = false;

  const elRect = $mii.getBoundingClientRect();
  const x = event.deltaX + elRect.left;
  const y = event.deltaY + elRect.top;

  const x2 = event.deltaX + elRect.left - offsetLeft;
  const y2 = event.deltaY + elRect.top - offsetTop;

  $mii.style.transform = `translate(${x2}px, ${y2}px)`;
  moveTooltip();
  checkUnder(x2 + offsetLeft, y2 + offsetTop);
}

function onInertiaMove(event) {
  const elRect = $mii.getBoundingClientRect();
  const x = event.deltaX + elRect.left;
  const y = event.deltaY + elRect.top;

  var resistanceX = 1;
  var resistanceY = 1;
  var reboundX = 0;
  var reboundY = 0;

  if (x < minX || x > maxX) {
    resistanceX = resistanceFactor;
    reboundX = x < minX ? minX - x : x > maxX ? maxX - x : 0;
  }
  if (y < minY || y > maxY) {
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

  checkUnder(x2 + offsetLeft, y2 + offsetTop);
  if (!snapped) {
    $mii.style.transform = `translate(${x2}px, ${y2}px)`;
    moveTooltip();
  }
}

function onEnd() {
  const elRect = $mii.getBoundingClientRect();
  const x = elRect.left;
  const y = elRect.top;

  const reboundX = x < minX ? minX - x : x > maxX ? maxX - x : 0;
  const reboundY = y < minY ? minY - y : y > maxY ? maxY - y : 0;

  const x2 = reboundX * reboundFactor + elRect.left - offsetLeft;
  const y2 = reboundY * reboundFactor + elRect.top - offsetTop;

  openEyes();
  $mii.style.transform = `translate(${x2}px, ${y2}px)`;
  moveTooltip();
  checkUnder(x2 + offsetLeft, y2 + offsetTop);
  if (x2 < minX || x2 > maxX || y2 < minY || y2 > maxY)
    if (Math.abs(reboundX) > 1 || Math.abs(reboundY) > 1)
      requestAnimationFrame(onEnd);
}

inertiaDrag.addEventListener("dragmove", onMove);
inertiaDrag.addEventListener("inertiamove", onInertiaMove);
inertiaDrag.addEventListener("dragend", onEnd);
inertiaDrag.addEventListener("inertiaend", onEnd);

// Tooltip implementation

function moveTooltip() {
  computePosition($mii, $tip_container, {
    middleware: [
      shift(),
      autoPlacement(),
      offset(10),
      arrow({
        element: $arrow,
      }),
    ],
  }).then(({ x, y, placement, middlewareData }) => {
    $tip_container.style.transform = `translate(${x}px, ${y}px)`;

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
  let miiRect = $mii.getBoundingClientRect();
  const elems = document.elementsFromPoint(
    x + miiRect.width / 2,
    y + miiRect.height / 2
  );
  var chat_elem = elems.find((e) => e.hasAttribute("chat"));
  var chat = chat_elem ? chat_elem.getAttribute("chat") : null;
  if (chat) {
    $tip_text.innerHTML = chat;
    $tip.style.transform = "scale(1, 1)";
    $tip.style.opacity = "1";
  } else {
    $tip.style.transform = "scale(0, 0)";
    $tip.style.opacity = "0";
  }
  if (elems.some((e) => e.className === "mii-slot")) snapToSlot();
}

const $slot = document.querySelector(".mii-slot");

function snapToSlot(x, y) {
  const slotRect = $slot.getBoundingClientRect();
  $mii.style.transition = "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
  $mii.style.transform =
    "translate( " +
    (slotRect.left - offsetLeft) +
    "px, " +
    (slotRect.top - offsetTop) +
    "px )";
  $container.style.position = "absolute";
  fixed = false;
  snapped = true;
}

// slider

const $slider = document.querySelector(".slider");
let pos = { top: 0, left: 0, x: 0, y: 0 };

const mouseDownHandler = function (e) {
  $slider.style.cursor = "grabbing";
  $slider.style.userSelect = "none";

  pos = {
    left: $slider.scrollLeft,
    top: $slider.scrollTop,
    x: e.clientX,
    y: e.clientY,
  };

  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler);
};

const mouseMoveHandler = function (e) {
  const dx = e.clientX - pos.x;
  const dy = e.clientY - pos.y;

  $slider.scrollTop = pos.top - dy;
  $slider.scrollLeft = pos.left - dx;
};

const mouseUpHandler = function () {
  document.removeEventListener("mousemove", mouseMoveHandler);
  document.removeEventListener("mouseup", mouseUpHandler);

  $slider.style.cursor = "grab";
  $slider.style.removeProperty("user-select");
};

if ($slider) {
  document.addEventListener("DOMContentLoaded", function () {
    // $slider.style.overflowX = "hidden";
    let images = $slider.getElementsByTagName("img");
    for (const image of images) {
      image.setAttribute("draggable", "false");
      image.setAttribute("onmousedown", "return false");
    }
    $slider.addEventListener("mousedown", mouseDownHandler);
  });
}

// googly eyes

var drawables = document.querySelector(".drawables");
var eyeballs = document.querySelectorAll(".eyeball");
var eyes = document.querySelectorAll(".eye");
var eye_state = "closed";

const googlyEyes = function (e) {
  for (var i = 0; i < eyes.length; i++) {
    let boxBoundingRect = eyes[i].getBoundingClientRect();
    let boxCenter = {
      x: boxBoundingRect.left + boxBoundingRect.width / 2,
      y: boxBoundingRect.top + boxBoundingRect.height / 2,
    };

    let angle =
      Math.atan2(e.clientX - boxCenter.x, -(e.clientY - boxCenter.y)) *
      (180 / Math.PI);
    eyeballs[i].style.transition = "none";
    eyeballs[i].style.transform = `rotate(${angle}deg)`;
  }
};

const miiPointerProximity = function (e) {
  let miiRect = $mii.getBoundingClientRect();
  let miiCenter = {
    x: miiRect.left + miiRect.width / 2,
    y: miiRect.top + miiRect.height / 2,
  };

  if (
    Math.abs(e.clientX - miiCenter.x) < 100 &&
    Math.abs(e.clientY - miiCenter.y) < 100
  ) {
    if (eye_state !== "happy") {
      openEyes();
      googlyEyes(e);
    }
  } else {
    if (snapped) closeEyes();
    else if (eye_state === "open") resetEyes();
  }
};

const closeEyes = function () {
  if (eye_state !== "closed")
    for (var i = 0; i < eyes.length; i++) {
      eyes[i].style.clipPath = "ellipse(50% 0% at center)";
    }
  eye_state = "closed";
};

const openEyes = function () {
  if (eye_state !== "open")
    for (var i = 0; i < eyes.length; i++) {
      eyes[i].style.clipPath = "ellipse(50% 50% at center)";
      resetEyes();
    }
  eye_state = "open";
};

const happyEyes = function () {
  for (var i = 0; i < eyes.length; i++) {
    eyes[i].style.clipPath =
      "path('M 14 8 C 14 9.6 12 6.4 8 6.4 S 2 9.6 2 8 S 4.32 3.2 8 3.2 S 14 6.4 14 8 Z')";
    eyeballs[i].style.transition = "transform ease 0.1s";
    eyeballs[i].style.transform = "translateY(0.4em) scale(2)";
  }
  eye_state = "happy";
};

const resetEyes = function () {
  for (var i = 0; i < eyes.length; i++) {
    eyeballs[i].style.transition = "transform ease 0.1s";
    eyeballs[i].style.transform = "translateY(0.175em) scale(1)"; // translate Y is (1-size of eyeball)/2
  }
};

const miiPress = function () {
  drawables.style.transform = "scale(0.9)";
  happyEyes();
};

const miiRelease = function () {
  drawables.style.transform = "scale(1)";
  openEyes();
};

document.addEventListener("mousemove", miiPointerProximity);
$mii.addEventListener("mousedown", miiPress);
$mii.addEventListener("touchstart", miiPress);
$mii.addEventListener("mouseup", miiRelease);
$mii.addEventListener("touchend", miiRelease);
