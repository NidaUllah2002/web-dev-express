const { join } = require('path');
const express = require('express');
const { default: axios } = require('axios');

const router = express.Router();
const __VIEW_PATH = join(__dirname, 'views');

const API_KEY = process.env.API_KEY;
const API_TEMPLATE = `https://samples.openweathermap.org/data/2.5/forecast?lat=:latitude&lon=:longitude&appid=${API_KEY}`;

const cities = {
    morocco: { longitude: 31.7917, latitude: 7.0926 },
    london: { longitude: 51.5072, latitude: 0.1276 },
    paris: { longitude: 48.8566, latitude: 2.3522 },
};

router.get('/weather', async (_, res) => {
    try {
        const cityData = [];

        for (city in cities) {
            const { latitude, longitude } = cities[city];
            const url = API_TEMPLATE.replace(':latitude', latitude).replace(
                ':longitude',
                longitude,
            );
            const { data } = await axios.get(url);
            const report = data.list[data.list.length - 1];

            console.log(url);

            const { name, coord } = data.city;
            const { temp: temprature, humitidy } = report.main;

            cityData.push({
                description: report.weather[0].description,
                temprature,
                humitidy,

                city: {
                    name: name,
                    coordinates: {
                        latitude: coord.lat,
                        longitude: coord.lon,
                    },
                },

                original: {
                    name: city,
                    coordinates: {
                        longitude,
                        latitude,
                    },
                },
            });
        }

        // res.json(cityData).end();

        res.render(join(__VIEW_PATH, 'weather.hbs'), {
            cities: cityData,
        });
    } catch (error) {
        console.error(error);
        res.send('An error occurred').status(500);
    }
});

exports.default = router;
