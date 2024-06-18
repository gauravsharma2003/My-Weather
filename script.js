const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");

search.addEventListener("click", fetchWeather);
document
  .querySelector(".search-box input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      fetchWeather();
    }
  });

function fetchWeather() {
  const APIKey = "98740f4ebc0d63bc0f8ba70090e5a091";
  const city = document.querySelector(".search-box input").value;
  if (city == "") return;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        alert("City not found");
        return;
      }

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Snow":
          image.src = "images/snow.png";
          break;
        case "Clouds":
          image.src = "images/cloud.png";
          break;
        case "Mist":
          image.src = "images/mist.png";
          break;
        default:
          image.src = "images/cloud.png";
          break;
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      // GSAP Animations

      gsap.from(".weather-box img", {
        duration: 1,
        opacity: 0,
        y: -50,
        ease: "power3.out",
      });

      gsap.from(".temperature", {
        duration: 1,
        opacity: 0,
        y: -50,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".description", {
        duration: 1,
        opacity: 0,
        y: -50,
        ease: "power3.out",
        delay: 0.4,
      });

      gsap.from(".humidity", {
        duration: 1,
        opacity: 0,
        x: -50,
        ease: "power3.out",
        delay: 0.6,
      });

      gsap.from(".wind", {
        duration: 1,
        opacity: 0,
        x: 50,
        ease: "power3.out",
        delay: 0.8,
      });
    });
}
