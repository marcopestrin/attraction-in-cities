# Attractions in some cities
A simple web application made by `Express` framework to test the APIs of `OpenWeatherMap` and `Yelp`.

## Focus
Develop a simple server that in turn invokes third-party APIs by manipulating the data.
## Features
The following cases were tested
- Missing or incorrect tokens
- Misspelled cities
- Wrong third-party APIs path
- Incorrect primary endpoint input

### more informations
- There isn't defined number of input cities to put, but the code has been tested up to 5 cities (sydney, london, boston, paris, osaka).
- The number of businesses to display has been limited to 5. This setting can be changed from the `settings.js` file.
- A simple input validator has been added: [Joi](https://joi.dev/api/).
- You can have more informations about the endpoint by **browser** at the follow address `/api-docs`. You can also test them on the endpoint by entering the cities as input and clicking on **Execute**

![Screenshot](screenshot-swagger.png)

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
After started and setted the app the following endpoint (`GET` method) will be exposed
```bash
/getInformations
```
this endpoint needs to have input cities as querystring like this
```bash
http://localhost:3000/getInformations?cities=sydney
```
the answer will be similar to:
```json
[
    {
        "city": "sydney",
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
you can also get informations of more cities separating it by commas like
```bash
http://localhost:3000/getInformations?cities=sydney,london,boston
```


## Author
Marco Pestrin (pestrinmarco@gmail.com)
