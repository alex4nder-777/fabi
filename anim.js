/* ================= AUDIO ================= */
const audio = document.getElementById("musica");
const lyrics = document.getElementById("lyrics");
const heart = document.querySelector(".heart");
const envelope = document.querySelector(".envelope-wrapper");
const letter = document.querySelector(".letter");
const flowers = document.querySelector(".flowers");
const petalosContainer = document.getElementById("petalos");

let musicaIniciada = false;



function updateLyrics() {
  const time = Math.floor(audio.currentTime);
  const currentLine = lyricsData.find(
    line => time >= line.time && time < line.time + 5
  );

  if (currentLine) {
    lyrics.style.opacity = 1;
    lyrics.textContent = currentLine.text;
  } else {
    lyrics.style.opacity = 0;
    lyrics.textContent = "";
  }
}

setInterval(updateLyrics, 500);

/* ================= CONTADOR ================= */
const contador = document.getElementById("contador");
const inicioAmor = new Date("2023-07-25T19:09:00");

function actualizarContador() {
  const ahora = new Date();
  const diff = ahora - inicioAmor;

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);

  contador.textContent =
    `Nuestro amor germinó hace ${dias} días, ${horas} horas y ${minutos} minutos 🌱💖`;
}

setInterval(actualizarContador, 1000);
actualizarContador();

/* ================= PETALOS ================= */
function crearPetalo() {
  const petalo = document.createElement("div");
  petalo.classList.add("petalo");

  petalo.style.left = Math.random() * 100 + "vw";
  petalo.style.animationDuration = 6 + Math.random() * 6 + "s";
  petalo.style.opacity = Math.random();

  petalosContainer.appendChild(petalo);

  setTimeout(() => petalo.remove(), 12000);
}

function iniciarPetalos() {
  setInterval(crearPetalo, 300);
}

/* ================= INTERACCION CORAZON ================= */
heart.addEventListener("click", () => {
  envelope.classList.toggle("flap");

  if (!musicaIniciada) {
    audio.play().catch(() => {});
    musicaIniciada = true;

    flowers.classList.add("active"); // 🌷 florece
    iniciarPetalos();                // 🌸 caen pétalos
  }

  if (!letter.classList.contains("opened")) {
    letter.classList.add("letter-opening");

    setTimeout(() => {
      letter.classList.remove("letter-opening");
      letter.classList.add("opened");
    }, 500);
  }
});

/* ================= TITULO ================= */
setTimeout(() => {
  const titulo = document.querySelector(".titulo");
  if (titulo) {
    titulo.style.animation = "fadeOut 3s forwards";
    setTimeout(() => (titulo.style.display = "none"), 3000);
  }
}, 216000);
