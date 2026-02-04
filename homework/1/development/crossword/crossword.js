// Globals
const json_data = Object.freeze ({
    "word_bank": [
        {
            "word": "starter",
            "clue": "Something that can begin something.",
            "length": 7
        },
        {
            "word": "candy",
            "clue": "A sweet food made primarily from sugar.",
            "length": 5
        },
        {
            "word": "beach",
            "clue": "A place where the sand meets the ocean.",
            "length": 5
        },
        {
            "word": "agree",
            "clue": "To come to a mutual decision.",
            "length": 5
        },
        {
            "word": "plant",
            "clue": "A living organism that grows in soil.",
            "length": 5
        },
        {
            "word": "singer",
            "clue": "Someone who performs songs with their voice.",
            "length": 6
        },
        {
            "word": "fire",
            "clue": "A heat source that consumes fuel.",
            "length": 4
        },
        {
            "word": "paint",
            "clue": "A substance used for coloring surfaces",
            "length": 5
        },
        {
            "word": "theory",
            "clue": "A hypothesis or set of ideas to explain something.",
            "length": 6
        },
        {
            "word": "ocean",
            "clue": "A large body of saltwater.",
            "length": 5
        },
        {
            "word": "library",
            "clue": "A place for books and study.",
            "length": 6
        },
        {
            "word": "cloud",
            "clue": "A visible mass of condensed water vapor in the sky.",
            "length": 5
        },
        {
            "word": "house",
            "clue": "A structure for human habitation.",
            "length": 5
        },
        {
            "word": "harmony",
            "clue": "A pleasing arrangement of parts or sounds.",
            "length": 7
        },
        {
            "word": "dream",
            "clue": "A series of thoughts or images occurring during sleep.",
            "length": 5
        },
        {
            "word": "solve",
            "clue": "To find the answer to a problem.",
            "length": 5
        },
        {
            "word": "melon",
            "clue": "A large, sweet fruit with a thick rind.",
            "length": 5
        },
        {
            "word": "cup",
            "clue": "A small container for holding liquids.",
            "length": 3
        },
        {
            "word": "lion",
            "clue": "A large, carnivorous feline known for its strength.",
            "length": 4
        },
        {
            "word": "rain",
            "clue": "Water falling from the sky in droplets.",
            "length": 4
        },
        {
            "word": "movie",
            "clue": "A form of entertainment using moving images",
            "length": 5
        },
        {
            "word": "slide",
            "clue": "A smooth, slanted surface used for descending.",
            "length": 5
        },
        {
            "word": "orange",
            "clue": "A citrus fruit or its color.",
            "length": 6
        },
        {
            "word": "paper",
            "clue": "A material used for writing.",
            "length": 5
        },
        {
            "word": "time",
            "clue": "A continuous, measurable period.",
            "length": 4
        },
        {
            "word": "brain",
            "clue": "The organ responsible for thought and coordination.",
            "length": 5
        },
        {
            "word": "guitar",
            "clue": "A musical instrument with six strings.",
            "length": 6
        },
        {
            "word": "table",
            "clue": "A flat surface used for working or eating.",
            "length": 5
        },
        {
            "word": "snow",
            "clue": "Frozen water vapor that falls as flakes.",
            "length": 4
        },
        {
            "word": "cupcake",
            "clue": "A small, individual cake often frosted.",
            "length": 7
        }
    ]
});


// Difficulty 
const difficulty_options = Object.freeze({
    EASY: 'easy',
    INTERMEDIATE: 'intermediate',
    HARD: 'hard'
});

class DifficultyInfo {
    constructor() {
        this.grid_dimensions = {
            width: 15,
            height: 15
        };
        this.question_amount = {
            across: 10,
            down: 10
        };
        this.difficulty = difficulty_options.INTERMEDIATE;
    }

