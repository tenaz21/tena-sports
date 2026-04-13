const API_KEY = "46146fa668msh7fabe31efaaf8dep198920jsn3151b4847140";

const API_URL = "https://free-football-api-data.p.rapidapi.com/football-current-live";

const opciones = {
    method: "GET",
    headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "free-football-api-data.p.rapidapi.com",
        "Content-Type": "application/json"
    }
};

async function obtenerDatos() {
    try {
        const respuesta = await fetch(API_URL, opciones);
        const data = await respuesta.json();

        console.log("DATOS API:", data);

        if (
            data &&
            data.response &&
            data.response.live &&
            Array.isArray(data.response.live)
        ) {
            return data.response.live;
        }

        return [];

    } catch (error) {
        console.error("ERROR API:", error);
        return [];
    }
}

async function cargarEnVivo() {
    const contenido = document.getElementById("contenido");

    contenido.innerHTML = "<h2>Cargando...</h2>";

    const partidos = await obtenerDatos();

    if (partidos.length === 0) {
        contenido.innerHTML = "<h2>No hay partidos en vivo.</h2>";
        return;
    }

    contenido.innerHTML = "";

    partidos.forEach(partido => {
        contenido.innerHTML += `
            <div class="card">
                <h2>${partido.home.name}</h2>
                <h2>${partido.away.name}</h2>

                <div class="score">
                    ${partido.home.score} - ${partido.away.score}
                </div>

                <p>🏆 Liga ID: ${partido.leagueId}</p>
                <p>⏰ ${partido.time}</p>
            </div>
        `;
    });
}

function cargarProximos() {
    document.getElementById("contenido").innerHTML =
        "<h2>Próximamente disponible.</h2>";
}

function cargarFinalizados() {
    document.getElementById("contenido").innerHTML =
        "<h2>Finalizados próximamente.</h2>";
}

async function cargarPaises() {
    const partidos = await obtenerDatos();

    let ligas = [...new Set(partidos.map(p => p.leagueId))];

    document.getElementById("contenido").innerHTML =
        ligas.map(liga => `
            <div class="card">🏆 Liga ${liga}</div>
        `).join("");
}

/* NUEVA FUNCION HIGHLIGHTS */

async function loadHighlights() {
    const contenido = document.getElementById("contenido");

    contenido.innerHTML = "<h2>Cargando highlights...</h2>";

    try {
        const response = await fetch("https://free-football-soccer-videos1.p.rapidapi.com/v1/", {
            method: "GET",
            headers: {
                "x-rapidapi-key": API_KEY,
                "x-rapidapi-host": "free-football-soccer-videos1.p.rapidapi.com"
            }
        });

        const data = await response.json();

        console.log("VIDEOS:", data);

        contenido.innerHTML = "";

        data.response.forEach(video => {
            contenido.innerHTML += `
                <div class="card">
                    <h2>${video.title}</h2>

                    <img src="${video.thumbnail}" width="100%">

                    <br><br>

                    <a href="${video.matchviewUrl}" target="_blank">
                        ▶ Ver Highlight
                    </a>
                </div>
            `;
        });

    } catch (error) {
        console.error(error);

        contenido.innerHTML =
            "<h2>Error cargando highlights.</h2>";
    }
}

window.onload = cargarEnVivo;
