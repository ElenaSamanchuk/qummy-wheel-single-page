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

function createConfetti() {
  const colors = ["#10B981", "#34D399", "#6EE7B7", "#A7F3D0", "#FBBF24", "#F59E0B"];
  const confettiContainer = document.getElementById("prize");
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "absolute";
    confetti.style.width = "12px";
    confetti.style.height = "12px";
    confetti.style.borderRadius = "2px";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = "-12px";
    confetti.style.pointerEvents = "none";
    confetti.style.animation = `confettiFall ${3 + Math.random() * 2}s ease-out ${Math.random() * 2}s forwards`;
    confettiContainer.appendChild(confetti);
    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.parentNode.removeChild(confetti);
      }
    }, 5000);
  }
}

function getBadgeSrc(probability) {
  if (probability === "База") return "./img/one.webp";
  if (probability === "Редкость") return "./img/two.webp";
  if (probability === "Эпик") return "./img/three.webp";
  if (probability === "Легенда") return "./img/four.webp";
  return "./img/one.webp";
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

document.addEventListener("DOMContentLoaded", () => {
  createConfetti();

  const params = new URLSearchParams(window.location.search);
  const prizeId = Number(params.get("prizeId"));
  const prize = prizes.find((item) => item.id === prizeId) || prizes[5];

  document.querySelector("h2").innerHTML = `Ваше бесплатное блюдо: <br> ${prize.name}`;
  document.querySelector(".food").src = prize.image;
  document.querySelector(".badges").src = getBadgeSrc(prize.probability);
});
