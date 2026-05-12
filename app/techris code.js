const prices = {
  "Screen Repair": 120,
  "Battery Replacement": 80,
  "Charging Port Repair": 90,
  "Smart Home Setup": 150
};

let jobs = [];

/* CUSTOMER REQUEST */

function createServiceRequest() {

  const name =
    document.getElementById("customer-name").value;

  const service =
    document.getElementById("service-type").value;

  const address =
    document.getElementById("customer-address").value;

  const notes =
    document.getElementById("customer-notes").value;

  const result =
    document.getElementById("customer-result");

  if (!name || !service || !address) {

    result.innerHTML =
      "Please complete all required fields.";

    return;
  }

  const price = prices[service];

  const job = {
    name,
    service,
    address,
    notes,
    price
  };

  jobs.push(job);

  result.innerHTML = `
    <div class="job-card">
      <strong>Request Submitted</strong><br><br>

      Service: ${service}<br>
      Estimated Price: $${price}<br>
      Status: Technician Pending
    </div>
  `;

  renderWorkerJobs();
  updateOwnerDashboard();
}

/* WORKER DASHBOARD */

function renderWorkerJobs() {

  const list =
    document.getElementById("worker-job-list");

  if (!jobs.length) {

    list.innerHTML =
      "No active jobs.";

    return;
  }

  list.innerHTML = jobs.map(job => `
    <div class="job-card">

      <strong>${job.service}</strong><br><br>

      Customer: ${job.name}<br>
      Address: ${job.address}<br>
      Price: $${job.price}<br><br>

      Notes: ${job.notes}

    </div>
  `).join("");
}

/* OWNER DASHBOARD */

function unlockOwnerDashboard() {

  const pin =
    document.getElementById("owner-pin").value;

  if (pin === "2423") {

    document
      .getElementById("owner-dashboard")
      .classList.remove("hidden");

    updateOwnerDashboard();

  } else {

    alert("Incorrect PIN");
  }
}

function updateOwnerDashboard() {

  const total =
    jobs.reduce((sum, job) => sum + job.price, 0);

  const tax = total * 0.25;

  const operating = total - tax;

  document.getElementById("total-paid")
    .textContent = `$${total}`;

  document.getElementById("tax-holdback")
    .textContent = `$${tax}`;

  document.getElementById("operating-cash")
    .textContent = `$${operating}`;
}

/* MATRIX BACKGROUND */

const canvas =
  document.getElementById("matrix-bg");

const ctx =
  canvas.getContext("2d");

function resizeCanvas() {

  canvas.width =
    window.innerWidth;

  canvas.height =
    window.innerHeight;
}

resizeCanvas();

const letters =
  "TECHRISMOBILE010101";

const fontSize = 16;

let columns =
  canvas.width / fontSize;

let drops =
  Array(Math.floor(columns)).fill(1);

function drawMatrix() {

  ctx.fillStyle =
    "rgba(2,6,23,0.08)";

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  ctx.fillStyle = "#00ff88";

  ctx.font =
    `${fontSize}px monospace`;

  drops.forEach((y, i) => {

    const text =
      letters[Math.floor(Math.random() * letters.length)];

    const x = i * fontSize;

    ctx.fillText(
      text,
      x,
      y * fontSize
    );

    if (
      y * fontSize > canvas.height &&
      Math.random() > 0.975
    ) {

      drops[i] = 0;
    }

    drops[i]++;
  });
}

setInterval(drawMatrix, 50);

window.addEventListener("resize", () => {

  resizeCanvas();

  columns =
    canvas.width / fontSize;

  drops =
    Array(Math.floor(columns)).fill(1);
});