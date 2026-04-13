const API_KEY = "46146fa668msh7fabe31efaaf8dep198920jsn3151b4847140";

/* =========================
   API EN VIVO
========================= */
const LIVE_URL =
  "https://free-football-api-data.p.rapidapi.com/football-current-live";

/* =========================
   API HIGHLIGHTS
========================= */
const HIGHLIGHTS_URL =
  "https://free-football-soccer-videos.p.rapidapi.com/";



/* =========================
   CARGAR EN VIVO
========================= */
async function cargarEnVivo() {
  const contenido = document.getElementById("contenido");

  contenido.innerHTML = "<h2>Cargando partidos en vivo...</h2>";

  try {
    const response = await fetch(LIVE_URL, {
      method: "GET",
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "free-football-api-data.p.rapidapi.com"
      }
    });

    const data = await response.json();

    contenido.innerHTML = "";

    if (!data.response?.live?.length) {
      contenido.innerHTML = "<h2>No hay partidos en vivo.</h2>";
      return;
    }

    data.response.live.forEach(partido => {
      contenido.innerHTML += `
        <div class="card">
          <h2>${partido.home.name} vs ${partido.away.name}</h2>

          <div class="score">
            ${partido.home.score} - ${partido.away.score}
          </div>

          <p>⏰ ${partido.time}</p>
          <p>🏆 Liga ${partido.leagueId}</p>
        </div>
      `;
    });

  } catch (error) {
    contenido.innerHTML = "<h2>Error cargando partidos en vivo.</h2>";
    console.error(error);
  }
}



/* =========================
   HIGHLIGHTS
========================= */
async function loadHighlights() {
  const contenido = document.getElementById("contenido");

  contenido.innerHTML = "<h2>Cargando highlights...</h2>";

  try {
    const response = await fetch(HIGHLIGHTS_URL, {
      method: "GET",
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "free-football-soccer-videos.p.rapidapi.com"
      }
    });

    const data = await response.json();

    contenido.innerHTML = "";

    data.slice(0, 10).forEach(match => {
      contenido.innerHTML += `
        <div class="card">
          <h2>${match.title}</h2>

          <img src="${match.thumbnail}" alt="thumbnail">

          ${match.videos[0].embed}
        </div>
      `;
    });

  } catch (error) {
    contenido.innerHTML = "<h2>Error cargando highlights.</h2>";
    console.error(error);
  }
}



/* =========================
   PROXIMOS
========================= */
function cargarProximos() {
  document.getElementById("contenido").innerHTML = `
    <div class="card">
      <h2>📅 Próximamente</h2>
      <p>Próximamente conectaremos API de próximos partidos.</p>
    </div>
  `;
}



/* =========================
   FINALIZADOS
========================= */
function cargarFinalizados() {
  document.getElementById("contenido").innerHTML = `
    <div class="card">
      <h2>✅ Finalizados</h2>
      <p>Próximamente conectaremos API de partidos finalizados.</p>
    </div>
  `;
}



/* =========================
   PAISES
========================= */
function cargarPaises() {
  document.getElementById("contenido").innerHTML = `
    <div class="card">
      <h2>🌎 Países disponibles</h2>
      <p>España</p>
      <p>Inglaterra</p>
      <p>Italia</p>
      <p>Alemania</p>
      <p>Francia</p>
    </div>
  `;
}



/* =========================
   AUTO LOAD
========================= */
window.onload = cargarEnVivo;
