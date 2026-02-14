const envelope = document.querySelector('.envelope-wrapper');
const letter = document.querySelector('.letter');
const musica = document.getElementById('musica');
const heart = document.querySelector('.heart');

// 🌷 Amor
const amor = document.getElementById("amor");
const petalos = document.getElementById("petalos");

let musicaIniciada = false;
let cartaAbierta = false;
let amorIniciado = false;

// ⏳ Fecha inicio amor (25 julio 2025 7:09 PM)
const inicioAmor = new Date(2025, 6, 25, 19, 9);

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

// 🌸 Pétalos
function crearPetalos() {
    for (let i = 0; i < 25; i++) {
        const p = document.createElement("div");
        p.classList.add("petalo");
        p.style.left = Math.random() * 100 + "vw";
        p.style.animationDuration = 5 + Math.random() * 5 + "s";
        p.style.animationDelay = Math.random() * 5 + "s";
        petalos.appendChild(p);
    }
}

function iniciarAmor() {
    if (amorIniciado) return;

    amor.classList.remove("oculto");
    amor.classList.add("florecer");
    crearPetalos();

    amorIniciado = true;
}

// ❤️ Click en el corazón: música + abrir sobre
heart.addEventListener('click', (e) => {
    e.stopPropagation(); // evita conflictos

    // 🎵 Música
    if (!musicaIniciada) {
        musica.volume = 0.4;
        musica.play().then(() => {
            musicaIniciada = true;
        }).catch(() => {});
    }

    // ✉️ Abrir / cerrar sobre
    envelope.classList.toggle('flap');
});

document.addEventListener('click', (e) => {
    if (
        e.target.matches(".envelope") || 
        e.target.matches(".tap-right") || 
        e.target.matches(".tap-left")
    ) {
        envelope.classList.toggle('flap');

    } else if (e.target.matches(".envelope *")) {
        if (!letter.classList.contains('opened')) {
            letter.classList.add("letter-opening");

            setTimeout(() => {
                letter.classList.remove('letter-opening');
                letter.classList.add('opened');
                iniciarAmor();
            }, 500);

            envelope.classList.add("disable-envelope");
        } else {
            letter.classList.add('closing-letter');
            envelope.classList.remove("disable-envelope");
            letter.classList.remove('opened');

            setTimeout(() => {
                letter.classList.remove('closing-letter');
                letter.classList.remove('opened');
            }, 500);
        }
    }
});
