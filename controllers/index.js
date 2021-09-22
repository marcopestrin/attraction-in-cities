import { getWeatherByCity, getBusinessesByCity } from "../helpers/index.js";

/**
 * @swagger
 * /getInformations:
 *   get:
 *      summary: Get all informations about weather and businesses by cities
 *      tags: [City]
 * 
 *      parameters:
 *      - in: query
 *        name: cities
 *        required: true
 * 
 *      responses:
 *        200:
 *          description: All good

 *        500:
 *          description: Something wrong
 *
 */

export const getInformations = async(req, res) => {
    const { cities } = req.query;
    const citiesList = cities.split(",");
    try {
        const payload = await Promise.all(citiesList.map(async(location) => {
            const city = location.trim();
    
            const weather = await getWeatherByCity(city);
            if (weather.failure) {
                throw {
                    service: "openweathermap",
                    error: weather.error
                }
            }
    
            const businesses = await getBusinessesByCity(city);
            if (businesses.failure) {
                throw {
                    service: "yelp",
                    error: businesses.error
                }
            }
            return { city, businesses, weather };
        }))
        res.status(200).json(payload);

    } catch (error) {
        res.status(500).json({
            ...error
        });
    }

}