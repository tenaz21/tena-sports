const API_KEY = "3cc8bf02536b52d0ecc667afdfd2859c";
const BASE_URL = "https://v3.football.api-sports.io";

const contenido = document.getElementById("contenido");

const headers = {
    "x-apisports-key": API_KEY
};

window.onload = () => cargarEnVivo();

async function getData(url){
    const res = await fetch(url,{headers});
    const data = await res.json();
    return data.response;
}

function crearPartidoHTML(partido, enVivo=false){
    return `
    <div class="card">
        <div class="team">
            <img src="${partido.teams.home.logo}">
            ${partido.teams.home.name}
        </div>

        <div class="team">
            <img src="${partido.teams.away.logo}">
            ${partido.teams.away.name}
        </div>

        <div class="score">
            ${partido.goals.home ?? "-"} - ${partido.goals.away ?? "-"}
        </div>

        <p>🏆 ${partido.league.name}</p>

        ${
            enVivo
            ? `<p>⏱ ${partido.fixture.status.elapsed}'</p>`
            : `<p>📅 ${new Date(partido.fixture.date).toLocaleString()}</p>`
        }
    </div>
    `;
}

async function cargarEnVivo(){
    contenido.innerHTML="";

    let partidos = await getData(
        `${BASE_URL}/fixtures?live=all`
    );

    partidos.forEach(p=>{
        contenido.innerHTML += crearPartidoHTML(p,true);
    });
}

async function cargarProximos(){
    contenido.innerHTML="";

    let hoy = new Date();
    let mañana = new Date();
    mañana.setDate(hoy.getDate()+1);

    let fecha = mañana.toISOString().split("T")[0];

    let partidos = await getData(
        `${BASE_URL}/fixtures?date=${fecha}`
    );

    partidos.forEach(p=>{
        contenido.innerHTML += crearPartidoHTML(p);
    });
}

async function cargarFinalizados(){
    contenido.innerHTML="";

    let ayer = new Date();
    ayer.setDate(ayer.getDate()-1);

    let fecha = ayer.toISOString().split("T")[0];

    let partidos = await getData(
        `${BASE_URL}/fixtures?date=${fecha}&status=FT`
    );

    partidos.forEach(p=>{
        contenido.innerHTML += crearPartidoHTML(p);
    });
}

async function cargarPaises(){
    contenido.innerHTML="";

    let paises = await getData(
        `${BASE_URL}/countries`
    );

    paises.forEach(pais=>{
        contenido.innerHTML += `
        <div class="card" onclick="verLigas('${pais.name}')">
            🌍 ${pais.name}
        </div>
        `;
    });
}

async function verLigas(pais){
    contenido.innerHTML="";

    let ligas = await getData(
        `${BASE_URL}/leagues?country=${pais}`
    );

    ligas.forEach(liga=>{
        contenido.innerHTML += `
        <div class="card" onclick="verPartidosLiga(${liga.league.id})">
            🏆 ${liga.league.name}
        </div>
        `;
    });
}

async function verPartidosLiga(idLiga){
    contenido.innerHTML="";

    let hoy = new Date().toISOString().split("T")[0];

    let partidos = await getData(
        `${BASE_URL}/fixtures?league=${idLiga}&date=${hoy}`
    );

    partidos.forEach(p=>{
        contenido.innerHTML += crearPartidoHTML(p);
    });
}
