
async function start_program() {
    let world_wide_info;
    
    // Get the api of the country
    world_wide_info = await get_all_countries();
    
    create_map(world_wide_info);

}

function main () {
    start_program();
}
main();