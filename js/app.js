import { register, go } from "./router.js";

import Loader from "./screens/loader.js";
import Home from "./screens/home.js";
import LetterOne from "./screens/letterOne.js";
import Agenda from "./screens/agenda.js";

const introSlides = [
    {
        name: "intro-1",
        align: "center",
        title: "Aveces necesitamos algo relajante para despejar la mente y el corazón.",
        text: "sobre todo nosotros que estamos sobreexplotadísimos"
    },
    {
        name: "intro-2",
        align: "center",
        title: "no con una razón necesariamente, solo con una buena excusa jsjs",
        text: " "
    },
    {
        name: "intro-3",
        align: "center",
        title: "Yyyy creo que la mejor paz viene acompañada de una buena sonrisa :D",
        text: ""
    },
    {
        name: "intro-4",
        align: "center",
        title: "Así que pensé ofrecerte una",
        text: ""
    },
    {
        name: "intro-5",
        align: "center",
        title: "o varias, si me das la oportunidad :3",
        text: " "
    }
];

/* Registrar pantallas */

register("loader", Loader);
register("home", Home);
register("letterOne", LetterOne);
register("agenda", Agenda);

introSlides.forEach(({ name, title, text }, index) => {
    register(name, () => {
        const screen = document.createElement("section");
        screen.className = `glass intro-slide intro-slide-${index + 1}`;

        screen.innerHTML = `
            <h2>${title}</h2>
            <p>${text}</p>
        `;

        return screen;
    });
});

function playIntroSequence(index = 0) {
    if (index < introSlides.length) {
        go(introSlides[index].name);
        setTimeout(() => playIntroSequence(index + 1), 7000);
        return;
    }

    go("letterOne");
}

/* Mostrar loader */

go("loader");

/* Secuencia: loader -> slides lorem -> carta */

setTimeout(() => {
    playIntroSequence();
}, 2200);

/* Tema oscuro */

const themeButton = document.getElementById("themeButton");
const themeIcon = themeButton?.querySelector("i");

function applyTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
    const icon = theme === "dark" ? "fa-sun" : "fa-moon";
    themeIcon?.classList.remove("fa-moon", "fa-sun");
    themeIcon?.classList.add(icon);
    localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme") ?? "dark";
applyTheme(savedTheme === "dark" ? "dark" : "light");

themeButton?.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    applyTheme(isDark ? "light" : "dark");
});

/* Efectos visuales decorativos */

const petalsLayer = document.getElementById("petals");
const cursorPetal = document.getElementById("cursor");

function createPetals() {
    if (!petalsLayer) return;

    petalsLayer.innerHTML = "";

    const petalCount = 24;

    for (let i = 0; i < petalCount; i += 1) {
        const petal = document.createElement("span");
        petal.className = "petal";

        const size = 8 + Math.random() * 14;
        const delay = Math.random() * 8;
        const duration = 8 + Math.random() * 6;
        const drift = -120 + Math.random() * 240;

        petal.style.left = `${Math.random() * 100}%`;
        petal.style.top = `${-8 - Math.random() * 20}%`;
        petal.style.width = `${size}px`;
        petal.style.height = `${size * 0.8}px`;
        petal.style.setProperty("--delay", `${delay}s`);
        petal.style.setProperty("--duration", `${duration}s`);
        petal.style.setProperty("--drift", `${drift}px`);
        petal.style.opacity = `${0.35 + Math.random() * 0.55}`;

        petalsLayer.appendChild(petal);
    }
}

function initCursorEffect() {
    if (!cursorPetal) return;

    window.addEventListener("pointermove", (event) => {
        cursorPetal.style.left = `${event.clientX}px`;
        cursorPetal.style.top = `${event.clientY}px`;
    });

    window.addEventListener("pointerdown", () => {
        cursorPetal.classList.add("active");
    });

    window.addEventListener("pointerup", () => {
        cursorPetal.classList.remove("active");
    });
}

createPetals();
initCursorEffect();