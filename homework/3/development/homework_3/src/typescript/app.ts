import {defineComponent} from "vue"
import { start_countdown } from "./time_handling";

export default defineComponent({
  data() {
    return {
      time_remaining: 5
    }
  },

  methods: {
    start_game() {
      // Call the timer to begin counting down
      start_countdown(this);
    }
  }
}
)

