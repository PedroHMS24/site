// ---------- DADOS (edite aqui para personalizar) ----------
const START_YEAR = 2020; // últimos 6 anos: 2020 -> 2025/2026
const photos = [
  {
    year: "2020",
    age: "10 anos",
    text: "Onde a história começa a ganhar forma.",
    img: "photos/ano1.jpg",
  },
  {
    year: "2021",
    age: "11 anos",
    text: "Novas descobertas e amizades que permaneceram.",
    img: "photos/ano2.jpg",
  },
  {
    year: "2022",
    age: "12 anos",
    text: "Um ano de crescimento e de novas conquistas.",
    img: "photos/ano3.jpg",
  },
  {
    year: "2023",
    age: "13 anos",
    text: "Mais maturidade, mais objetivos, mais determinação.",
    img: "photos/ano4.jpg",
  },
  {
    year: "2024",
    age: "14 anos",
    text: "Confiança e identidade cada vez mais definidas.",
    img: "photos/ano5.jpg",
  },
  {
    year: "2025",
    age: "15 anos",
    text: "O último passo antes de um novo capítulo.",
    img: "photos/ano6.jpg",
  },
];

const achievements = [
  { title: "Superação", text: "Enfrentou cada desafio com resiliência e determinação." },
  { title: "Esporte", text: "Disciplina e dedicação dentro e fora de campo." },
  { title: "Estudos", text: "Comprometimento constante na construção do futuro." },
  { title: "Amizade", text: "Lealdade e presença em todos os momentos." },
  { title: "Caráter", text: "Integridade e respeito como marcas registradas." },
  { title: "Novos Objetivos", text: "Metas ambiciosas e a garra para alcançá-las." },
];

// ---------- ÁUDIO CINEMATOGRÁFICO (Web Audio API - sem arquivos) ----------
let audioCtx = null;
let soundOn = true;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// Bipe de contagem regressiva
function playBeep(freq = 440, duration = 0.15, type = "sine", vol = 0.2) {
  if (!audioCtx || !soundOn) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(vol, audioCtx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

// Acorde épico da revelação
function playFanfare() {
  if (!audioCtx || !soundOn) return;
  const notes = [261.63, 329.63, 392.0, 523.25]; // C E G C (dó maior)
  notes.forEach((f, i) => {
    setTimeout(() => playBeep(f, 1.2, "triangle", 0.18), i * 90);
  });
}

// Drone/atmosfera de fundo suave
let droneNodes = null;
function startDrone() {
  if (!audioCtx || !soundOn || droneNodes) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.value = 65;
  gain.gain.value = 0.05;
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  droneNodes = { osc, gain };
}
function stopDrone() {
  if (droneNodes) {
    try { droneNodes.osc.stop(); } catch (e) {}
    droneNodes = null;
  }
}

// ---------- ELEMENTOS ----------
const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const countdown = document.getElementById("countdown");
const countNumber = document.getElementById("countNumber");
const ringProgress = document.getElementById("ringProgress");
const reveal = document.getElementById("reveal");
const exploreBtn = document.getElementById("exploreBtn");
const content = document.getElementById("content");
const soundToggle = document.getElementById("soundToggle");
const replayBtn = document.getElementById("replayBtn");

const RING_LEN = 2 * Math.PI * 54; // circunferência

// ---------- CONTAGEM REGRESSIVA ----------
function runCountdown() {
  let n = 5;
  countNumber.textContent = n;
  countNumber.classList.add("pop");
  ringProgress.style.strokeDashoffset = 0;
  playBeep(500, 0.15, "sine", 0.25);

  const total = 5;
  const timer = setInterval(() => {
    n--;
    if (n <= 0) {
      clearInterval(timer);
      showReveal();
      return;
    }
    countNumber.textContent = n;
    countNumber.classList.remove("pop");
    void countNumber.offsetWidth; // reinicia animação
    countNumber.classList.add("pop");
    // anel diminui
    const offset = RING_LEN * ((total - n) / total);
    ringProgress.style.strokeDashoffset = offset;
    // último bipe mais agudo
    playBeep(n === 1 ? 800 : 500, 0.15, "sine", 0.25);
  }, 1000);
}

// ---------- TRANSIÇÕES ----------
function showReveal() {
  countdown.classList.add("hidden");
  reveal.classList.remove("hidden");
  playFanfare();
  startDrone();
}

function showContent() {
  reveal.classList.add("hidden");
  content.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  buildContent();
}

// ---------- CONSTRUÇÃO DO CONTEÚDO ----------
function buildContent() {
  const timeline = document.getElementById("timeline");
  if (timeline.dataset.built) return;
  timeline.dataset.built = "1";

  timeline.innerHTML = photos
    .map(
      (p) => `
      <div class="tl-item">
        <div class="tl-photo">
          <img src="${p.img}" alt="Renzo em ${p.year}" loading="lazy"
               onerror="this.parentElement.classList.add('no-img'); this.style.display='none';" />
        </div>
        <div class="tl-caption">
          <div class="tl-year">${p.year}</div>
          <div class="tl-age">${p.age}</div>
          <p class="tl-text">${p.text}</p>
        </div>
      </div>`
    )
    .join("");

  const ach = document.getElementById("achievements");
  ach.innerHTML = achievements
    .map(
      (a, i) => `
      <div class="ach-card">
        <span class="ach-num">${String(i + 1).padStart(2, "0")}</span>
        <span class="ach-rule"></span>
        <h3 class="ach-title">${a.title}</h3>
        <p class="ach-text">${a.text}</p>
      </div>`
    )
    .join("");

  setupScrollReveal();
}

// ---------- SCROLL REVEAL ----------
function setupScrollReveal() {
  const items = document.querySelectorAll(".tl-item, .ach-card");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  items.forEach((el) => obs.observe(el));
}

// ---------- EVENTOS ----------
startBtn.addEventListener("click", () => {
  initAudio();
  if (audioCtx.state === "suspended") audioCtx.resume();
  startScreen.classList.add("hidden");
  countdown.classList.remove("hidden");
  runCountdown();
});

exploreBtn.addEventListener("click", showContent);

soundToggle.addEventListener("click", () => {
  soundOn = !soundOn;
  soundToggle.classList.toggle("muted", !soundOn);
  soundToggle.querySelector(".sound-icon").textContent = soundOn ? "♪" : "✕";
  if (!soundOn) stopDrone();
  else { initAudio(); startDrone(); }
});

replayBtn.addEventListener("click", () => {
  content.classList.add("hidden");
  reveal.classList.add("hidden");
  countdown.classList.remove("hidden");
  window.scrollTo({ top: 0 });
  stopDrone();
  initAudio();
  if (audioCtx.state === "suspended") audioCtx.resume();
  runCountdown();
});
