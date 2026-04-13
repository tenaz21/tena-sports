const API_KEY = "46146fa668msh7fabe31efaaf8dep198920jsn3151b4847140";

async function cargarEnVivo(){

const contenido = document.getElementById("contenido");

contenido.innerHTML = "Cargando partidos...";

try{

let response = await fetch(
"https://football-api-7.p.rapidapi.com/api/matches/live",
{
headers:{
"X-RapidAPI-Key":API_KEY,
"X-RapidAPI-Host":"football-api-7.p.rapidapi.com"
}
});

let data = await response.json();

if(data.events && data.events.length > 0){

mostrarPartidos(data.events);

}else{

response = await fetch(
"https://football-api-7.p.rapidapi.com/api/matches/top",
{
headers:{
"X-RapidAPI-Key":API_KEY,
"X-RapidAPI-Host":"football-api-7.p.rapidapi.com"
}
});

data = await response.json();

if(data.events && data.events.length > 0){

mostrarPartidos(data.events);

}else{

contenido.innerHTML="<h2>No hay partidos disponibles.</h2>";

}

}

}catch(error){

contenido.innerHTML="<h2>Error cargando API.</h2>";

console.log(error);

}

}

function mostrarPartidos(partidos){

const contenido = document.getElementById("contenido");

contenido.innerHTML="";

partidos.forEach(match=>{

contenido.innerHTML += `
<div class="card">
<h2>${match.homeTeam.name} vs ${match.awayTeam.name}</h2>

<div class="score">
${match.homeScore?.current ?? 0} - ${match.awayScore?.current ?? 0}
</div>

<p>${match.tournament?.name ?? "Liga"}</p>
</div>
`;

});

}

window.onload = cargarEnVivo;
