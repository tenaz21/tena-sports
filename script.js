const API_KEY = "46146fa668msh7fabe31efaaf8dep198920jsn3151b4847140";

const API_URL = "https://free-football-api-data.p.rapidapi.com/football-live-all-matches";

const opciones = {
    method: "GET",
    headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "free-football-api-data.p.rapidapi.com"
    }
};

async function obtenerDatos() {
    try {
        const res = await fetch(API_URL, opciones);
        const data = await res.json();

        console.log(data);

        return data.response?.live || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function cargarEnVivo() {
    const partidos = await obtenerDatos();

    const contenido = document.getElementById("contenido");

    if (partidos.length === 0) {
        contenido.innerHTML = "<h2>No hay partidos en vivo.</h2>";
        return;
    }

    contenido.innerHTML = partidos.map(partido => `
        <div class="card">
            <h2>${partido.home.name}</h2>
            <h2>${partido.away.name}</h2>

            <div class="score">
                ${partido.home.score} - ${partido.away.score}
            </div>

            <p>🏆 Liga ID: ${partido.leagueId}</p>
            <p>⏰ ${partido.time}</p>
        </div>
    `).join("");
}

async function cargarProximos() {
    document.getElementById("contenido").innerHTML =
        "<h2>No hay próximos partidos disponibles.</h2>";
}

async function cargarFinalizados() {
    document.getElementById("contenido").innerHTML =
        "<h2>No hay partidos finalizados disponibles.</h2>";
}

async function cargarPaises() {
    const partidos = await obtenerDatos();

    if (partidos.length === 0) {
        document.getElementById("contenido").innerHTML =
            "<h2>No hay países disponibles.</h2>";
        return;
    }

    let ligas = [...new Set(partidos.map(p => "Liga ID: " + p.leagueId))];

    document.getElementById("contenido").innerHTML =
        ligas.map(liga => `
            <div class="card">
                🏆 ${liga}
            </div>
        `).join("");
}

cargarEnVivo();