    change_difficulty_helper(width, height, across, down, difficulty) {
        this.grid_dimensions.width = width;
        this.grid_dimensions.height = height;
        this.question_amount.across = across;
        this.question_amount.down = down;
        this.difficulty = difficulty;
    }
    change_difficulty(new_difficulty) {
        switch (new_difficulty) {
            case difficulty_options.EASY:
                this.change_difficulty_helper(10, 10, 5, 5, difficulty_options.EASY);
                break;
            case difficulty_options.INTERMEDIATE:
                this.change_difficulty_helper(15, 15, 10, 10, difficulty_options.INTERMEDIATE);
                break;
            case difficulty_options.HARD:
                this.change_difficulty_helper(20, 20, 15, 15, difficulty_options.HARD);
                break;
        }
    }
}

// Board Functions and Actions
function draw_board (game_difficulty) {
    let row_count = game_difficulty.grid_dimensions.width;
    let col_count = game_difficulty.grid_dimensions.height;
    const board = document.createElement('table');

    // Clear the board of any previous table creations
    document.getElementById('board').innerHTML = '';

    // Create the board divisions
    for (let i = 0; i < row_count; ++i) {
        const row = document.createElement('tr');               // Create a row
        for (let j = 0; j < col_count; ++j) {
            const cell = document.createElement('td');          // Create a cell
            cell.id = `cell-${i}-${j}`;                         // Made an id for each cell
            row.appendChild(cell);                              // Make the new cell a child of the most recent row
        }
        board.appendChild(row);                                 // Make the most recent row a child of the board
    }

    // Adds the board onto the webpage
    document.getElementById('board').appendChild(board)
}

function create_empty_grid_array (game_difficulty) {
    const width = game_difficulty.grid_dimensions.width;
    const height = game_difficulty.grid_dimensions.height;
    return Array.from( {length: width}, () => Array(height).fill(' '));
}

function can_place(grid, word, direction, row, col, max_row, max_col) {
    let word_fits = true;

    // First find out which direction we are moving in
    if (direction === "across") {
        for (let i = 0; i < word.length; ++i) {
            // Check to see if we have exceeded the bounds (horizontal direction)
            if (col >= max_col - 1) {
                word_fits = false;
                break;
            }
            else if (grid[row][col] !== word[i] && grid[row][col] !== ' ') {
                word_fits = false;
                break;
            }
            col++;
        }
    }
    else {
        for (let i = 0; i < word.length; ++i) {
            // Check to see if we have exceeded the bounds (downward direction)
            if (row >= max_row - 1) {
                word_fits = false;
                break;
            }
            // If the letter matchs current grid location, or is a white space, then it move onto the next letter AKA, break if the letter doesn't match
            else if (grid[row][col] !== word[i] && grid[row][col] !== ' ') {
                word_fits = false;
                break;
            }
            // Otherwise, if it passes, then move onto the next letter (increment row)
            row++;
        }
    }

    // Check to see if we exited the loop early
    if (word_fits) {
        return true;
    }
    // If we did exit early, then return false
    else {
        return false;
    }
}

function place_word_in_grid(grid, word, direction, row, col) {
    // Modify the grid array
    for (let i = 0; i < word.length; ++i) {
        grid[row][col] = word[i];                               // Place the char at i in word, in the location in the grid array
        // Check which we need to advance
        direction === "across" ? col++ : row++;
    }
    return grid;                                                // Return the newly updated grid
}

