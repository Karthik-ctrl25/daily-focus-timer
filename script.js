let timer, timeLeft, totalTime;
const timeSelect = document.getElementById("timeSelect");
const timerDisplay = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const toastEl = document.getElementById("successToast");
const toast = new bootstrap.Toast(toastEl);

const quotes = [
  "Small focus beats big dreams.",
  "Consistency creates results.",
  "Discipline is freedom.",
  "One task. One win.",
  "Progress over perfection."
];

for (let i = 1; i <= 120; i++) {
  const o = document.createElement("option");
  o.value = i;
  o.textContent = `${i} Minutes`;
  timeSelect.appendChild(o);
}

timeSelect.value = 30;
resetTimer();

document.querySelectorAll("input[name='taskPreset']").forEach(r =>
  r.onchange = () => taskInput.value = r.value
);

startBtn.onclick = () => {
  totalTime = timeLeft;
  startBtn.classList.add("d-none");
  pauseBtn.classList.remove("d-none");
  resetBtn.classList.remove("d-none");

  timer = setInterval(() => {
    timeLeft--;
    updateUI();
    if (timeLeft <= 0) finish();
  }, 1000);
};

pauseBtn.onclick = () => {
  clearInterval(timer);
  startBtn.classList.remove("d-none");
};

resetBtn.onclick = resetTimer;

timeSelect.onchange = resetTimer;

function resetTimer() {
  clearInterval(timer);
  timeLeft = timeSelect.value * 60;
  updateUI();
  startBtn.classList.remove("d-none");
  pauseBtn.classList.add("d-none");
  resetBtn.classList.add("d-none");
}

function updateUI() {
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  timerDisplay.textContent = `${m}:${s < 10 ? "0" : ""}${s}`;
  progressBar.style.width = `${100 - (timeLeft / totalTime) * 100}%`;
}

function finish() {
  clearInterval(timer);
  saveTask();
  toastEl.querySelector(".toast-body").textContent = "Task completed successfully!";
  toast.show();

  const box = document.getElementById("celebrate");
  box.classList.remove("d-none");
  document.getElementById("quote").textContent =
    quotes[Math.floor(Math.random() * quotes.length)];

  setTimeout(() => box.classList.add("d-none"), 3500);
  resetTimer();
}

function saveTask() {
  const task = taskInput.value.trim();
  if (!task) return;
  const logs = JSON.parse(localStorage.getItem("focusLogs")) || [];
  logs.push(task);
  localStorage.setItem("focusLogs", JSON.stringify(logs));
  renderLogs();
  taskInput.value = "";
}

function renderLogs() {
  logList.innerHTML = "";
  (JSON.parse(localStorage.getItem("focusLogs")) || []).forEach(t => {
    const li = document.createElement("li");
    li.textContent = `✔ ${t}`;
    logList.appendChild(li);
  });
}
const todayDate = document.getElementById("todayDate");
todayDate.textContent = new Date().toLocaleDateString("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric"
});

renderLogs();
