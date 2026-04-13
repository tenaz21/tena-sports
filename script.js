const API_KEY = "46146fa668msh7fabe31efaaf8dep198920jsn3151b4847140";

fetch("https://football-api-7.p.rapidapi.com/api/matches/live",{
headers:{
"X-RapidAPI-Key":API_KEY,
"X-RapidAPI-Host":"football-api-7.p.rapidapi.com"
}
})
.then(res=>{
console.log(res);
return res.json();
})
.then(data=>{
console.log(data);
})
.catch(err=>{
console.log(err);
});
