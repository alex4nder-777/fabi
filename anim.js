/* ================= AUDIO ================= */
const audio = document.getElementById("musica");
const lyrics = document.getElementById("lyrics");
const heart = document.querySelector(".heart");
const envelope = document.querySelector(".envelope-wrapper");
const letter = document.querySelector(".letter");
const flowers = document.querySelector(".flowers");
const petalosContainer = document.getElementById("petalos");

let musicaIniciada = false;



setInterval(updateLyrics, 500);
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
