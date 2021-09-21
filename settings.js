import dotenv from 'dotenv';
dotenv.config();

export default {
    "openWeatherMapAppKey": process.env.OPEN_WEATHER_MAP_APP_KEY,
    "yelpAuthorization": process.env.YELP_AUTHORIZATION,
    "maxBusinessesToShow": 5,
    "serverPort": process.env.PORT ? process.env.PORT : 3000
}