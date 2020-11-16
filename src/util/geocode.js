const request = require("postman-request");

const getWeatherUrl =
  "http://api.weatherstack.com/current?access_key=60c9d1d59124e74df29f1b1d049634c0&query=%s";
const forwardGeoMapping =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/%s.json?access_token=pk.eyJ1IjoiamF5YWNoYW5kcmFucHV0dGFsaW5nYWlhaCIsImEiOiJja2hqOG82dXUxOGpqMnNtY2YwZDFlcmYwIn0.EhQ6M1pgAq5Lxg5KeoL-ZA&limit=1";

  class Weather {
    constructor(weather,place){
      this.weather = weather;
      this.place = place;
    }
  }
function getTemperature(placeName, coordinates, weatherConsumer) {
  const url = getWeatherUrl.replace("%s", `${coordinates[1]},${coordinates[0]}`);
  request(url, (error, response, body) => {
    if (response.statusCode === 200) {
      const current = JSON.parse(body).current;
      console.log(`It is ${current.weather_descriptions[0]}`);
      console.log(
        `It is currently ${current.temperature} degree Celcius, but it feels like ${current.feelslike}`
      );
      weatherConsumer({
        place: placeName,
        weather: `It is currently ${current.temperature} degree Celcius, but it feels like ${current.feelslike}`
      });
    }
  });
}

 function getCoordinates(place='Bangalore', coordinatesConsumer, weatherConsumer) {
  const getCoordinatesUrl = forwardGeoMapping.replace("%s", encodeURIComponent(place));
   request(getCoordinatesUrl, (error, response, body) => {
    if (response) {
      const feature = JSON.parse(body).features[0];
      const {geometry: {coordinates}, place_name: placeName} = feature;
      //const coordinates = feature.geometry.coordinates;
      console.log(`place is ${placeName}`);
      coordinatesConsumer(placeName,coordinates,weatherConsumer)
      //return coordinates (undefined); we can't return as this is async callback
    } else {
      throw new Error(`failed to get coordinates for place ${place}`);
    }
  });
}


function getWeatherOfPlace(place, weatherConsumerCallback){
    return getCoordinates(place,getTemperature,weatherConsumerCallback)
}

module.exports = {
  getWeatherOfPlace: getWeatherOfPlace
}