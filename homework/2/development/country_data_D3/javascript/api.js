async function get_all_countries () {
    const url = `https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,cca2,cca3`;
    let json_data;
    let data;

    try {
        // Call the api 
        json_data = await fetch(url);

        if (!json_data.ok) {
            console.log("Error has occurred inside the get_all_countries function");
            return;
        }

        // Convert the data from json
        data = await json_data.json();

        // Handle the data
        console.log("get all countries console log");
        
        return data;
    }
    catch (error) {
        console.error("Error in the get_all_country section", error);
    }
}