import { go } from "../router.js";

const MONTAGE_PASSWORD = "aduckinlove";

export default function Password() {
    const screen = document.createElement("section");
    screen.className = "glass password-screen";

    screen.innerHTML = `
        <h2>Una última sorpresa</h2>
        <p>Escribe la contraseña para continuar.</p>

        <form id="passwordForm" class="password-form">
            <label for="montagePassword">Contraseña</label>
            <input
                id="montagePassword"
                name="password"
                type="password"
                autocomplete="off"
                required>
            <button class="btn" type="submit">Continuar</button>
        </form>

        <p id="passwordMessage" class="confirmation-message" aria-live="polite"></p>
    `;

    const form = screen.querySelector("#passwordForm");
    const passwordInput = screen.querySelector("#montagePassword");
    const message = screen.querySelector("#passwordMessage");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (passwordInput.value === MONTAGE_PASSWORD) {
            go("montage");
            return;
        }

        message.textContent = "Esa no es la contraseña.";
        passwordInput.value = "";
        passwordInput.focus();
    });

    return screen;
}
