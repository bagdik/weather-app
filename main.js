const apiKey = 'ad0a5b624e504223bc1180058233101';
//
//const query =`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=London`;
//
//fetch(query).then((response) => {
//  return response.json();
//}).then((data) => {
//  console.log(data);
//});

/* Get name of city */
const header = document.querySelector('.header');
const form = document.querySelector('#form');
const inputCity = document.querySelector("#inputCity");

const getWeather = async (city) => {
  
  const url =`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const response = await fetch(url);
  return await response.json();
} 

const removeCard = () => {
  // remove previous cards
  const prevCard = document.querySelector('.card');
  if (prevCard) prevCard.remove();
}

const showErrorCard = (errorMessage) => {
  const card = `
                <div class="card">
                  ${errorMessage}
                </div>
              `
    // show card on the page
    header.insertAdjacentHTML('afterend', card);
}

const showWeatherCard = ({ city, country, temperature, condition }) => {
  // generate weather card
  const card = `
                <div class="card">
                <h2 class="card-city">${city} <span>${country}</span></h2>
                <div class="card-weather">
                  <div class="card-value">
                    ${temperature}<sup>&degC</sup>
                  </div>
                  <img class="card-img" src="./img/cloudy.png" alt="Weather">
                </div>
                <div class="card-description">${condition}</div>
                </div>
              `
  // show card on page
  header.insertAdjacentHTML('afterend', card);
}

form.onsubmit = async (event) => {
  event.preventDefault();
  const city = inputCity.value.trim();
  const data = await getWeather(city);

  removeCard();
    
  if (data.error) {
    showErrorCard(data.error.message);
  } else {
    
    const weatherData = {
      city: data.location.name,
      country: data.location.country,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
    }

    showWeatherCard(weatherData); 
  }
}