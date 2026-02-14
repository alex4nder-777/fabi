const envelope = document.querySelector('.envelope-wrapper');
const letter = document.querySelector('.letter');
const musica = document.getElementById('musica');
const heart = document.querySelector('.heart');

// 🌷 Florecer al abrir la carta
const amor = document.getElementById("amor");
const petalos = document.getElementById("petalos");

function iniciarAmor() {
    amor.classList.remove("oculto");
    amor.classList.add("florecer");
    crearPetalos();
}

// ⏳ Contador desde 25 de julio 7:09 PM
const inicioAmor = new Date(2025, 6, 25, 19, 9); // Mes 6 = julio (empieza en 0)

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

// 🌸 Crear pétalos flotando
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

let musicaIniciada = false;

// Función central para intentar reproducir la música
function tryPlayMusic() {
    if (musicaIniciada) return;

    // Intentamos cargar antes (algunos navegadores necesitan esto)
    try {
        musica.load();
    } catch (err) {
        // no fatal, pero lo logueamos
        console.warn("audio.load() fallo:", err);
    }

    musica.volume = 0.4;

    const playPromise = musica.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                musicaIniciada = true;
                console.log("Reproduciendo musica correctamente");
            })
            .catch((err) => {
                // Esto es importante: el navegador puede rechazar por autoplay policies.
                console.warn("Play rechazado/capturado:", err);
            });
    } else {
        // En navegadores antiguos donde play no devuelve promesa
        musicaIniciada = true;
    }
}

// ❤️ Click / touch en el corazón: música + abrir sobre
function onHeartActivate(e) {
    // Evitamos doble evento (pointer -> click) propagando
    e.stopPropagation();
    tryPlayMusic();

    // Toggle del sobre (abrir/cerrar)
    envelope.classList.toggle('flap');
}

// Escuchamos varios eventos que cubren la mayoría de dispositivos
heart.addEventListener('pointerdown', onHeartActivate);
heart.addEventListener('click', onHeartActivate);
// Fallback para navegadores que no implementan pointer events correctamente
heart.addEventListener('touchstart', onHeartActivate);

// Si preferís evitar que tanto pointerdown como click llamen dos veces
// podés desactivar alguno, pero como usamos bandera musicaIniciada no causa problema.

// ----- manejo del resto de interacciones -----
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
