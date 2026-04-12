const API_KEY="3cc8bf02536b52d0ecc667afdfd2859c";

async function api(url){

const res=await fetch(url,{
headers:{
"x-apisports-key":API_KEY
}
});

return await res.json();

}

function render(html){
document.getElementById("contenido").innerHTML=html;
}

async function cargarEnVivo(){

render("Cargando...");

let data=await api("https://v3.football.api-sports.io/fixtures?live=all");

let html="";

data.response.forEach(p=>{

html+=`
<div class="card" onclick="detallePartido(${p.fixture.id})">

<div class="team">
<img src="${p.teams.home.logo}">
${p.teams.home.name}
</div>

<div class="team">
<img src="${p.teams.away.logo}">
${p.teams.away.name}
</div>

<div class="score">
${p.goals.home}-${p.goals.away}
</div>

⏱ ${p.fixture.status.elapsed}'
<br>
🏆 ${p.league.name}

</div>
`;

});

render(html);

}

async function cargarProximos(){

render("Cargando...");

let data=await api("https://v3.football.api-sports.io/fixtures?next=20");

let html="";

data.response.forEach(p=>{

html+=`
<div class="card">

${p.teams.home.name} vs ${p.teams.away.name}
<br><br>
🏆 ${p.league.name}
<br>
📅 ${new Date(p.fixture.date).toLocaleString("es-PE",{timeZone:"America/Lima"})}

</div>
`;

});

render(html);

}

async function cargarFinalizados(){

render("Cargando...");

let data=await api("https://v3.football.api-sports.io/fixtures?last=20");

let html="";

data.response.forEach(p=>{

html+=`
<div class="card">

${p.teams.home.name} ${p.goals.home} - ${p.goals.away} ${p.teams.away.name}
<br><br>
🏆 ${p.league.name}

</div>
`;

});

render(html);

}

async function cargarPaises(){

render("Cargando países...");

let data=await api("https://v3.football.api-sports.io/countries");

let html="";

data.response.forEach(p=>{

html+=`
<div class="card" onclick="cargarLigas('${p.name}')">
🌍 ${p.name}
</div>
`;

});

render(html);

}

async function cargarLigas(pais){

render("Cargando ligas...");

let data=await api("https://v3.football.api-sports.io/leagues?country="+pais);

let html="";

data.response.forEach(l=>{

html+=`
<div class="card" onclick="cargarPartidosLiga(${l.league.id})">
🏆 ${l.league.name}
</div>
`;

});

render(html);

}

async function cargarPartidosLiga(id){

render("Cargando partidos...");

let data=await api(
"https://v3.football.api-sports.io/fixtures?league="+id+"&season=2026"
);

let html="";

data.response.forEach(p=>{

html+=`
<div class="card">

${p.teams.home.name} vs ${p.teams.away.name}
<br>
📅 ${new Date(p.fixture.date).toLocaleString("es-PE",{timeZone:"America/Lima"})}

</div>
`;

});

render(html);

}

async function detallePartido(id){

let data=await api(
"https://v3.football.api-sports.io/fixtures?id="+id
);

let p=data.response[0];

render(`

<div class="card">

<h2>${p.teams.home.name}</h2>

<h2>${p.teams.away.name}</h2>

<div class="score">
${p.goals.home}-${p.goals.away}
</div>

<p>🏟 ${p.fixture.venue.name}</p>

<p>👨‍⚖️ ${p.fixture.referee}</p>

<p>🏆 ${p.league.name}</p>

</div>

`);

}

cargarEnVivo();
