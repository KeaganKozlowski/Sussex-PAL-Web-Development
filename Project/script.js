// Event listeners
const card = document.getElementById("active-card");
document.addEventListener("mousemove", onMouseMove);
card.addEventListener("mouseenter", onMouseEnter);
document.addEventListener("mousedown", onMouseDown);
document.addEventListener("mouseup", onMouseUp);
screenWidth = window.innerWidth;

let mousePos = 0;
let entered = false;
let mouseDown = false;

function onMouseMove(event) {
  const x = event.pageX;
  mousePos = x;

  if (entered && mouseDown) {
    card.style.transform = "translateX(" + x + "px)";
  }
}

function onMouseUp(event) {
  mouseDown = false;

  if (entered) {
    if (mousePos > screenWidth / 2) {
      onRightClick();
    } else {
      onLeftClick();
    }
  }
}

function onMouseEnter(event) {
  entered = true;
}

function onMouseDown(event) {
  mouseDown = true;
}

function onLeftClick() {
  animateCard(-1);
}

function onRightClick() {
  animateCard(1);
}

function animateCard(direction) {
  // Get current card
  const card = document.getElementById("active-card");

  card.style.transition = "transform 0.5s, opacity 0.5s";
  // Animate the position
  card.style.transform = "translateX(" + direction * 50 + "vw)";
  // Animate the opacity
  card.style.opacity = 0;
}
