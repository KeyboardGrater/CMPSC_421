
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

function filter_cards(search_text) {
    const card_section = document.getElementById('card-section');
    const row_list = card_section.children;

    // Loop to get all the cards
    // row_list.forEach(row => {
    //     const cards_in_row = row.children;
    //     cards_in_row.forEach(card => {
    //         const card_title = card.title;
    //         // If it is search text is not a substring of the tile of the card, then hide the card
    //         if (!card_title.includes(search_text)) {
    //             card.style.display = 'none';
    //         }
    //     });
    // });

    for (let i = 0; i < list_of_dogs_id.length; ++i) {
        const card = document.getElementById(list_of_dogs_id[i]);
        const card_title = list_of_dogs_title[i];
        // If it is search text is not a substring of the tile of the card, then hide the card
        if (!card_title.includes(search_text)) {
            card.style.display = 'none';
        }
    }

    console.log("STOPPER 4");
}

async function search_dogs() {
    let search_text = await get_search_box_text();

    filter_cards(search_text);
}


