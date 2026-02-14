const api_key = Object.freeze("");

async function get_information(country_code, zip_code) {

    const url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip_code},${country_code}&appid=${api_key}`;

    // See if it returned an error or works properly
    try {
        const json_data = await fetch(url);
        let data;

        if (!json_data.ok) {
            throw new Error (`Error fetching the data. ${json_data.statusText}`);
        }

        // Otherwise, parse the json data
        data = await Object.freeze(json_data.json());

        // Return the data
        const lat = Object.freeze(data.lat);
        const lon = Object.freeze(data.lon);

        return {lat, lon};
    }
    catch (error) {
        console.error("An error has occurred when fetching json data", error);
    }

}

// Don't use because it use's pro. Hence the pro in the url
async function get_hourly_weather (latitude, longitude, mearsurement_system) {
    const url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}&appid=${api_key}&mode=${mearsurement_system}`;

    try {
        const json_data = await fetch(url);
        let data;

        if (!json_data.ok) {
            throw new Error (`Error fetching the hourly weather: ${json_data.statusText}`);
        }

        // Otherwise, we can continue
        data = Object.freeze(json_data.json());

        console.log("Test");
    }
    catch (error) {
        console.error(`An error has occurened when connecting to the url: `, error);
    }
}

async function get_daily_weather (latitude, longitude, mearsurement_system) {
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt={cnt}&appid=${api_key}&mode=${mearsurement_system}`;
    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    try {
        const json_data = await fetch(url);

        if (!json_data.ok) {
            throw new Error (`Error fetching the bi-weekly weather`, json_data.statusText);
        }   
        
        data = Object.freeze(json_data.json());

        console.log("TEST");
    }
    catch (error) {
        console.error(`An error has occurened when connecting to the url: `, error);
    }
}
