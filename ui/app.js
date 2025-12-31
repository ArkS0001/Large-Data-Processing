function* dataGenerator(total = 1_000_000) {
  for (let i = 1; i <= total; i++) {
    yield {
      id: `VH-${i}`,
      temperature: Math.random() * 120
    };
  }
}

const gen = dataGenerator();
let running = false;
let processed = 0;
let alerts = 0;

const processedEl = document.getElementById("processed");
const alertsEl = document.getElementById("alerts");
const statusEl = document.getElementById("status");
const logBox = document.getElementById("logBox");

function run() {
  if (!running) return;

  const { value, done } = gen.next();
  if (done) {
    statusEl.textContent = "Completed";
    return;
  }

  processed++;
  processedEl.textContent = processed;

  if (value.temperature > 100) {
    alerts++;
    alertsEl.textContent = alerts;
    log(`🚨 ALERT ${value.id} ${value.temperature.toFixed(1)}°C`);
  } else {
    log(`Processed ${value.id}`);
  }

  requestAnimationFrame(run);
}

function log(msg) {
  const div = document.createElement("div");
  div.className = "log";
  div.textContent = msg;
  logBox.prepend(div);

  if (logBox.children.length > 150) {
    logBox.removeChild(logBox.lastChild);
  }
}

document.getElementById("start").onclick = () => {
  running = true;
  statusEl.textContent = "Running";
  run();
};

document.getElementById("pause").onclick = () => {
  running = false;
  statusEl.textContent = "Paused";
};
