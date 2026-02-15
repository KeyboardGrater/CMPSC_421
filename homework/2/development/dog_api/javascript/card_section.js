let list_of_dogs_id = [];
let list_of_dogs_title = []

async function generate_cards (list_of_breeds) {
    const card_template = document.getElementById("card-template");
    const card_section = document.getElementById("card-section");
    const max_cards_in_row = 12;
    let card_number = 0;
    let row;

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
        const breed_object = list_of_breeds[i];

        // If the sub breed exist
        if (breed_object.sub_breed !== null) {
            const sub_breed_array = breed_object.sub_breed;
            sub_breed_array.forEach(async sub_breed => {
                row = await create_card(breed_object.breed, sub_breed, card_template, card_section, card_number, max_cards_in_row, row);
                card_number++;
            });
        }
        else {
            row = await create_card(breed_object.breed, "" , card_template, card_section, card_number, max_cards_in_row, row);
            card_number++;
        }
    }
    
}

async function create_card (breed, sub_breed, card_template, card_section, card_number, max_cards_in_row, row) {
    let image_link;
    // Create the card based off the car template
    const card = document.importNode(card_template.content, true);

    // Modify the card so that it is eaiser to identify
    const card_element = card.querySelector('.card');

    card_element.id = `card-${breed}`;
    if (sub_breed !== "") {
        card_element.id += `-${sub_breed}`;
    }

    // Change the title of the card
    const title_element = card_element.querySelector('.card-title');
    title_element.textContent = `${breed} ${sub_breed ? `(${sub_breed})` : ''}`;

    // Get the image. Be nice, and limit the api speed

    // setTimeout( async () => {
    //     image = await get_image(breed, sub_breed);   
    // }, 1_000);
    image_link = await get_image(breed, sub_breed);

    // Modify the image
    const image_element = card.querySelector("#card-image-id");
    image_element.src = image_link;
    image_element.style.width = '40%';
    image_element.style.height ='40%';


    // Checks if we need to create a new row
    if (card_number % max_cards_in_row === 0) {
        // Append the old row to the parent
        if (card_number !== 0) {
            card_section.appendChild(row);
        }

        row = document.createElement('div');

        // Modify the rows properties
        row.classList.add("row");
        row.id = `row-${card_number / max_cards_in_row}`;
    }
    
    // Add card id to list of dogs
    // list_of_dogs.push(title_element.textContent);
    list_of_dogs_id.push(card_element.id);
    list_of_dogs_title.push(title_element.textContent);

    // Append the card to the current row
    row.appendChild(card);
    console.log("The number of times this message appears is the number of cards that were created");

    return row;
}

// function create_card (breed, sub_breed, card_template, card_section) {
//     // Create the card based off the card template
//     const card = document.importNode(card_template.content, true);
//     // Modify the card so that it is eaiser to identify
//     const card_element = card.querySelector('.card');

//     // const max_card_in_row = 5;

//     card_element.id = `card-${breed}`;
//     if (sub_breed !== "") {
//         card.id += `-${sub_breed}`;
//     }
    
//     // Change the title of the card
//     const title_element = card_element.querySelector('.card-title');
//     title_element.textContent = `${breed} ${sub_breed ? `(${sub_breed})` : ''}`;




    
//     // Append the card to the card section
//     // card_section.appendChild(card);
//     // console.log("The number of times this message appears is the number of cards that were created");
// }

function create_rows (list_of_breeds) {
    // Find out how many cards there are
    console.log("STOPPER");
    let num_of_dog_types = 0;
    const max_cards_in_row = Object.freeze(5);
    const curr_num_cards_in_row = 0;
    const card_section = document.getElementById('card-section');
    

    for (let i = 0; i < list_of_breeds.length; ++i) {
       // Check to see if it has any subreeds
       if (list_of_breeds[i].sub_breed !== null ) {
            const sub_breed_array = list_of_breeds[i].sub_breed;
            sub_breed_array.forEach(sub_breed => {          // Counting single size array's as one type of dog
                num_of_dog_types++;
            })
       }
       else {
        num_of_dog_types++;
       }
    }

     
}
