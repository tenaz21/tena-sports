const API_KEY = "46146fa668msh7fabe31efaaf8dep198920jsn3151b4847140";

const LIVE_URL =
"https://free-football-api-data.p.rapidapi.com/football-current-live";

async function cargarEnVivo() {

const contenido = document.getElementById("contenido");

contenido.innerHTML = "<h2>Cargando partidos...</h2>";

try {

const response = await fetch(LIVE_URL,{
method:"GET",
headers:{
"x-rapidapi-key":API_KEY,
"x-rapidapi-host":"free-football-api-data.p.rapidapi.com"
}
});

const data = await response.json();

console.log(data);

contenido.innerHTML = "";

if(!data.response?.live?.length){
contenido.innerHTML="<h2>No hay partidos en vivo.</h2>";
return;
}

data.response.live.forEach(partido=>{

contenido.innerHTML += `
<div class="card">
<h2>${partido.home.name} vs ${partido.away.name}</h2>

<div class="score">
${partido.home.score} - ${partido.away.score}
</div>

<p>${partido.time}</p>
</div>
`;

});

}catch(error){

contenido.innerHTML="<h2>Error cargando partidos.</h2>";
console.error(error);

}

}

window.onload = cargarEnVivo;
