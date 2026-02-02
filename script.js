const envelope = document.querySelector('.envelope-wrapper');
const letter = document.querySelector('.letter');
const musica = document.getElementById('musica');
const heart = document.querySelector('.heart');

let musicaIniciada = false;

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
