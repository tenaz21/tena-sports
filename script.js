const API_KEY = "3cc8bf02536b52d0ecc667afdfd2859c";
const BASE_URL = "https://v3.football.api-sports.io";

const contenido = document.getElementById("contenido");


// FUNCIÓN GENERAL PARA LLAMAR API
async function fetchData(endpoint){
    try{
        const res = await fetch(BASE_URL + endpoint,{
            method:"GET",
            headers:{
                "x-apisports-key": API_KEY
            }
        });

        const data = await res.json();

        return data.response || [];

    }catch(error){
        console.log(error);
        return [];
    }
}



// CREAR TARJETA DE PARTIDO
function tarjetaPartido(partido){
    return `
        <div class="card">

            <div class="team">
                <img src="${partido.teams.home.logo}" width="30">
                ${partido.teams.home.name}
            </div>

            <div class="team">
                <img src="${partido.teams.away.logo}" width="30">
                ${partido.teams.away.name}
            </div>

            <h2>
                ${partido.goals.home ?? "-"} - ${partido.goals.away ?? "-"}
            </h2>

            <p>🏆 ${partido.league.name}</p>

            <p>
                ${
                    partido.fixture.status.elapsed
                    ? "⏱ "+partido.fixture.status.elapsed+"'"
                    : "📅 "+new Date(partido.fixture.date).toLocaleString()
                }
            </p>

        </div>
    `;
}



// EN VIVO
async function cargarEnVivo(){

    contenido.innerHTML="<h2>Cargando en vivo...</h2>";

    const partidos = await fetchData("/fixtures?live=all");

    contenido.innerHTML="";

    if(partidos.length===0){
        contenido.innerHTML="<h2>No hay partidos en vivo.</h2>";
        return;
    }

    partidos.forEach(p=>{
        contenido.innerHTML += tarjetaPartido(p);
    });

}



// PRÓXIMOS
async function cargarProximos(){

    contenido.innerHTML="<h2>Cargando próximos...</h2>";

    const partidos = await fetchData("/fixtures?next=20");

    contenido.innerHTML="";

    if(partidos.length===0){
        contenido.innerHTML="<h2>No hay próximos partidos.</h2>";
        return;
    }

    partidos.forEach(p=>{
        contenido.innerHTML += tarjetaPartido(p);
    });

}



// FINALIZADOS
async function cargarFinalizados(){

    contenido.innerHTML="<h2>Cargando finalizados...</h2>";

    const partidos = await fetchData("/fixtures?last=20");

    contenido.innerHTML="";

    if(partidos.length===0){
        contenido.innerHTML="<h2>No hay partidos finalizados.</h2>";
        return;
    }

    partidos.forEach(p=>{
        contenido.innerHTML += tarjetaPartido(p);
    });

}



// MOSTRAR PAÍSES
async function cargarPaises(){

    contenido.innerHTML="<h2>Cargando países...</h2>";

    const paises = await fetchData("/countries");

    contenido.innerHTML="";

    paises.forEach(pais=>{

        contenido.innerHTML += `
            <div class="card" onclick="verLigasPais('${pais.name}')">
                🌎 ${pais.name}
            </div>
        `;

    });

}



// VER LIGAS POR PAÍS
async function verLigasPais(nombrePais){

    contenido.innerHTML="<h2>Cargando ligas...</h2>";

    const ligas = await fetchData(`/leagues?country=${nombrePais}`);

    contenido.innerHTML="";

    ligas.forEach(liga=>{

        contenido.innerHTML += `
            <div class="card" onclick="verPartidosLiga(${liga.league.id})">
                🏆 ${liga.league.name}
            </div>
        `;

    });

}



// VER PARTIDOS DE LIGA
async function verPartidosLiga(idLiga){

    contenido.innerHTML="<h2>Cargando partidos...</h2>";

    const partidos = await fetchData(`/fixtures?league=${idLiga}&next=10`);

    contenido.innerHTML="";

    if(partidos.length===0){
        contenido.innerHTML="<h2>No hay partidos disponibles.</h2>";
        return;
    }

    partidos.forEach(p=>{
        contenido.innerHTML += tarjetaPartido(p);
    });

}



// CARGA INICIAL
cargarEnVivo();
