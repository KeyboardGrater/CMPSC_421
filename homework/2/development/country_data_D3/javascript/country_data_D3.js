
async function start_program() {
    let country_info;
    
    // Get the api of the country
    country_info = await get_all_countries();


}

function main () {
    start_program();
}
main();