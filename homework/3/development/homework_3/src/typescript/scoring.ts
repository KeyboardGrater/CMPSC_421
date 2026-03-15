export function calculate_score (context : any) {
    const user_text : string = (context.all_user_text + context.user_text).trim();                       // Need to add on the current user-text
    const paragraph : string = (context.all_seen_paragraphs + context.paragraph).trim();                 // Need to add on the current paragraph                 
    
    // To avoid string bug
    const paragraph_word_array : string [] = paragraph.split(/\s+/);
    const user_text_word_array : string [] = user_text.split(/\s+/);
    
    // Find out how much of the characters were wrong, and which were correct
    for (let i : number = 0; i < user_text.length ; ++i) {
        if (user_text[i] === paragraph[i]) {
            context.correct_characters++;
        }
        else {
            context.wrong_characters++;
        }
    }

    // Find out how many words were correct, and how many were wrong
    
    for (let i : number = 0; i < user_text_word_array.length ; ++i) {
        console.log(`user_text_word_array : ${user_text_word_array[i]}`);
        console.log(`paragraph_word_array : ${paragraph_word_array[i]}`);

        if (user_text_word_array[i] === paragraph_word_array[i]) {
            context.correct_words++;
        }
        else {
            context.wrong_words++;
        }
    }

    // Calculate the accuracy, and making sure a div by zero error doesn't occure
    if (user_text_word_array.length !== 0) {
        context.accuracy = context.correct_words / user_text_word_array.length;
    }

}