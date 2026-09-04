import { typeWriter } from "../services/typewriter.js";
import { go } from "../router.js";
import { texts } from "../data/text.js";

export default function LetterOne(){

    const screen = document.createElement("section");
    screen.className = "glass";

    screen.innerHTML = `

        <h2>Por ello...</h2>

        <p id="message"></p>

        <img
            id="noImage"
            class="no-image"
            src="assets/no-1.png"
            alt="Ilustración decorativa">

        <div id="choices" class="choice-row" style="display:none;">

            <button id="yes" class="btn" type="button">Sí</button>
            <button id="no" class="btn btn-no" type="button">No</button>

        </div>

    `;

    const message = screen.querySelector("#message");
    const choiceRow = screen.querySelector("#choices");
    const yesButton = screen.querySelector("#yes");
    const noButton = screen.querySelector("#no");
    const noImage = screen.querySelector("#noImage");
    const noImages = [
        "assets/no-1.png",
        "assets/no-2.png",
        "assets/no-3.png",
        "assets/no-4.png",
        "assets/no-5.png"
    ];
    let noImageIndex = 0;

    async function start(){

        await typeWriter(
            message,
            texts.letterOne,
            25
        );

        choiceRow.style.display = "flex";
        choiceRow.classList.add("fade-in");

        noButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (noImageIndex < noImages.length - 1) {
                noImageIndex += 1;
                noImage.src = noImages[noImageIndex];
                noImage.classList.remove("image-change");
                void noImage.offsetWidth;
                noImage.classList.add("image-change");
            }
        });

        yesButton.addEventListener("click", () => {
            go("agenda");
        });

    }

    start();

    return screen;
}