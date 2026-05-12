const prices = {
  screen: "$120+",
  battery: "$80+",
  charging: "$90+",
  diagnostic: "$40",
  wifi: "$100+",
  camera: "$150+",
  "smart-home": "$300+"
};

const serviceSelect = document.getElementById("service-select");
const priceDisplay = document.getElementById("price-display");

serviceSelect.addEventListener("change", () => {
  const selected = serviceSelect.value;

  if (prices[selected]) {
    priceDisplay.textContent = `Estimated Price: ${prices[selected]}`;
  } else {
    priceDisplay.textContent = "Your estimate will appear here.";
  }
});

const canvas = document.getElementById("matrix-bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

const letters = "TECHRISMOBILE010101";
const fontSize = 16;

let columns = canvas.width / fontSize;
let drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(2, 6, 23, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff88";
  ctx.font = `${fontSize}px monospace`;

  drops.forEach((y, i) => {
    const text = letters[Math.floor(Math.random() * letters.length)];
    const x = i * fontSize;

    ctx.fillText(text, x, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  });
}

setInterval(drawMatrix, 50);

window.addEventListener("resize", () => {
  resizeCanvas();
  columns = canvas.width / fontSize;
  drops = Array(Math.floor(columns)).fill(1);
});