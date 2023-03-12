// Getting all Buttons & Inputs

mainEl = document.querySelector(".main")
titleEl = document.querySelector(".title-el")
inputEl = document.querySelector(".input-el")
weatherBox = document.querySelector(".weather-box")
forecastIcon = document.querySelector(".forecast-icon")
tempNumb = document.querySelector(".temp-numb")
forecastEl = document.querySelector(".forecast-el")
cityEl = document.querySelector(".city-el")
areaEl = document.querySelector(".area-el")
feelsLikeIcon = document.querySelector(".feels-like-icon")
feelsLikeEl = document.querySelector(".feels-like-el")
windDirIcon = document.querySelector(".wind-dir-icon")
windDirEl = document.querySelector(".wind-dir-el")
timeIcon = document.querySelector(".time-icon")
timeEl = document.querySelector(".time-el")

// My API Key
let apikey = '090b3ae92535283ca3c7e35f8c8f12a7'

// ES6 Classes

// Async Function to fetch data from Open Weather Map API
class WeatherData {
    static async getData(cityInput) {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apikey}`)
        response = await response.json()
        return response
    }    
    // Function to return an error, if COuntry Name is invalid
    static errorFunction(error) {
        return alert("Error: Invalid City Name. Please enter a valid City Name.")
    }

    // Function to convert Kelvin to Celcius.  The Open Wearher Map gives temperature in Kelvin, this needs to be converted
    static kelvToCelc(temp) {
        return Math.round(temp - 273.15);
    }

    // Function to link Forecast to .svg images
    static getForecast (main) {
        if (main == "Clear") {
            return "clear.svg"
        }
        else if (main == "Clouds") {
            return "cloud.svg"
        }
        else if (main == "Rain" || main == "Drizzle") {
            return "rain.svg"
        }
        else if (main == "Snow") {
            return "snow.svg"
        }
        else if (main == "Thunderstorm") {
            return "thunderstorm.svg"
        }
        else if (main == "Mist" || main == "Smoke" || main == "Haze"|| main == "Fog") {
            return "haze.svg"
        }
    }

    static printData(forecast, numb, forecastDesc, city, area, feelsLike, windDir, time) {
        forecastIcon.innerHTML = `<img src="icons/${forecast}" alt="forecast-icon" class="forecast-icon">`
        tempNumb.innerHTML = `${numb}`
        forecastEl.innerHTML = `${forecastDesc}`
        cityEl.innerHTML = `${city}`
        areaEl.innerHTML = `, ${area}`
        feelsLikeEl.innerHTML = `${feelsLike}`
        windDirEl.innerHTML = `${windDir} mph`
        timeEl.innerHTML = `${time()}:00`
    }
}


// Event Listener for when the Enter key is pressed
inputEl.addEventListener("keypress", async function(event, target) {
    // Calling instance of ES6 Class
    let weatherData = new WeatherData()
    if (event.keyCode == 13) {
        // Initialise empty array
        let response = []
        // take in the City that was inputted by the user
        let cityInput = inputEl.value
        
        try {
            response = await WeatherData.getData(cityInput)
            // Throw error if input name is invalid, or input is empty
            if (response.cod == "404" || cityInput == "") {
                WeatherData.errorFunction()
                return;
            }
        }
        catch (error) {
            console.log("Error!")
            console.log(error)
            WeatherData.errorFunction(error)
        }
        {
            {
                // Make Weather Section Visible
                weatherBox.style.display = "block"
                // Store Open Weather Map API Data
                let numb = WeatherData.kelvToCelc(response.main.temp)
                let forecast = WeatherData.getForecast(response.weather[0].main)
                let forecastDesc = response.weather[0].main
                let feelsLike = WeatherData.kelvToCelc(response.main.feels_like)
                let city = response.name
                let area = String(response.sys.country)
                let windDir = response.wind.speed
                let time = function() {
                    const currentDate = new Date()
                    return currentDate.getHours();
                }
                WeatherData.printData(forecast, numb, forecastDesc, city, area, feelsLike, windDir, time)
            }
        }
    }
})


// cloudType 
// clear (this is sunny)
// Clouds
// Drizzle / Rain
// Snow
// Thunderstorm
// Mist / Smoke / Haze / Fog


