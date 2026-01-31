
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

function draw_board(game_difficulty) {
    let row_num = game_difficulty.grid_dimensions.width;
    let col_num = game_difficulty.grid_dimensions.height;

    // Create the table
    const table = document.querySelector("#dynamicTable table");
    
    // Create the rows and columns
    for (let i = 0; i < row_num; ++i) {
        const row = document.createElement("tr");               // Create a new row
        for (let j = 0; j < col_num; ++j) {
            const column = document.createElement("td");        // Create a new column 
            row.appendChild(column);                            // Append the column, as a child, to the row
        }
        table.appendChild(row);                                 // Append the row, as a child, to the table
    }
    // FamilyTree: GrandParent: table, Parent: row, Child: column


}

function start_game() {

}

function main() {

}
main();


let game_difficulty = new DifficultyInfo();

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
            "word": "Fire",
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
            "word": "Cupcake",
            "clue": "A small, individual cake often frosted.",
            "length": 7
        }
    ]
}