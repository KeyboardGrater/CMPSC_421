async function get_all_countries () {
    const url = `https://restcountries.com/v3.1/all?fields=name,capital,currencies`;

    try {
        let api_data;
        let json_data;
        // Call the api
        api_data = await fetch(url);

        if(!api_data.ok) {
            console.log("Error within the get_all_countries section");
        }
        
        // Parse the data
        json_data = api_data.json();

        console.log("Logged in the get_all_countries");

    }
    catch (error) {
        console.error("Error in the get_all_country section", error);
    }
}