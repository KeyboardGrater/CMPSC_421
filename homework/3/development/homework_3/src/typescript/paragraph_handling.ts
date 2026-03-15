import paragraphs from "../../public/paragraphs.json"

export function json_parsing () {
    // It is already parsed
    // Break it up though
    const data = paragraphs.paragraphs;
    
    // Randomly shuffel the order of the paragraphs, using the Fisher-Yates Shuffle
    let current_index = data.length;

    while(current_index != 0) {
        let random_index = Math.floor(Math.random() * current_index);
        current_index--;

        [data[current_index], data[random_index]] = [data[random_index] as string, data[current_index] as string];
    }

    return data;
}


export function update_paragraph (context : any) : void {
    const paragraph_array : string [] = context.paragraph_array;
    let index : number =  context.paragraph_array_index;
    
    // Update the index of the paragraph
    index++;
    
    // Add a looping mechanism incase the user gets through everything, somehow
    if (index === paragraph_array.length - 1) {
        index = 0;
    }
    
    // Update the context.index
    context.paragraph_array_index = index;
    
    // Update the paragraph
    context.paragraph = paragraph_array[index];
    
    // Append to make scoring eaiser at the end
    context.all_seen_paragraphs += context.paragraph;
    context.all_user_text += context.user_text;

    console.log(`all_seen_paragraphs: ${context.all_seen_paragraphs}`);
    console.log(`all_user_text: ${context.all_user_text}`);

}

export function modifying_char (user_text : string, paragraph : string, index : number) : string {
    let character_color : string = "";

    // If the user hasen't gotten to this character yet
    if (index >= user_text.length) {
        character_color = "";
    }

    // Check to see if the character is correct or not
    else if (user_text[index] === paragraph[index]) {
        character_color = "char-is-correct";
    }
    else {
        character_color = "char-is-incorrect";
    }

    return character_color;
}