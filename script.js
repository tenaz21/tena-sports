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
        const res = await fetch(API_URL, opciones);
        const data = await res.json();

        console.log(data);

        return data.response.live || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function cargarEnVivo() {
    const partidos = await obtenerDatos();

    const contenido = document.getElementById("contenido");

    if (!partidos.length) {
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
        "<h2>Próximamente disponible.</h2>";
}

async function cargarFinalizados() {
    document.getElementById("contenido").innerHTML =
        "<h2>Finalizados próximamente disponible.</h2>";
}

async function cargarPaises() {
    const partidos = await obtenerDatos();

    let ligas = [...new Set(partidos.map(p => p.leagueId))];

    document.getElementById("contenido").innerHTML =
        ligas.map(liga => `
            <div class="card">
                🏆 Liga ${liga}
            </div>
        `).join("");
}

cargarEnVivo();
