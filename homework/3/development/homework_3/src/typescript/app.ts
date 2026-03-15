import {defineComponent} from "vue"
import { start_countdown } from "./time_handling";
import { json_parsing, modifying_char, update_paragraph } from "./paragraph_handling";
import {calculate_score} from "./scoring.ts"
import type {curr_game_state} from "./interfaces_and_unions.ts";
import { saveScore, get_top_scores} from "./firebase.ts"

export default defineComponent({
  data() {
    return {
      // General game information
      time_remaining: 60,
      game_state: "before-round" as curr_game_state,
      
      // User input
      user_text: "",
      
      // Paragraph stuff
      paragraph_array: json_parsing(),
      paragraph_array_index: -1,
      paragraph: "",

      // Score part
      correct_characters: 0,
      correct_words: 0,
      wrong_characters: 0,
      wrong_words: 0,
      accuracy: 0,

      // Helping score
      all_seen_paragraphs: "",
      all_user_text: "",

      // leaderboard stuff
      leaderboard_data: [] as any[],
      name: ""
    }
  },

  methods: {
    start_game() {
      // Display the first paragraph
      update_paragraph(this);

      // This will remove the start button, and create new html
      this.game_state = "during-round";                               

      // Call the timer to begin counting down
      start_countdown(this);

      // Once the game has ended

    },
    
    modify_characters(index : number) {
      return modifying_char(this.user_text, this.paragraph, index);
    }
  },
  
  watch: {
    // Get the next paragraph after the user types the paragraph length amount of characters in
    user_text() {
      const user_text_length : number = this.user_text.length;
      const paragraph_length : number = this.paragraph.length;
      console.log("Watching from inside the check_paragraph_needs_updating");

      if (user_text_length >= paragraph_length) {
        // Replace the current paragraph with the next paragraph
        update_paragraph(this);
        // Empty out the input text section
        this.user_text = "";
      }

    },

    async game_state() {
      // Execute if the round is in the end game
      if (this.game_state === "after-round") {
        calculate_score(this);

        await saveScore({
          name: this.name,
          correct_characters: this.correct_characters,
          wrong_characters: this.wrong_characters,
          correct_words: this.correct_words,
          wrong_words: this.wrong_words,
          accuracy: this.accuracy
        });

        // Refresh the leaderboard
        this.leaderboard_data = await get_top_scores();
      }
    }


  }
    
}
)

