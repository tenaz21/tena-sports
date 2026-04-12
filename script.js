const API_KEY = "46146fa668msh7fabe31efaaf8dep198920jsn3151b4847140";

const API_URL = "https://free-football-api-data.p.rapidapi.com/football-live-all";

const opciones = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'free-football-api-data.p.rapidapi.com'
    }
};

async function obtenerDatos() {
    try {
        const res = await fetch(API_URL, opciones);
        const data = await res.json();
        return data.response.live;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function cargarEnVivo() {
    const partidos = await obtenerDatos();
    mostrarPartidos(partidos);
}

async function cargarProximos() {
    const partidos = await obtenerDatos();

    const proximos = partidos.filter(p => p.status.finished === false);

    mostrarPartidos(proximos);
}

async function cargarFinalizados() {
    const partidos = await obtenerDatos();

    const finalizados = partidos.filter(p => p.status.finished === true);

    mostrarPartidos(finalizados);
}

async function cargarPaises() {
    const partidos = await obtenerDatos();

    let ligas = [...new Set(partidos.map(p => "Liga ID: " + p.leagueId))];

    document.getElementById("contenido").innerHTML =
        ligas.map(liga => `
            <div class="card">
                🏆 ${liga}
            </div>
        `).join('');
}

function mostrarPartidos(partidos) {
    const contenido = document.getElementById("contenido");

    if (!partidos.length) {
        contenido.innerHTML = "<h2>No hay partidos disponibles.</h2>";
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
    `).join('');
}

cargarEnVivo();
