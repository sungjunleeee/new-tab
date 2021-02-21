//@ts-check
const COORDS = "coords";
const weather = document.querySelector(".js-weather");

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

function handleGeoError(){
    weather.innerHTML = `Weather is unavailable.`;
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function getWeather(latitude, longitude){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=187e4a7076642aef5c97440be66c0573&units=metric`)
    .then((res) => {
        return res.json();
    })
    .then((json) => {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerHTML = `🌡️${Math.round(temperature)}°C 📍${place}`;
    });

}

function init(){
    askForCoords();
}

init();