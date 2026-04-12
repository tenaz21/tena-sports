const API_KEY = "3cc8bf02536b52d0ecc667afdfd2859c";
const BASE_URL = "https://v3.football.api-sports.io";

const contenido = document.getElementById("contenido");

const headers = {
  "x-apisports-key": API_KEY
};

window.onload = () => cargarEnVivo();

async function fetchData(endpoint) {
  try {
    const res = await fetch(BASE_URL + endpoint, { headers });
    const data = await res.json();
    return data.response || [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

function tarjetaPartido(p, vivo = false) {
  return `
    <div class="card">
      <div class="team">
        <img src="${p.teams.home.logo}">
        ${p.teams.home.name}
      </div>

      <div class="team">
        <img src="${p.teams.away.logo}">
        ${p.teams.away.name}
      </div>

      <div class="score">
        ${p.goals.home ?? "-"} - ${p.goals.away ?? "-"}
      </div>

      <p>🏆 ${p.league.name}</p>

      ${
        vivo
          ? `<p>⏱ ${p.fixture.status.elapsed}'</p>`
          : `<p>📅 ${new Date(p.fixture.date).toLocaleString()}</p>`
      }
    </div>
  `;
}

/* EN VIVO */
async function cargarEnVivo() {
  contenido.innerHTML = "<h2>Cargando en vivo...</h2>";

  let partidos = await fetchData("/fixtures?live=all");

  if (!partidos.length) {
    contenido.innerHTML = "<h2>No hay partidos en vivo ahora.</h2>";
    return;
  }

  contenido.innerHTML = "";

  partidos.forEach(p => {
    contenido.innerHTML += tarjetaPartido(p, true);
  });
}

/* PROXIMOS */
async function cargarProximos() {
  contenido.innerHTML = "<h2>Cargando próximos...</h2>";

  let partidos = await fetchData("/fixtures?next=20");

  if (!partidos.length) {
    contenido.innerHTML = "<h2>No hay próximos partidos.</h2>";
    return;
  }

  contenido.innerHTML = "";

  partidos.forEach(p => {
    contenido.innerHTML += tarjetaPartido(p);
  });
}

/* FINALIZADOS */
async function cargarFinalizados() {
  contenido.innerHTML = "<h2>Cargando finalizados...</h2>";

  let partidos = await fetchData("/fixtures?last=20");

  if (!partidos.length) {
    contenido.innerHTML = "<h2>No hay partidos finalizados.</h2>";
    return;
  }

  contenido.innerHTML = "";

  partidos.forEach(p => {
    contenido.innerHTML += tarjetaPartido(p);
  });
}

/* PAISES */
async function cargarPaises() {
  contenido.innerHTML = "<h2>Cargando países...</h2>";

  let paises = await fetchData("/countries");

  contenido.innerHTML = "";

  paises.forEach(p => {
    contenido.innerHTML += `
      <div class="card" onclick="verLigas('${p.name}')">
        🌍 ${p.name}
      </div>
    `;
  });
}

/* LIGAS */
async function verLigas(pais) {
  contenido.innerHTML = "<h2>Cargando ligas...</h2>";

  let ligas = await fetchData(`/leagues?country=${pais}`);

  contenido.innerHTML = "";

  ligas.forEach(l => {
    contenido.innerHTML += `
      <div class="card" onclick="verPartidosLiga(${l.league.id})">
        🏆 ${l.league.name}
      </div>
    `;
  });
}

/* PARTIDOS DE LIGA */
async function verPartidosLiga(idLiga) {
  contenido.innerHTML = "<h2>Cargando partidos...</h2>";

  let partidos = await fetchData(`/fixtures?league=${idLiga}&next=10`);

  if (!partidos.length) {
    contenido.innerHTML = "<h2>No hay partidos disponibles.</h2>";
    return;
  }

  contenido.innerHTML = "";

  partidos.forEach(p => {
    contenido.innerHTML += tarjetaPartido(p);
  });
}
