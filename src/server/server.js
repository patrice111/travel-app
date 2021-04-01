// Setup empty JS object to act as endpoint for all routes
projectData = {};

const fetch = require('node-fetch')
const dotenv = require('dotenv');
dotenv.config();

const express = require('express')
const cors = require('cors');
const app = express();

app.use(express.static('dist'));
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../../dist/index.html'));
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

// Worked with student leader to rework server-side
// I was giving an example of how to make chaining api calls
app.post("/getWeather", projectData = (req, res) => {
  const { destination } = req.body;
  // Call to the geonames API
  const geoNames = `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=patkel123_`;
  fetch(geoNames)
    .then((res) => res.json())
    .then((json) => {
      // getting latitude and longitude
      const lat = json.geonames[0].lat;
      const lng = json.geonames[0].lng;
      // Call to the weatherbit API
      const weatherBit = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=24d9db5c095b44058759893673f52450`;
      fetch(weatherBit)
        .then((res) => res.json())
        .then((json) => {
            console.log(json);
          const icon = json.data[0].weather.icon;
          const description = json.data[0].weather.description;
          const highTemp = json.data[0].high_temp;
          const lowTemp = json.data[0].low_temp;
          // Call to the pixabay API
          const pixaBay = `https://pixabay.com/api/?key=20848612-37c1bada72f829ffcc89afd88&q=${destination}&image_type=photo`;
          fetch(pixaBay)
            .then((res) => res.json())
            .then((json) => {
              const image = json.hits[0].webformatURL;
              const pixObj = {
                destination: destination,
                icon: icon,
                description: description,
                highTemp: highTemp,
                lowTemp: lowTemp,
                image: image,
              };
              res.send(pixObj);
            });
        });
    });
});
