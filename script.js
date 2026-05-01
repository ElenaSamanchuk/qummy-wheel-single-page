const prizes = [
  { name: "Бефстроганов из говядины с картофельным пюре", rarity: "Эпик" },
  { name: "Борщ с телятиной без сметаны", rarity: "Редкость" },
  { name: "Гедзе с курицей в соусе чили", rarity: "Редкость" },
  { name: "Куриные котлеты с пюре и сырным соусом", rarity: "Эпик" },
  { name: "Куриные фрикадельки с рисом и овощами", rarity: "База" },
  { name: "Паста с морепродуктами", rarity: "Эпик" },
  { name: "Птитим с вишней и сливочным соусом", rarity: "База" },
  { name: "Традиционный плов с говядиной", rarity: "Редкость" },
  {
    name: "Филе белой рыбы в соусе мисо с картофельным пюре",
    rarity: "База",
  },
  { name: "Шоколадный брауни", rarity: "Легенда" },
];

const probabilities = [4, 15, 10, 15, 7, 15, 7, 10, 10, 7];
const sectorDegrees = [36, 72, 108, 144, 180, 216, 252, 288, 324, 360];

const spinButton = document.getElementById("spinButton");
const wheel = document.getElementById("wheel");
const resultCard = document.getElementById("resultCard");
const resultDish = document.getElementById("resultDish");
const resultRarity = document.getElementById("resultRarity");

let currentRotation = 0;
let isSpinning = false;

function pickDegreeByWeight() {
  const random = Math.random() * 100;
  let cumulativeWeight = 0;

  for (let i = 0; i < probabilities.length; i += 1) {
    cumulativeWeight += probabilities[i];
    if (random <= cumulativeWeight) {
      return sectorDegrees[i];
    }
  }

  return sectorDegrees[sectorDegrees.length - 1];
}

function getPrizeByRotation(rotation) {
  const sectorAngle = 360 / prizes.length;
  const normalizedAngle = (360 - (rotation % 360)) % 360;
  const winningIndex = Math.floor(normalizedAngle / sectorAngle);
  return prizes[winningIndex];
}

function showResult(prize) {
  resultDish.textContent = prize.name;
  resultRarity.textContent = `Категория: ${prize.rarity}`;
  resultCard.classList.remove("hidden");
}

function spinWheel() {
  if (isSpinning) {
    return;
  }

  isSpinning = true;
  spinButton.disabled = true;

  const selectedDegree = pickDegreeByWeight();
  const fullRotations = 360 * 5 + selectedDegree;
  currentRotation += fullRotations;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  window.setTimeout(() => {
    const prize = getPrizeByRotation(currentRotation);
    showResult(prize);
    isSpinning = false;
    spinButton.disabled = false;
  }, 5200);
}

spinButton.addEventListener("click", spinWheel);
