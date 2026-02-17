

// Returns the numerical representation of the text in the text box
function read_zip_code_text (text_box) {
    return parseInt(text_box.value);
}

function zip_code_entered (button, text_box) {
    return new Promise ( (result) => {
        button.addEventListener('click', () => {
            result(read_zip_code_text(text_box));
        });
        text_box.addEventListener('keydown', (key) => {
            if (key.key === 'Enter') {
                result(read_zip_code_text(text_box));
            }
        });
    });
}


async function get_zip_code () {
    const submission_button = document.getElementById('zip-code-submission-button');
    const text_box = document.getElementById('zip-code-text-box');

    // Check to see if it retrieved submission button and text box correctly
    if (!submission_button) {
        console.log("The submission button failed to retrieve");
        return;
    }
    else if (!text_box) {
        console.log("Failed to retrieve the zip code text box");
        return;
    }

    // Otherwise, both were successfully obtained
    return await zip_code_entered(submission_button, text_box);
}

async function start_app () {
    let zip_code = -1;
    let country_code = "US";                            // Default to the us county code
    let lat_long_info = {lat: 100, lon: 100};           // If it displays 100 for either then it is a error
    const mearsurement_system = "imperial";
    let weather_info;
    const number_of_days = 7;
    
    
    // Action Section
    zip_code = await get_zip_code();                        // Do I need the await hear, if I have the await right were I need it, down the chain
    console.log(`Zip Code: ` + zip_code);

    // After the zip code is obtained, launch the dynamic creation of the api call
    // create_api_file();

    // Get the latitude and the longitude based of the country and zip code
    lat_long_info = await get_information(country_code, zip_code);    // Do I need an await here?

    // Get the weather based of the latitude and the longitude
    weather_info = get_daily_weather(lat_long_info.lat, lat_long_info.lon, number_of_days, mearsurement_system);



}

function main () {
    start_app();
}   
main();

// Maybe add something that disables the enter, or submission button for zip code after you click, or hit enter
// Do I want the system and langague to be based of the country. And should I give the user, the choice of which system and location the want