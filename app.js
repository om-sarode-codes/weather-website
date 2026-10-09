const input = document.querySelector(".search-box input");
const searchbtn = document.querySelector(".search-box button");

const city = document.querySelector(".city");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");


searchbtn.addEventListener("click", async () => {

    const cityName = input.value.trim();


    if (cityName === "") {
        alert("Please enter city name");
        return;
    }

    try {

  

        const geoURL =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`;

        const geoResponse = await fetch(geoURL);

        const geoData = await geoResponse.json();

        console.log("Geocoding Data:", geoData);



        if (!geoData.results) {
            alert("City not found");
            return;
        }


        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;

        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);

        const weatherURL =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

        const weatherResponse = await fetch(weatherURL);

        const weatherData = await weatherResponse.json();

        console.log("Weather Data:", weatherData);



        const current = weatherData.current;

        const temp = current.temperature_2m;

        const humidityValue = current.relative_humidity_2m;

        const windValue = current.wind_speed_10m;

        const weatherCode = current.weather_code;


    
        let weatherDescription;

        if (weatherCode === 0) {
            weatherDescription = "Clear Sky";
        }
        else if (weatherCode >= 1 && weatherCode <= 3) {
            weatherDescription = "Partly Cloudy";
        }
        else if (weatherCode >= 45 && weatherCode <= 48) {
            weatherDescription = "Fog";
        }
        else if (weatherCode >= 51 && weatherCode <= 67) {
            weatherDescription = "Drizzle / Rain";
        }
        else if (weatherCode >= 71 && weatherCode <= 77) {
            weatherDescription = "Snow";
        }
        else if (weatherCode >= 80 && weatherCode <= 82) {
            weatherDescription = "Rain Showers";
        }
        else if (weatherCode >= 95) {
            weatherDescription = "Thunderstorm";
        }
        else {
            weatherDescription = "Unknown Weather";
        }


   

        city.innerHTML = geoData.results[0].name;

        temperature.innerHTML = `${temp}°C`;

        description.innerHTML = weatherDescription;

        humidity.innerHTML = `Humidity: ${humidityValue}%`;

        wind.innerHTML = `Wind: ${windValue} km/h`;

    }

    catch (error) {

        console.log("Error:", error);

        alert("Something went wrong. Please try again.");

    }

});