function place_words(grid, json_results, game_difficulty) {
    // Keep track of many words were placed across and how many were placed down
    let across = 0; 
    let down = 0;
    const max_across = game_difficulty.question_amount.across;
    const max_down = game_difficulty.question_amount.down;
    const row_num = game_difficulty.grid_dimensions.width;
    const col_num = game_difficulty.grid_dimensions.height
    let placed = false;
    let attempts = 0;
    let word_orientation = Array.from( {length: max_across + max_down}, () => ({word: null, direction: "", hint: ""}));    // Makes it eaiser to allign clues with the direction of their word
    let selected_index = 0;
    let word = "";

    for (let i = 0; i < json_results.length; ++i) {
        attempts = 0;                                           // We reset the number of attempts and if placed each new word
        placed = false;
        word = json_results[i].word;

        // Check for exiting the loop, once the max number of across and down has been reached
        if (across === max_across && down === max_down) {
            break;
        }
        
        // Attempt to place down word, at random. Attempt this board_size * 4 times
        while(!placed && attempts < row_num * col_num * 4) {            // Keeps the loop going until, either the word is placed, or we exceeded or max_attempts
            // Pick a random x and y coordinate             
            let row = random_number_generator(0, row_num - 1);              // limit is three, because the smallest word will be 3 letters long, and we need at
            let col = random_number_generator(0, col_num - 1);              // least three spaces for the shortest word. And one more so that we account for 0 index in the array

            // Choose whether this word will be down or across, via randomly weighted
            let direction = assign_direction(across, down, max_across, max_down);

            // Check if that space hasn't already been taken up, if so update placed, and increse across or down number
            if (can_place(grid, word, direction, row, col, row_num, col_num)) {
                placed = true;
                direction === "across" ? across++ : down++;     // Increment which ever direction the word was placed in
                grid = place_word_in_grid(grid, word, direction, row, col);
                word_orientation[selected_index].word = word;
                word_orientation[selected_index].direction = direction;
                word_orientation[selected_index].hint = json_results[i].clue;
                selected_index++;
            }
            // Increase attempts, if we cannot place it here
            attempts++;
        }
    }

    // Returns the updated grid, and word_orientation.    
    return [grid, word_orientation];
}

// Weights determine which direction this is going to be in 
function assign_direction (across, down, max_across, max_down) {
    let across_sum = (max_across - across)/max_across;
    let down_sum = (max_down - down)/max_down;
    const weight_importance = 1;
    let summation = 0;

    summation = weight_importance * (down_sum - across_sum);
    if (max_across !== across && max_down !== down) {
        summation += Math.random();
    }

    return summation < 0 ? "across" : "down";
}


// Randomizer functions
function randomize_array(array) {
    let random_index = -1;

    for (let i = array.length - 1; i > 0; i--) {
        // Calculate the random index
        random_index = Math.floor(Math.random() * (i + 1));
        // Swap the elements
        [array[i],array[random_index]] = [array[random_index], array[i]];
    }
    return array;
}
function randomize_object_array(object) {
    return randomize_array(object.word_bank);
}
function random_number_generator(min, max) {                
    return Math.floor(Math.random() * (max - min + 1) + min );
}


function fill_in_html(grid, game_difficulty) {
    let max_row = game_difficulty.grid_dimensions.height;
    let max_col = game_difficulty.grid_dimensions.width;

    for (let i = 0; i < max_row; ++i) {
        for (let j = 0; j < max_col; ++j) {
            const cell_id = `cell-${i}-${j}`;
            const cell = document.getElementById(cell_id);

            // If the cell is empty (''), then make it a black square
            if (grid[i][j] === ' ') {
                cell.style.backgroundColor = "black";
            }
            else {
                cell.style.opacity = 0;
                cell.innerText = grid[i][j];
                cell.style.background = "white";
            }
        }
    }
}

function fill_in_hints(hint_info) {
    const hint_text = document.getElementById('hints');
    let across_text = "Across:\n";
    let down_text = "Down:\n";

    // Separate the hints into the across_text and down_text strings 
    for (let i = 0; i < hint_info.length; ++i) {
        if (hint_info[i].direction === "across") {
            across_text += `${i + 1}. ${hint_info[i].hint}\n`;
        }
        else {
            down_text += `${i + 1}. ${hint_info[i].hint}\n`;
        }
    }

    // Modify the respective html
    hint_text.innerText = across_text + "\n" + down_text;
}

function create_input_boxes (game_difficulty, word_direction) {
    const across_input_section = document.getElementById("across_input_section");
    const down_input_section = document.getElementById("down_input_section");
    
    // Remove any previous children
    across_input_section.innerHTML = "";
    down_input_section.innerHTML = "";
    

    // Add the labels to the two sections
    document.getElementById("across_input_title").innerText = "Across:";
    document.getElementById("down_input_title").innerText = "Down:";

    for (let i = 0; i < word_direction.length; ++i) {
        if (word_direction[i].direction === "across") {
            const across_input = document.createElement("input");
            across_input.type = "text";
            across_input.id = `text_field_${i}`;
            across_input_section.appendChild(across_input);
        }
        else {
            const down_input = document.createElement("input");
            down_input.type = "text";
            down_input.id = `text_field_${i}`;
            down_input_section.appendChild(down_input);
        }
    }
    
}   

