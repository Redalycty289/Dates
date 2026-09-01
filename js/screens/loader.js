export default function Loader() {

    const screen = document.createElement("section");

    screen.className = "glass";

    screen.innerHTML = `

        <h1>👾</h1>

        <h2>

            Preparando algo para ti :3...

        </h2>

        <p>

            un momento...

        </p>

        <div class="progress">

            <div id="progressBar"></div>

        </div>

    `;

    return screen;

}