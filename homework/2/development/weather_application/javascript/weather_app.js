const api_key = Object.freeze("");


// Returns the numerical representation of the text in the text box
function read_zip_code_text (text_box) {
    return parseInt(text_box.value);
}

function zip_code_entered (button, text_box) {
    return new Promise ( (result) => {
        button.addEventListener('click', () => {
            result(read_zip_code_text(text_box));
        });
        text_box.addEventListener('keydown', (key) => {
            if (key.key === 'Enter') {
                result(read_zip_code_text(text_box));
            }
        });
    });
}


async function get_zip_code () {
    const submission_button = document.getElementById('zip-code-submission-button');
    const text_box = document.getElementById('zip-code-text-box');

    // Check to see if it retrieved submission button and text box correctly
    if (!submission_button) {
        console.log("The submission button failed to retrieve");
        return;
    }
    else if (!text_box) {
        console.log("Failed to retrieve the zip code text box");
        return;
    }

    // Otherwise, both were successfully obtained
    return await zip_code_entered(submission_button, text_box);
}

async function start_app () {
    let zip_code = -1
    // Creation Section

    // Action Section
    zip_code = await get_zip_code();                        // Do I need the await hear, if I have the await right were I need it, down the chain
    console.log(`Zip Code: ` + zip_code);
}

function main () {
    start_app();
}   
main();

// Maybe add something that disables the enter, or submission button for zip code after you click, or hit enter