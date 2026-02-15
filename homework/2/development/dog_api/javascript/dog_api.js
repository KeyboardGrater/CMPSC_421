

async function start_program() {
    let list_of_breeds;

    // Get the list of all the dog breeds
    list_of_breeds = await get_all_dog_breeds();

    // Generate Rows
    create_rows(list_of_breeds);

    // Create the card section
    await generate_cards(list_of_breeds);

    search_dogs();
}

function main () {
    start_program();
}
main();