import { appConfig } from "../config.js";

export default function Agenda() {

    const screen = document.createElement("section");
    screen.className = "glass";

    screen.innerHTML = `

        <h2>¿Qué te gustaría hacer?</h2>

        <p>
            Elige una idea para dejar el plan perfecto para la sorpresa.
        </p>

        <form id="planForm" class="plan-form">

            <div class="form-grid">

                <div class="field-group">
                    <label for="date">Fecha</label>
                    <input id="date" name="date" type="date" required>
                </div>

                <div class="field-group">
                    <label for="time">Hora</label>
                    <input id="time" name="time" type="time" required>
                </div>

                <div class="field-group full-width">
                    <label for="planType">Tipo de plan</label>
                    <select id="planType" name="planType" required>
                        <option value="">Selecciona una opción</option>
                        <option value="Un café tranquilo">Un café tranquilo</option>
                        <option value="Algo relajante">Algo relajante</option>
                        <option value="Algo más activo">Algo más activo</option>
                        <option value="Algo sorpresa">Algo sorpresa</option>
                        <option value="Otra idea">Otra idea</option>
                    </select>
                </div>

                <div class="field-group full-width">
                    <label for="pickup">¿Dónde te gustaría que te recogiera?</label>
                    <input
                        id="pickup"
                        name="pickup"
                        type="text"
                        placeholder="Ej. En tu casa, cerca del centro, frente a la estación..."
                        required>
                </div>

                <div class="field-group full-width">
                    <label for="details">Detalles extras</label>
                    <textarea
                        id="details"
                        name="details"
                        rows="3"
                        placeholder="Ayúdame a hacer el plan más bonito...">
                    </textarea>
                </div>

            </div>

            <button type="submit" class="btn">Confirmar</button>

        </form>

        <p id="confirmationMessage" class="confirmation-message" aria-live="polite"></p>

    `;

    const form = screen.querySelector("#planForm");
    const message = screen.querySelector("#confirmationMessage");
    const dateInput = screen.querySelector("#date");
    const timeInput = screen.querySelector("#time");
    const pickupInput = screen.querySelector("#pickup");

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const formData = Object.fromEntries(new FormData(form).entries());
        const date = formData.date;
        const time = formData.time;
        const planType = formData.planType;
        const pickup = formData.pickup;
        const details = formData.details || "Sin detalles adicionales";

        const payload = {
            date,
            time,
            planType,
            pickup,
            details,
            createdAt: new Date().toISOString()
        };

        localStorage.setItem("sakuraPlan", JSON.stringify(payload));

        try {
            if (appConfig.googleScriptUrl) {
                await fetch(appConfig.googleScriptUrl, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });
            }
        } catch (error) {
            console.warn("No se pudo enviar al Apps Script, se guardó localmente.", error);
        }

        const mailBody = encodeURIComponent(
            `Hola Erick,\n\nTengo un nuevo plan para la sorpresa:\n\n- Fecha: ${date}\n- Hora: ${time}\n- Tipo de plan: ${planType}\n- Lugar de recogida: ${pickup}\n- Detalles: ${details}\n- Fecha de registro: ${new Date().toLocaleString()}\n`
        );

        const mailLink = `mailto:${appConfig.targetEmail}?subject=${encodeURIComponent("Nuevo plan para Proyecto Sakura")}&body=${mailBody}`;

        message.textContent = "¡Gracias! Será un día muy especial";

        setTimeout(() => {
            window.location.href = mailLink;
        }, 400);

    });

    return screen;

}