function create_input_checker_button () {
    // Clear the board of any buttons from the previous round
    document.getElementById("input_button_section").innerHTML = "";

    // Create the button
    const input_button = document.createElement("button");

    // Modify the button
    input_button.id = "check_input_button";
    input_button.classList.add("input_checker_button");
    input_button.addEventListener("click", check_input_boxes);

    // This is ugly

    // Append the button to the input button section
    document.getElementById("input_button_section").appendChild(input_button);

}



// Checks if the person is correct
function check_input_boxes() {
    // Get a list of all the input boxes
    const across_input_list = document.getElementById("across_input_section").children;
    const down_input_list = document.getElementById("down_input_section").children;
    const across_list = Array(across_input_list.length);
    const down_list = Array(down_input_list.length);
    const input_list = Array((across_input_list.length + down_input_list.length));
    const num_questions = Object.freeze(game_difficulty.question_amount.across + game_difficulty.question_amount.down);
    let all_correct = true;
    let local_word_list = word_list;
    let word = "";
    let input_text = "";
    let box_string = "";

    // Get the data from the data from each direction section and seperate it into two different arrays
    for (let i = 0; i < across_input_list.length; ++i) {
        across_list[i] = across_input_list[i].value;
    }
    for (let i = 0; i < down_input_list.length; ++i) {
        down_list[i] = down_input_list[i].value;
    }

    // Combine the two list into one list, then check it against the results
    input_list.concat = across_list.concat(down_list);
    
    // Check if those two exist within the map
    
    for (let i = 0; i < num_questions; ++i) {
        box_string = `text_field_${i}`;
        if (local_word_list[i].word !== document.getElementById(box_string).value) {
            all_correct = false;
            break;
        }
        // Otherwise, update the box to be green
        document.getElementById(box_string).style.backgroundColor = "green";
    }

    if (all_correct === true) {
        for (let i = 0; i < game_difficulty.grid_dimensions.height; ++i) {
            for (let j = 0; j < game_difficulty.grid_dimensions.width; ++j) {
                const cell_id = `cell-${i}-${j}`;
                const cell = document.getElementById(cell_id);

                // If the cell is empty (''), then leave it alone
                if (global_grid[i][j] !== ' ') {
                    cell.style.opacity = 100;
                }
            }
        }
    }

    console.log(`Are all of the words correct: ${all_correct}`);
    
}   

function start_round(game_difficulty) {

    // Create empty board and data array
    draw_board(game_difficulty);                                // Generate the crossword board html
    let grid = create_empty_grid_array(game_difficulty);        // Create the board array, which is used to track the board
    
    // Handle word bank and hints data
    let json_results = json_data;                               // Make the json data into a local mutable object
    json_results = randomize_object_array(json_results);        // Randomize the order of the words, but keep the hints attached to them


    // Place words operation
    let place_words_return = place_words(grid, json_results, game_difficulty);     // Randomly place the words onto the grid, while keeping track of down and across
    let word_direction = place_words_return[1];

    // Create or modify the html
    fill_in_html(grid, game_difficulty);
    fill_in_hints(word_direction);
    create_input_boxes(game_difficulty, word_direction);
    create_input_checker_button();
    
    console.log(`Across: ${word_direction.filter(item => item.direction === "across").map(item => item.word)}`);
    console.log(`Down ${word_direction.filter(item => item.direction === "down").map(item => item.word)}`);
    console.log("STOPPER in start round");

    // Create a global varaible because when the button is pressed, it needs acesses to this data
    globalThis.word_list = word_direction;
    globalThis.global_grid = grid;
}

// Deal with data
function get_word_bank (json_results) {
    return json_results.map(item => item.word);
}

function main () {

}
main();

let game_difficulty = new DifficultyInfo();


// Fix width and height everywhere in relation to row and col
// Attacth the create border to difficulty buttons
// Look into "col >= max_col - 1" and the row equivalent, in the get place function. I might need to add an exception, for when the last char of a word can end on the edge of the board
// Might change direction to be enum's instead of strings
// Might shorten create input boxes
// Maybe change, the "this is ugly section in create button"