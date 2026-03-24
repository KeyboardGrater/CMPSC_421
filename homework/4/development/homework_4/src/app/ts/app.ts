import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import type { APP_STATE } from './interfaces_and_constants';
import { APP_BASE_HREF } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: '../html/app.html',
  styleUrl: '../css/app.css'
})
export class App {
  protected readonly title = signal('homework_4');

  // Defined
  private appState: APP_STATE;
  private timeRemaining = signal(10);
  private timerId: ReturnType<typeof setInterval> | undefined;

  constructor() {
    // State
    this.appState = "before-run";
  }

  modifyTimer() {
    // First check what the current state of the app is, and then base the action off of that
    
    // Start the timer, if we have yet to run it
    if (this.appState === "before-run") {      
      // Maybe move the timer up
      
      // Start the timer
      this.startTimer();
      // Update the state of the app to running
      this.appState = "running";
    }

    // When the user presses the button when the program is running (counting down)
    else if (this.appState === "running") {
      // Stop the timer
      clearInterval(this.timerId);

      // Update the state of the app to paused
      this.appState = "paused";

    }

    // When the user presses the button after it has been paused
    else if (this.appState === "paused") {
      // Restart the timer, but starting at the new timeRemaining amount
      this.startTimer();

      // Update the state of the app
      this.appState = "running";
    }

    // When the timer ends up reaching zero (if this.appState === "after-running")
    else {  
      console.log("Reached the timer is up point");
      // TODO, store task in list
    }
  }

  startTimer() {
    // Display the timeRemaining
    this.displayTime;

    // Start the countdown
    // this.timerId = setInterval(this.displayTime, 1_000);
    this.timerId = setInterval( () => {
      // If the time has run out then close down the timer
      if (this.timeRemaining() <= 0) {
        // Change the state of the app to after-running
        this.appState = "after-running";
        console.log(this.appState);
        // Cancel the interval timer
        clearInterval(this.timerId);
      }
      else {
      // Otherwise, keep decrementing the clock
      this.decrement_clock();
      }
    }, 1_000);
  }

  decrement_clock(): void {
    this.timeRemaining.update(v => v - 1);
  }

  get displayTime(): string {
    let hours_num: number;
    let minutes_num: number;
    let seconds_num: number = this.timeRemaining();
    let hours_str: string;
    let minutes_str: string;
    let seconds_str: string;

    // Math Part
    hours_num = Math.floor(seconds_num / 3600);
    seconds_num = seconds_num % 3600;

    minutes_num = Math.floor(seconds_num / 60);
    seconds_num = Math.floor(seconds_num % 60);

    // String handling
    hours_str = hours_num.toString().padEnd(2, '0');
    minutes_str = minutes_num.toString().padEnd(2, '0');
    seconds_str = seconds_num.toString().padStart(2, '0'); // FIX THIS

    return `${hours_str}:${minutes_str}:${seconds_str}`;
  }
}
