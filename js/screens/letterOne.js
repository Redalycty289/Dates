import { typeWriter } from "../services/typewriter.js";
import { go } from "../router.js";
import { texts } from "../data/text.js";

export default function LetterOne(){

    const screen = document.createElement("section");
    screen.className = "glass";

    screen.innerHTML = `

        <h2>Por ello...</h2>

        <p id="message"></p>

        <div id="choices" class="choice-row" style="display:none;">

            <button id="yes" class="btn" type="button">Sí</button>
            <button id="no" class="btn btn-no" type="button">No</button>

        </div>

    `;

    const message = screen.querySelector("#message");
    const choiceRow = screen.querySelector("#choices");
    const yesButton = screen.querySelector("#yes");
    const noButton = screen.querySelector("#no");

    function moveNoButton(event) {
        const pointerX = event?.clientX ?? window.innerWidth / 2;
        const pointerY = event?.clientY ?? window.innerHeight / 2;
        const buttonWidth = noButton.offsetWidth || 120;
        const buttonHeight = noButton.offsetHeight || 52;
        const padding = 16;

        const maxX = Math.max(padding, window.innerWidth - buttonWidth - padding);
        const maxY = Math.max(padding, window.innerHeight - buttonHeight - padding);

        let offsetX = (Math.random() * 120) + 40;
        let offsetY = (Math.random() * 80) + 30;

        if (pointerX < window.innerWidth / 2) {
            offsetX *= -1;
        }

        if (pointerY < window.innerHeight / 2) {
            offsetY *= -1;
        }

        const nextLeft = Math.min(Math.max(padding, pointerX + offsetX), maxX);
        const nextTop = Math.min(Math.max(padding, pointerY + offsetY), maxY);

        noButton.style.position = "fixed";
        noButton.style.left = `${nextLeft}px`;
        noButton.style.top = `${nextTop}px`;
        noButton.style.zIndex = "2000";
        noButton.style.transform = "scale(0.96)";
    }

    async function start(){

        await typeWriter(
            message,
            texts.letterOne,
            25
        );

        choiceRow.style.display = "flex";
        choiceRow.classList.add("fade-in");

        noButton.addEventListener("mouseenter", moveNoButton);
        noButton.addEventListener("pointerenter", moveNoButton);
        noButton.addEventListener("mouseover", moveNoButton);
        noButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            moveNoButton(event);
        });

        document.addEventListener("pointermove", (event) => {
            const rect = noButton.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);

            if (distance < 180) {
                moveNoButton(event);
            }
        });

        yesButton.addEventListener("click", () => {
            go("agenda");
        });

    }

    start();

    return screen;
}