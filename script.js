// Getting all Buttons & Inputs

mainEl = document.querySelector(".main")
titleEl = document.querySelector(".title-el")
cityEl = document.querySelector(".city-el")
locationBtn = document.querySelector(".location-btn")
weatherIcon = document.querySelector(".weather-icon")
tempNumb = document.querySelector(".temp-numb")
cloudTypeImg = document.querySelector(".cloud-type")
locationEl = document.querySelector(".location-el")
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

    // Function to convert Kelvin to Celcius.  The Open Wearher Map gives temperature in Kelvin, this needs to be converted
    static kelvToCelc(temp) {
        return Math.round(temp - 273.15);
    }

    // Function to link Cloud Type to Images
    static getForecast (main) {
        if (main == "Clear") {
            return "clear.svg"
        }
        else if (main == "Clouds") {
            return "clouds.svg"
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
}



// Event Listener for when the Enter key is pressed
cityEl.addEventListener("keypress", async function(event, target) {
    // Calling instance of ES6 Class
    let weatherData = new WeatherData()
    if (event.keyCode == 13) {
        console.log("Enter Key was pressed!")
            // Initialise empty array
            let response = []
            // take in the City that was inputted by the user
            let cityInput = cityEl.value
            
            try {
                response = await WeatherData.getData(cityInput)
            }
            catch (error) {
                console.log("Error!")
                console.log(error)
            }
            {
                {
                    // Store Open Weather Map API Data
                    let numb = WeatherData.kelvToCelc(response.main.temp)
                    let cloudType = WeatherData.getForecast(response.weather[0].main)
                    let feelsLike = WeatherData.kelvToCelc(response.main.feels_like)
                    let city = response.name
                    let area = String(response.sys.country)
                    console.log(area)
                    let windDir = response.wind.speed
                    let curTime = function() {
                        const currentDate = new Date()
                        let hour = currentDate.getHours()
                        return hour;
                    }
                    time = function() {
                        let timeZone = response.timezone
                        // Open Weather Map gives the difference in Timezone, in seconds, so this needs to be divided by 3600
                        return curTime() + (timeZone/3600)
                    }
                    console.log(`
                    Temperature: ${numb},
                    Clouds: ${cloudType}, 
                    City: ${city}, 
                    ${area} 
                    Feels Like: ${feelsLike}, 
                    Wind Dir: ${windDir}mph, 
                    Time: ${time()}:00`)
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


