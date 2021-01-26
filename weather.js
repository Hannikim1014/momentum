const weather=document.querySelector(".js-weather");

const API_KEY = "edf4351c35a2e00531b4edcd70a2d81c";
const COORDS = 'coords';

function getWeather(lat,lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(reponse){
       return reponse.json();
    }) .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = 
        `Now ${temperature} °C
        in ${place}`;
    });

}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position)
{
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError()
{
    console.log("Can`t access geo location");
}
function askForCoords()
{
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

function loadCoords()
{

    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null)
    {
        askForCoords();
    }
    else{
        const parseCoords=JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init()
{
loadCoords();
}

init();