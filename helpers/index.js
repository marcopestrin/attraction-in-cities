import fetch from "node-fetch";
import { maxBusinessesToShow } from "../settings.js";

const getData = async(url, headers) => {
    try {
        const result = await fetch(url, {
            method: "GET",
            headers
        })
        return {
            success: true,
            payload: await result.json()
        }
    } catch(error) {
        return {
            success: false,
            payload: error
        }
    }

}

export const getWeatherByCity = async(city) => {
    try {
        const queryString = `?q=${city}&appId=${process.env.OPEN_WEATHER_MAP_APP_KEY}`;
        const url = `https://api.openweathermap.org/data/2.5/weather${queryString}`;
        const { payload, success } = await getData(url);
        if (success) {
            const { weather, main } = payload;
            return {
                "description": weather.map((item) => item.description),
                "tempMin": main.temp_min,
                "tempMax": main.temp_max,
                "humidity": main.humidity
            }
        }
        throw payload
    } catch (error) {
        return {
            failure: true,
            error
        }
    }
}
export const getBusinessesByCity = async(city) => {
    try {
        const headers = { "Authorization": `Bearer ${process.env.YELP_AUTHORIZATION}`};
        const url = `https://api.yelp.com/v3/businesses/search?location=${city}`;
        const { success, payload } = await getData(url, headers);
        if (success) {
            if (payload.error) {
                throw payload.error.description;
                return
            }
            return await payload.businesses
            .slice(0, maxBusinessesToShow)
            .map((business) => {
                const { name, categories, location } = business;
                return {
                    name,
                    "categories": categories.map((category) => category.title),
                    "location": location.address1
                }
            }) 
        }
        throw payload
    } catch(error) {
        // console.log({ error })
        return {
            failure: true,
            error
        }
    }

}