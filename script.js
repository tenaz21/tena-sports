const API_KEY = "46146fa668msh7fabe31efaaf8dep198920jsn3151b4847140";

async function cargarEnVivo(){

const contenido = document.getElementById("contenido");

contenido.innerHTML = "Cargando partidos...";

try{

const response = await fetch(
"https://football-api-7.p.rapidapi.com/api/matches/top",
{
headers:{
"X-RapidAPI-Key": API_KEY,
"X-RapidAPI-Host":"football-api-7.p.rapidapi.com"
}
});

const data = await response.json();

console.log(data);

contenido.innerHTML="";

if(!data.events || data.events.length===0){

contenido.innerHTML="<h2>No hay partidos disponibles.</h2>";
return;

}

data.events.forEach(match=>{

contenido.innerHTML += `
<div class="card">

<h2>${match.homeTeam.name}</h2>

<div class="score">
VS
</div>

<h2>${match.awayTeam.name}</h2>

<p>${match.tournament.name}</p>

</div>
`;

});

}catch(error){

contenido.innerHTML="<h2>Error cargando API.</h2>";

console.log(error);

}

}

window.onload = cargarEnVivo;
