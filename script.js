const prizes = [
  { id: 1, name: "Бефстроганов и говядины в сливках с картофельным пюре", image: "./img/1.webp", probability: "Эпик" },
  { id: 2, name: "Борщ с телятиной без сметаны", image: "./img/10.webp", probability: "Редкость" },
  { id: 3, name: "Гедзе с курицей в соусе Чили", image: "./img/9.webp", probability: "Редкость" },
  { id: 4, name: "Куриные котлеты с пюре и сырным соусом", image: "./img/8.webp", probability: "Эпик" },
  { id: 5, name: "Куриные фрикадельки с рисом и овощами", image: "./img/7.webp", probability: "База" },
  { id: 6, name: "Паста с морепродуктами", image: "./img/6.webp", probability: "Эпик" },
  { id: 7, name: "Птитим с вишней и сливочным соусом", image: "./img/5.webp", probability: "База" },
  { id: 8, name: "Традиционный плов с говядиной", image: "./img/4.webp", probability: "Редкость" },
  { id: 9, name: "Филе белой рыбы, запеченное в соусе мисо, с копчеными сливками и картофельным пюре", image: "./img/3.webp", probability: "База" },
  { id: 10, name: "Шоколадный брауни", image: "./img/2.webp", probability: "Легенда" },
];

const degrees = [36, 72, 108, 144, 180, 216, 252, 288, 324, 360];
const probabilities = [4, 15, 10, 15, 7, 15, 7, 10, 10, 7];

let isSpinning = false;
let currentRotation = 0;

const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spinButton");
const wheelScreen = document.getElementById("wheelScreen");
const resultScreen = document.getElementById("resultScreen");
const resultTitle = document.getElementById("resultTitle");
const resultFood = document.getElementById("resultFood");
const resultBadge = document.getElementById("resultBadge");

function getBadgeSrc(probability) {
  if (probability === "База") return "./img/one.webp";
  if (probability === "Редкость") return "./img/two.webp";
  if (probability === "Эпик") return "./img/three.webp";
  if (probability === "Легенда") return "./img/four.webp";
  return "./img/one.webp";
}

function createConfetti() {
  const colors = ["#10B981", "#34D399", "#6EE7B7", "#A7F3D0", "#FBBF24", "#F59E0B"];
  for (let i = 0; i < 50; i += 1) {
    const confetti = document.createElement("div");
    confetti.style.position = "absolute";
    confetti.style.width = "12px";
    confetti.style.height = "12px";
    confetti.style.borderRadius = "2px";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = "-12px";
    confetti.style.pointerEvents = "none";
    confetti.style.animation = `confettiFall ${3 + Math.random() * 2}s ease-out ${Math.random() * 2}s forwards`;
    resultScreen.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }
}

function showResult(prize) {
  resultTitle.innerHTML = `Ваше бесплатное блюдо: <br> ${prize.name}`;
  resultFood.src = prize.image;
  resultBadge.src = getBadgeSrc(prize.probability);
  wheelScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  createConfetti();
}

function spinWheel() {
  if (isSpinning) return;
  isSpinning = true;
  spinButton.disabled = true;

  const random = Math.random() * 100;
  let cumulativeWeight = 0;
  let selectedDegree = degrees[0];

  for (let i = 0; i < probabilities.length; i += 1) {
    cumulativeWeight += probabilities[i];
    if (random <= cumulativeWeight) {
      selectedDegree = degrees[i];
      break;
    }
  }

  const fullRotations = 360 + selectedDegree;
  currentRotation += fullRotations;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  const sectorAngle = 360 / prizes.length;
  const normalizedAngle = (360 - (currentRotation % 360)) % 360;
  const winningIndex = Math.floor(normalizedAngle / sectorAngle);
  const prize = prizes[winningIndex];

  setTimeout(() => showResult(prize), 8000);
}

const style = document.createElement("style");
style.textContent = `
@keyframes confettiFall {
  to {
    transform: translateY(400px) rotate(360deg);
    opacity: 0;
  }
}
`;
document.head.appendChild(style);

spinButton.addEventListener("click", () => {
  setTimeout(spinWheel, 500);
});
