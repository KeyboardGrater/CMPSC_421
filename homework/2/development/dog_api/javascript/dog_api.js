

async function start_program() {
    let list_of_breeds;

    // Get the list of all the dog breeds
    list_of_breeds = await get_all_dog_breeds();

    // Create the card section
    generate_cards(list_of_breeds);

    
}

function main () {
    start_program();
}
main();