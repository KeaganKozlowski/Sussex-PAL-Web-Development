const screenWidth = window.innerWidth;
const card = document.getElementById("active-card");
const inactiveCard = document.getElementById("inactive-card");

// Event listeners
document.addEventListener("mousemove", onMouseMove);
card.addEventListener("mouseenter", onMouseEnter);
card.addEventListener("mousedown", onMouseDown);
document.addEventListener("mouseup", onMouseUp);

let savedJobs = [];
let currentCardIndex = 0;
let cardData = ["Meta", "Amazon", "Apple", "Netflix", "Alphabet"];
updateData();

let startX = 0;
let currentX = 0;
let mousePos = 0;
let entered = false;
let mouseDown = false;

function onMouseMove(event) {
  if (!mouseDown) return;

  const x = event.pageX;
  currentX = x - startX;

  if (entered) {
    const rotation = (currentX / screenWidth) * 30;
    card.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;
  }
}

function onMouseUp(event) {
  mouseDown = false;

  if (entered) {
    if (currentX > screenWidth / 4) {
      onRightClick();
    } else if (currentX < -screenWidth / 4) {
      onLeftClick();
    } else {
      card.style.transition = "transform 0.5s, opacity 0.5s";
      card.style.transform = "translateX(0) rotate(0deg)";
      currentX = 0;
    }
  }
}

function onMouseEnter(event) {
  entered = true;
}

function onMouseDown(event) {
  mouseDown = true;
  startX = event.pageX - currentX;
  card.style.transition = "none";
}

function onLeftClick() {
  animateCard(-1);
}

function onRightClick() {
  animateCard(1);
  setTimeout(saveJob, 500);
}

function animateCard(direction) {
  card.style.transition = "transform 0.5s, opacity 0.5s";
  // Animate the position
  card.style.transform = `translateX(${direction * 100}vw) rotate(${
    direction * 30
  }deg)`;
  // Animate the opacity
  card.style.opacity = 0;

  setTimeout(resetCard, 500);
}

function resetCard() {
  card.style.transition = "none";
  card.style.transform = "translateX(0) rotate(0deg)";
  card.style.opacity = 1;
  currentX = 0;
  updateData();
}

function updateData() {
  card.querySelector("h1").innerText = cardData[currentCardIndex];
  currentCardIndex = (currentCardIndex + 1) % cardData.length;
  inactiveCard.querySelector("h1").innerText = cardData[currentCardIndex];
}

function saveJob() {
  alert("It's a MATCH! Don't forget to apply!");
  savedJobs.push(cardData[currentCardIndex]);
}
