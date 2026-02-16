

async function start_program() {
    let list_of_breeds;
    let list_of_dog_types;

    // Get the list of all the dog breeds
    list_of_breeds = await get_all_dog_breeds();

    // Generate Rows
    create_rows(list_of_breeds);

    // Create the card section
    list_of_dog_types = await generate_cards(list_of_breeds);

    search_dogs(list_of_dog_types);
}

function main () {
    start_program();
}
main();