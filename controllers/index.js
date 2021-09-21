import { getWeatherByCity, getBusinessesByCity } from "../helpers/index.js";

export const getInformations = async(req, res) => {
    const { cities } = req.query;
    const citiesList = cities.split(",");

    const payload = await Promise.all(citiesList.map(async(location) => {
        const city = location.trim();

        const weather = await getWeatherByCity(city);
        if (weather.failure) {
            res.status(500).json({
                service: "openweathermap",
                error: weather.error
            });
            return
        }

        const businesses = await getBusinessesByCity(city);
        if (businesses.failure) {
            res.status(500).json({
                service: "yelp",
                error: businesses.error
            });
            return
        }

        return { city, businesses, weather };
    }))
    res.status(200).json(payload);
}