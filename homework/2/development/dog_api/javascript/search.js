
function get_search_box_text() {
    const text_box = document.getElementById('search_bar_text_box');
    return new Promise ( result => {
        text_box.addEventListener('keydown', (key) => {
            if (key.key === "Enter") {
                // Get the text in the search box
                result(text_box.value);
            }
        })
    });
}

function filter_cards(search_text, list_of_dog_types) { 
    // Get all the cards
    const card_list = document.querySelectorAll(".card");
    
    const lower_case_search = search_text.toLowerCase();

    // card_list.forEach(card => {
    //     const name = card.dataset.dog_name.toLowerCase();
    //     // If the name of the card matchs the user's seach text, if it does don't modify it, if it doesn't make it disappear
    //     card.style.display = name.includes(lower_case_search) ? '' : 'none'; 
    // });

    for (let i = 0; i < card_list.length; ++i) {
        const card = card_list[i];
        const name = card.dataset.dog_name.toLowerCase();
        if (!name.includes(lower_case_search)) {
            card.style.display = 'none';
        }
    }
    
}

async function search_dogs(list_of_dog_types) {
    let search_text = await get_search_box_text();

    filter_cards(search_text, list_of_dog_types);
}


