import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import type { APP_STATE } from './interfaces_and_constants';
import { APP_BASE_HREF } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: '../html/app.html',
  styleUrls: ['../css/app.css']
})
export class App {
  protected readonly title = signal('homework_4');

  // Defined
  public task: string;
  public taskObtained: boolean;
  
  private timeRemaining = signal(10);
  private timerId: ReturnType<typeof setInterval> | undefined;
  private taskList: string [];
  private _appState = signal<APP_STATE>("before-run");

  constructor() {
    console.log(`Within the constructor`);
    this.task = "";
    this.taskList = [];
    this.taskObtained = false;
  }

  // App State and supporting
  get appState (): APP_STATE {
    return this._appState();
  }
  set appState (state: APP_STATE) {
    console.log(`State before change: ${this.appState}`);
    this._appState.set(state);
    console.log(`State after change: ${this.appState}`);
  }

  modifyTimer() {
    // First check what the current state of the app is, and then base the action off of that
    switch (this.appState) {
      case "before-run":
        // Start the timer, if we have yet to run it
        this.startTimer();
        // Update the state of the app to running
        this.appState = "running";
        break;
      case "running":
        // When the user presses the button when the program is running (counting down)
        // Stop the timer
        clearInterval(this.timerId);
        // Update the state of the app to paused
        this.appState = "paused";
        break;
      case "paused":
        // When the user presses the button after it has been paused
        // Restart the timer, but starting at the new timeRemaining amount
        this.startTimer();
        // Update the state of the app
        this.appState = "running";
        break;
      default:        // After running
        // When the timer ends up reaching zero (if this.appState === "after-running")
        console.log("Reached the timer is up point");
        // Store the task in the list
        this.taskList.push(this.task);
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
    seconds_str = seconds_num.toString().padStart(2, '0'); // TODO: FIX THIS

    return `${hours_str}:${minutes_str}:${seconds_str}`;
  }

  // Task handling and related
  onTaskInput(text: string) {

    // Check to see if the check is not whitespace nor empty. if that is is the case, then don't do anything and return
    if (text.trim() === "") {
      return;
    }

    // Otherwise we can do the actions with text now
    
    // Set the task as the text
    this.task = text;

    // Update the obtainedTask flag to true
    this.taskObtained = true;
  }

  onStartButtonClick() {
    // Get rid of the before-start html, by advancing the app state to the "running" state. Which inturn displays the next form of html.
    this.modifyTimer();
  }

}
