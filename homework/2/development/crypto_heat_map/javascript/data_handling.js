function handel_json (data_object) {
    const crypto_hierarchy = {
        name: "Crypto_coin",
        children: data_object.map(d => ({
            name: d.symbol.toUpperCase(),
            value: d.market_cap,
            percentage_change: d.percentage_change
        }))
    };

    console.log(JSON.stringify(crypto_hierarchy, null, 2));

    return crypto_hierarchy;
}