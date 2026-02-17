

async function call_crypto_api () {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    let json_data;
    let data;

    try {
        json_data = await fetch (url);

        if(!json_data.ok) {
            console.log("Error when fetching the data");
            return;
        }

        // Parse the json file
        data = await json_data.json();

        console.log("API CONSOLE LOG");



        // Handel the json data, by grabbing the symbol, percentage change, symbol, and circulating value
        let filtered_data = data.map(crypto_coin => {
            return {
                symbol: crypto_coin.symbol,
                market_cap: crypto_coin.market_cap,
                percentage_change: crypto_coin.market_cap_change_percentage_24h
            };
        });

        console.log(filtered_data);

        return filtered_data;
    }
    catch (error) {
        console.error("Error when dealing with the api", error);
    } 


}