import { go } from "../router.js";

const montageImages = Array.from(
    { length: 20 },
    (_, index) => `assets/drawing-${String(index + 1).padStart(2, "0")}.png`
);

export default function Montage() {
    const screen = document.createElement("section");
    screen.className = "montage-screen";

    screen.innerHTML = `
        <div class="montage-intro">
            <p>Un pequeño recorrido hecho con mucho cariño.</p>
        </div>

        <div class="montage-gallery" aria-label="Galería de dibujos"></div>

        <p class="montage-empty" hidden>
            Añade tus imágenes a la carpeta assets para ver el montaje.
        </p>

        <h2 class="montage-finale">para ti :D</h2>
    `;

    const gallery = screen.querySelector(".montage-gallery");
    const emptyMessage = screen.querySelector(".montage-empty");
    const finale = screen.querySelector(".montage-finale");
    let loadedImages = 0;

    montageImages.forEach((imagePath) => {
        const image = new Image();
        image.className = "montage-image";
        image.alt = "Dibujo especial";
        image.src = imagePath;

        image.addEventListener("load", () => {
            gallery.appendChild(image);
            loadedImages += 1;
        });
    });

    function scrollSlowly() {
        let lastTimestamp = null;
        let animationId;

        function step(timestamp) {
            if (lastTimestamp === null) {
                lastTimestamp = timestamp;
            }

            const elapsed = timestamp - lastTimestamp;
            lastTimestamp = timestamp;
            window.scrollBy(0, elapsed * 0.035);

            const reachedBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;

            if (reachedBottom) {
                cancelAnimationFrame(animationId);
                finale.classList.add("montage-finale-visible");
                return;
            }

            animationId = requestAnimationFrame(step);
        }

        animationId = requestAnimationFrame(step);
    }

    window.scrollTo({ top: 0, behavior: "instant" });

    setTimeout(() => {
        if (loadedImages === 0) {
            emptyMessage.hidden = false;
        }
        scrollSlowly();
    }, 700);

    return screen;
}
