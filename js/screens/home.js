export default function Home(){

    const screen = document.createElement("section");

    screen.className="glass";

    screen.innerHTML=`

        <h2>

            ¡Funciona!

        </h2>

        <p>

            El router ya está cambiando pantallas correctamente.

        </p>

    `;

    return screen;

}