
// fetchdata();


const form = document.querySelector(".form");
const card = document.getElementById("card");
const cityInput = document.querySelector(".inputOras")
const apiKey = "redacted";
var currentDay = 0;
var weatherData = [];
function deschideApp(){
    const app = document.getElementById("card");
    app.style.display = app.style.display === "none" ? "block" : 'none';
}

function deschideNote(){
    const note= document.getElementById("noteapp");
    note.style.display = note.style.display === "none" ? "block" : "none";
}


form.addEventListener("submit", async event =>{
    //sa nu avem default behav = reload on submit
    event.preventDefault();
    const city = cityInput.value;

    if(city){
        const wd = await getWeatherData(city);
        displayInfo(wd);
    }
    else{
        console.log("nada oras")
    }
    

});



async function getWeatherData(city){
    const url = (`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=redacted&contentType=json`);
    const response= await fetch(url)
    const datajs = response.json();
    console.log(datajs);

    return datajs;



}

function displayInfo(data) {
    const {
        address: oras,
        days
    } = data;

    const {
        tempmin,
        tempmax,
        temp,
        humidity,
        pressure,
        windspeed,
        sunset,
        sunrise,
        datetime,
        conditions
    } = days[currentDay];

    card.innerHTML = "";
    card.style.display = 'flex';

    const cityDisp = document.createElement('h1');
    const tempDisp = document.createElement('p');
    const tempMinDisp = document.createElement('p');
    const tempMaxDisp = document.createElement('p');
    const humidityDisp = document.createElement('p');
    const pressureDisp = document.createElement('p');
    const windSpeedDisp = document.createElement('p');
    const sunsetDisp = document.createElement('p');
    const sunriseDisp = document.createElement('p');
    const datetimeDisp = document.createElement('p');
    const conditionsDisp = document.createElement('p');

    cityDisp.textContent= oras;
    tempDisp.textContent =`${((temp-32) * 5/9).toFixed(1)} °C`;
     tempMinDisp.textContent=`Temp Min: ${((tempmin-32)*5/9).toFixed(1)}°C`;
    tempMaxDisp.textContent=`Temp Max: ${((tempmax-32)*5/9).toFixed(1)}°C`;
    humidityDisp.textContent=`Humidity: ${humidity}%`;
    pressureDisp.textContent=`Pressure: ${pressure}`;
    windSpeedDisp.textContent=`Wind Speed: ${windspeed} km/h`;
    sunsetDisp.textContent=`Sunset: ${sunset}`;
    sunriseDisp.textContent=`Sunrise: ${sunrise}`;
    datetimeDisp.textContent= `Date & Time: ${(datetime)}`;
    conditionsDisp.textContent= `Atmosph: ${conditions}`;

    cityDisp.classList.add("display");
    tempDisp.classList.add("temp");
    tempMinDisp.classList.add("tempmin");
    tempMaxDisp.classList.add("tempmax");
    humidityDisp.classList.add("humidity");
    pressureDisp.classList.add("pressure");
    windSpeedDisp.classList.add("windspeed");
    sunsetDisp.classList.add("sunset");
    sunriseDisp.classList.add("sunrise");
    datetimeDisp.classList.add("datetime");
    conditionsDisp.classList.add("conditions");

    card.appendChild(cityDisp);
    card.appendChild(tempDisp);
    card.appendChild(tempMinDisp);
    card.appendChild(tempMaxDisp);
    card.appendChild(humidityDisp);
    card.appendChild(pressureDisp);
    card.appendChild(windSpeedDisp);
    card.appendChild(sunsetDisp);
    card.appendChild(sunriseDisp);
    card.appendChild(datetimeDisp);
    card.appendChild(conditionsDisp);


    //ptr next btn
    document.getElementById("next").onclick = () => {
        currentDay = (currentDay + 1) % days.length;
        displayInfo(data);
    }
}


