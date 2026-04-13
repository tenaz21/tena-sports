const API_KEY = "46146fa668msh7fabe31efaaf8dep198920jsn3151b4847140";

async function cargarEnVivo() {

const contenido = document.getElementById("contenido");

contenido.innerHTML = "Cargando...";

try {

const response = await fetch(
"https://football-api-7.p.rapidapi.com/api/matches/live",
{
headers:{
"X-RapidAPI-Key": API_KEY,
"X-RapidAPI-Host": "football-api-7.p.rapidapi.com"
}
});

const data = await response.json();

console.log(data);

contenido.innerHTML = "";


/* VALIDACION SEGURA */
if (!data.events || data.events.length === 0) {

contenido.innerHTML = `
<div class="empty">
🚫 No hay partidos en vivo
</div>
`;

return;

}


/* MOSTRAR PARTIDOS */
data.events.forEach(match => {

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

} catch(error) {

contenido.innerHTML = `
<div class="empty">
❌ Error cargando API
</div>
`;

console.log("ERROR DETALLADO:", error);

}

}

window.onload = cargarEnVivo;
