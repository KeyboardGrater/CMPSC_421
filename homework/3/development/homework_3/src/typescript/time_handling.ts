// export function start_countdown(context: any, time_remaining : number) {
//     let time_interval = 1_000;                                      // interval of 1_000 ms (1 second)

//     // Decrement the timer every second, which will then update it 
//     context.timer =  setInterval( () => {
//         // Decrement the timer
//         time_remaining--;
//     }, time_interval);
// }

export function start_countdown(context: any) {
    let time_interval = 1_000;

    // Decrement the timer every second, which, because of context, it will update the html
    context.timer = setInterval( () => {
        // Decrement the timer
        context.time_remaining--;

        // Check to see if the countdown has reached zero
        if (context.time_remaining <= 0) {
            // Stop the countdown
            clearInterval(context.timer);
            // Make sure the clock is zero
            context.time_remaining = 0;
            
            // Update the state of the game
            context.game_state = "after-round";
        }
    }, time_interval);
    
}