const API_KEY = "46146fa668msh7fabe31efaaf8dep198920jsn3151b4847140";

async function cargarEnVivo(){

const contenido = document.getElementById("contenido");

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

contenido.innerHTML = `
<pre style="color:white; font-size:12px; white-space:pre-wrap;">
${JSON.stringify(data,null,2)}
</pre>
`;

}catch(error){

contenido.innerHTML = `
<h2>Error:</h2>
<p>${error}</p>
`;

}

}

window.onload = cargarEnVivo;
