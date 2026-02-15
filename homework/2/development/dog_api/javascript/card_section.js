function generate_cards (list_of_breeds) {
    const card_template = document.getElementById("card-template");
    const card_section = document.getElementById("card-section");

    // Check to see if we managed to get the card without any errors
    if (!card_template) {
        console.log("Failed to obtain the card template");
        return;
    }
    // Check to see if we managed to get the card section without any errors
    else if (!card_section) {
        console.log("Failed to obtain the card section");
        return;
        
    }

    for (let i = 0; i < list_of_breeds.length; ++i) {
        const breed = list_of_breeds[i];
        const sub_breed_array = breed.sub_breed;

        if (sub_breed_array.length > 1) {

            // Loop over sub breed array, and create a new card for each
            for (let j = 1; j < sub_breed_array.length; ++j) {
                create_card(breed.breed, sub_breed_array[j], card_template, card_section);
            }
        }
        else {
            
            create_card(breed.breed, sub_breed_array.length < 1 ? "" : sub_breed_array[0], card_template, card_section);
        }
    }
}

// function create_card (breed, sub_breed, card_template, card_section) {
//     // Create the card based off the card template
//     // const card = document.createElement(card_template);
//     const card = document.importNode(card_template.content, true);
//     // Modify the card so that it is eaiser to identify
//     const card_div = card.querySelector('.card');


//     card_div.id = `card-${breed}`;
//     if (sub_breed !== "") {
//         card_div.id += `-${sub_breed}`;
//     }

    

//     // Append the card to the card section
//     console.log("Appending to:", card_section.id);
//     console.log("Element tag:", card_section.tagName);
//     card_section.appendChild(card);
//     console.log("HTML after append:", card_section.innerHTML);
// }

function create_card (breed, sub_breed, card_template, card_section) {
    // Create the card based off the card template
    const card = document.importNode(card_template.content, true);
    // Modify the card so that it is eaiser to identify
    const card_element = card.querySelector('.card');

    card_element.id = `card-${breed}`;
    if (sub_breed !== "") {
        card.id += `-${sub_breed}`;
    }
    
    // Change the title of the card
    const title_element = card_element.querySelector('.card-title');
    title_element.textContent = `${breed} ${sub_breed ? `(${sub_breed})` : ''}`;


    // Append the card to the card section
    card_section.appendChild(card);
}