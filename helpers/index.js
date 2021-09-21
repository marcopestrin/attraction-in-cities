import fetch from "node-fetch";
import config  from "../settings.js";

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
    } catch(payload) {
        return {
            success: false,
            payload
        }
    }

}

export const getWeatherByCity = async(city) => {
    try {
        const queryString = `?q=${city}&appId=${config.openWeatherMapAppKey}`;
        const url = `https://api.openweathermap.org/data/2.5/weather${queryString}`;
        const { payload, success } = await getData(url);
        const { weather, main } = payload;
        if (success && weather && main) {
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
        const headers = { "Authorization": `Bearer ${config.yelpAuthorization}`};
        const url = `https://api.yelp.com/v3/businesses/search?location=${city}`;
        const { success, payload } = await getData(url, headers);
        if (success) {
            if (payload.error) {
                throw payload.error.description;
            }
            return await payload.businesses
                .slice(0, config.maxBusinessesToShow)
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
        return {
            failure: true,
            error
        }
    }

}