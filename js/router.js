/* ==========================================================
   PROYECTO SAKURA
   ROUTER
========================================================== */

const screens = {};

/**
 * Registra una pantalla.
 * @param {string} name
 * @param {Function} render
 */
export function register(name, render) {
    screens[name] = render;
}

/**
 * Cambia de pantalla.
 * @param {string} name
 */
export function go(name) {

    const app = document.getElementById("app");

    if (!screens[name]) {
        console.error(`La pantalla "${name}" no existe.`);
        return;
    }

    /* Animación de salida */

    app.classList.remove("fade-in");
    app.classList.add("fade-out");

    setTimeout(() => {

        app.innerHTML = "";

        const screen = screens[name]();

        app.appendChild(screen);

        app.classList.remove("fade-out");
        app.classList.add("fade-in");

    }, 300);

}