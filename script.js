const API_KEY = "46146fa668msh7fabe31efaaf8dep198920jsn3151b4847140";

async function cargarEnVivo(){

const contenido = document.getElementById("contenido");

contenido.innerHTML = "Cargando...";

try{

const response = await fetch(
"https://football-api-7.p.rapidapi.com/api/matches/live",
{
headers:{
"X-RapidAPI-Key":API_KEY,
"X-RapidAPI-Host":"football-api-7.p.rapidapi.com"
}
});

const data = await response.json();

console.log(data);

contenido.innerHTML="";

if(!data.events.length){
contenido.innerHTML="<h2>No hay partidos en vivo.</h2>";
return;
}

data.events.forEach(match=>{

contenido.innerHTML += `
<div class="card">
<h2>${match.homeTeam.name} vs ${match.awayTeam.name}</h2>

<div class="score">
${match.homeScore.current} - ${match.awayScore.current}
</div>

<p>${match.status.description}</p>

</div>
`;

});

}catch(error){

contenido.innerHTML="<h2>Error cargando API.</h2>";

console.log(error);

}

}

window.onload = cargarEnVivo;
