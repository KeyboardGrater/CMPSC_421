// Globals
const json_data = {
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
}


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

function place_words(grid, word_bank, game_difficulty) {
    // Keep track of many words were placed across and how many were placed down
    let across = 0; 
    let down = 0;
    const max_across = game_difficulty.question_amount.across;
    const max_down = game_difficulty.question_amount.down;
    const row_num = game_difficulty.grid_dimensions.width;
    const col_num = game_difficulty.grid_dimensions.height
    let placed = false;
    
    let attempts = 0;
    

    for (const word of word_bank) {
        attempts = 0;                                           // We reset the number of attempts and if placed each new word
        placed = false;

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
            }
            // Increase attempts, if we cannot place it here
            attempts++;
        }
    }
    return grid;
}

// Weights determine which direction this is going to be in 
function assign_direction (across, down, max_across, max_down) {
    let across_sum = (max_across - across)/max_across;
    let down_sum = (max_down - down)/max_down;
    const weight_importance = 1;
    let summation = 0;

    summation = Math.random() + (weight_importance * (down_sum - across_sum));
    return summation < 0.5 ? "across" : "down";
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
                cell.style.background = "white";
            }
        }
    }
}

function start_round(game_difficulty) {
    draw_board(game_difficulty);                                // Generate the crossword board html
    let grid = create_empty_grid_array(game_difficulty);        // Create the board array, which is used to track the board
    let word_bank = get_word_bank();                            // Get the words from the json_data
    word_bank = randomize_array(word_bank);                     // Randomize the word bank
    
    grid = place_words(grid, word_bank, game_difficulty);              // Randomly place the words onto the grid, while keeping track of down and across
    fill_in_html(grid, game_difficulty);
}

// Deal with data
function get_word_bank () {
    return json_data.word_bank.map(item => item.word);
}

function main () {

}
main();

let game_difficulty = new DifficultyInfo();


// Fix width and height everywhere in relation to row and col
// Attacth the create border to difficulty buttons
