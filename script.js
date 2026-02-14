const envelope = document.querySelector('.envelope-wrapper');
const letter = document.querySelector('.letter');
const musica = document.getElementById('musica');
const heart = document.querySelector('.heart');

const amor = document.getElementById("amor");
const petalosContainer = document.getElementById("petalos");

let musicaIniciada = false;
let cartaAbierta = false;
let petalosIniciados = false;

/* ================= CONTADOR ================= */

const inicioAmor = new Date(2023, 6, 25, 19, 9);

function actualizarTiempo() {
    const ahora = new Date();
    let diff = ahora - inicioAmor;

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff %= (1000 * 60 * 60 * 24);
    const horas = Math.floor(diff / (1000 * 60 * 60));
    diff %= (1000 * 60 * 60);
    const minutos = Math.floor(diff / (1000 * 60));

    document.getElementById("tiempo").textContent =
        `${dias} días, ${horas} horas y ${minutos} minutos`;
}

setInterval(actualizarTiempo, 60000);
actualizarTiempo();

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
  if (petalosIniciados) return;
  petalosIniciados = true;
  setInterval(crearPetalo, 300);
}

/* ================= INICIAR AMOR ================= */

function iniciarAmor() {
    amor.classList.remove("oculto");
    amor.classList.add("florecer");
    iniciarPetalos();
}

/* ================= CORAZON ================= */

heart.addEventListener("click", (e) => {
    e.stopPropagation();

    // Abrir sobre
    envelope.classList.add("flap");

    // Música solo una vez
    if (!musicaIniciada) {
        musica.volume = 0.4;
        musica.play().catch(() => {});
        musicaIniciada = true;
    }

    // Si la carta no está abierta → abrirla
    if (!cartaAbierta) {
        letter.classList.add("letter-opening");

        setTimeout(() => {
            letter.classList.remove("letter-opening");
            letter.classList.add("opened");
        }, 500);

        iniciarAmor();
        cartaAbierta = true;
    }
});

/* ================= SOBRE ================= */

document.querySelector('.envelope').addEventListener("click", (e) => {
    e.stopPropagation();

    if (!envelope.classList.contains("flap")) return;

    if (!cartaAbierta) {
        letter.classList.add("letter-opening");

        setTimeout(() => {
            letter.classList.remove("letter-opening");
            letter.classList.add("opened");
        }, 500);

        iniciarAmor();
        cartaAbierta = true;

    } else {
        letter.classList.add("closing-letter");

        setTimeout(() => {
            letter.classList.remove("closing-letter");
            letter.classList.remove("opened");
        }, 500);

        cartaAbierta = false;
    }
});
