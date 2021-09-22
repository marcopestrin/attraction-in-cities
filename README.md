# Attractions in some cities
A simple web application made by `Express` framework to test the APIs of `OpenWeatherMap` and `Yelp`.

## Focus

## Features

# Requirements
- nodeJS `v14.5.0`
## Getting Started
Install all dependencies with the follow command:
```bash
npm install
```
To be sure it work properly use this command as well
```bash
node --experimental-specifier-resolution=node index
```
Start the application with:
```bash
npm start
```
## Environment variable
In the root of project create a file named `.env` with the following keys:
```bash
YELP_AUTHORIZATION=
OPEN_WEATHER_MAP_APP_KEY=
```
The values of these keys will be the authorization tokens of the third party services.

## Example
After started and setted the app the following endpoint will be exposed
```bash
/getInformations
```
this endpoint needs to have input cities as querystring like this
```bash
http://localhost:3000/getInformations?cities=sydney,london,boston
```
the answer will be similar to:
```json
[
    {
        "city": "",
        "businesses": [{
            "name": "Social Brew Cafe",
            "categories": [ "Cafes", "Breakfast & Brunch", "Coffee & Tea" ],
            "location": "224 Harris St"
        }],
        "weather": {
            "description": ["clear sky"],
            "tempMin": 288.76,
            "tempMax": 292.93,
            "humidity": 51
        }
    }
]
```

## Author
Marco Pestrin (pestrinmarco@gmail.com)
