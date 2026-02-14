

function collect_input (text_box) {
    // Gets the value from the text box, then convers that to a integer, and then returns it
    return parseInt(text_box.value);
}

function get_zip_code () {
    let zip_code = 0;
    const submission_button = document.getElementById("zip-code-submission-button");
    const text_box = document.getElementById("zip-code-text-box");

    // First check if we have both the text box and the button
    if (text_box) {
        if (submission_button) {
            // Collect input, when either the submission button is clicked, or when the textbox has enter
            submission_button.addEventListener('click', () => {
                zip_code = collect_input(text_box);
            });
            text_box.addEventListener('keydown', (key) => {
                if (key.key === 'Enter') {
                    zip_code = collect_input(text_box);
                }
            });
        }
        else {
            console.log("The zip code submission button: " + submission_button.id + " is not found");
        }
    }
    else {
        console.log("Text box, " + text_box.id + "has not been found");
    }

    return zip_code;
}


function running_program () {
    let zip_code = -1;
    
    zip_code = get_zip_code();
    
}

function main () {
    running_program();
}   
main();

// Maybe add something that disables the enter, or submission button for zip code after you click, or hit enter