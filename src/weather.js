//@ts-check
const COORDS = "coords";
const weather = document.querySelector(".js-weather");

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Can't handle geolocation.");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function getWeather(latitude, longitude){
    fetch(`http://www.7timer.info/bin/civil.php?lon=${longitude.toFixed(2)}&lat=${latitude.toFixed(2)}&ac=0&unit=metric&output=json&tzshift=0`)
    .then((res) => {
        return res.json();
    })
    .then((json) => {
        const temperature = json.dataseries[0].temp2m;
        weather.innerHTML = `${temperature}°C`;
    });

}

function init(){
    askForCoords();
}

init();