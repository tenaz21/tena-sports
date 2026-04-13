const API_KEY = "46146fa668msh7fabe31efaaf8dep198920jsn3151b4847140";

async function cargarEnVivo(){

const contenido = document.getElementById("contenido");

contenido.innerHTML = "Cargando partidos...";

try{

const response = await fetch(
"https://football-api-7.p.rapidapi.com/api/matches/live",
{
headers:{
"X-RapidAPI-Key": API_KEY,
"X-RapidAPI-Host":"football-api-7.p.rapidapi.com"
}
});

const data = await response.json();

console.log(data);

contenido.innerHTML="";

if(data.events && data.events.length > 0){

data.events.forEach(match=>{

contenido.innerHTML += `
<div class="card">
<h2>${match.homeTeam.name}</h2>

<div class="score">
${match.homeScore.current} - ${match.awayScore.current}
</div>

<h2>${match.awayTeam.name}</h2>

<p>${match.tournament.name}</p>
</div>
`;

});

}else{

contenido.innerHTML=`
<div class="card">
<h2>⚽ No hay partidos en vivo ahora mismo</h2>
<p>Vuelve más tarde para ver encuentros en directo.</p>
</div>
`;

}

}catch(error){

contenido.innerHTML="<h2>Error cargando API.</h2>";

console.log(error);

}

}

window.onload = cargarEnVivo;
