/* ==========================================================
   PROYECTO SAKURA
   TYPEWRITER PRO
========================================================== */

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function typeWriter(element, text, baseSpeed = 35) {

    element.innerHTML = '<span class="cursor"></span>';

    const cursor = () => element.querySelector(".cursor");

    for (let i = 0; i < text.length; i++) {

        const char = text[i];

        // Insertar carácter antes del cursor
        cursor().insertAdjacentText("beforebegin", char);

        // Velocidad variable (simula escritura humana)
        let speed = baseSpeed + Math.random() * 20;

        // Pausas inteligentes
        if (char === ",") speed += 180;

        if (char === ".") speed += 300;

        if (char === "\n") speed += 250;

        await sleep(speed);
    }
}