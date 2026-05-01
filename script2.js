const prizes = [
  {
    id: 1,
    name: "Бефстроганов и говядины в сливках с картофельным пюре",
    image: "./img/1.webp",
    probability: "Эпик",
  },
  {
    id: 2,
    name: "Борщ с телятиной без сметаны",
    image: "./img/10.webp",
    probability: "Редкость",
  },
  {
    id: 3,
    name: "Гедзе с курицей в соусе Чили",
    image: "./img/9.webp",
    probability: "Редкость",
  },
  {
    id: 4,
    name: "Куриные котлеты с пюре и сырным соусом",
    image: "./img/8.webp",
    probability: "Эпик",
  },
  {
    id: 5,
    name: "Куриные фрикадельки с рисом и овощами",
    image: "./img/7.webp",
    probability: "База",
  },
  {
    id: 6,
    name: "Паста с морепродуктами",
    image: "./img/6.webp",
    probability: "Эпик",
  },
  {
    id: 7,
    name: "Птитим с вишней и сливочным соусом",
    image: "./img/5.webp",
    probability: "База",
  },
  {
    id: 8,
    name: "Традиционный плов с говядиной",
    image: "./img/4.webp",
    probability: "Редкость",
  },
  {
    id: 9,
    name: "Филе белой рыбы, запеченное в соусе мисо, с копчеными сливками и картофельным пюре",
    image: "./img/3.webp",
    probability: "База",
  },
  {
    id: 10,
    name: "Шоколадный брауни",
    image: "./img/2.webp",
    probability: "Легенда",
  },
];

const deg = [36, 72, 108, 144, 180, 216, 252, 288, 324, 360];
const probabilities = [4, 15, 10, 15, 7, 15, 7, 10, 10, 7];

let isSpinning = false;
let currentRotation = 0;
let selectedPrizeId = null;

const spinButton = document.getElementById("spinButton");

function spinWheel() {
  if (isSpinning) return;
  isSpinning = true;

  const random = Math.random() * 100;
  let cumulativeWeight = 0;
  let selectedDegree = 0;

  for (let i = 0; i < probabilities.length; i++) {
    cumulativeWeight += probabilities[i];
    if (random <= cumulativeWeight) {
      selectedDegree = deg[i];
      break;
    }
  }

  const fullRotations = 360 + selectedDegree;
  const newRotation = currentRotation + fullRotations;
  currentRotation = newRotation;

  const wheel = document.getElementById("wheel");
  wheel.style.transform = `rotate(${newRotation}deg)`;

  const sectorAngle = 360 / prizes.length;
  const normalizedAngle = (360 - (newRotation % 360)) % 360;
  const winningIndex = Math.floor(normalizedAngle / sectorAngle);
  const prize = prizes[winningIndex];
  selectedPrizeId = prize.id;

  setTimeout(() => {
    isSpinning = false;
  }, 4000);
}

spinButton.addEventListener("click", () => {
  setTimeout(() => {
    spinWheel();
  }, 500);

  setTimeout(() => {
    const target = selectedPrizeId ? `./index3.html?prizeId=${selectedPrizeId}` : "./index3.html";
    location.href = target;
  }, 8000);
});
