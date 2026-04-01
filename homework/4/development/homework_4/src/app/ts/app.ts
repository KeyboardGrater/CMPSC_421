import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import type { APP_STATE } from './interfaces_and_constants';
import { APP_BASE_HREF } from '@angular/common';

// Timer time in seconds
const timerTime: number = 10;

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
  // public nameOfTrack: string;
  public nameOfTrack = signal<string>("");
  public audioFileNames: string [];
  public audio: HTMLAudioElement | null;
  public taskList = signal<string[]>([]);
  public timeRemaining = signal(timerTime);
  
  private timerId: ReturnType<typeof setInterval> | undefined;
  private _appState = signal<APP_STATE>("before-run");

  
  constructor() {
    console.log(`Within the constructor`);
    this.task = "";
    this.taskList.set([]);
    this.taskObtained = false;
    this.audioFileNames = ["bbc_cafe_1", "bbc_cafe_2", "bbc_cafe_3", "bbc_rain_1", "bbc_rain_2", "bbc_rain_3", "bbc_rain_4","fassounds-lofi", "monume-lofi", "the_mountain-lofi"]; 
    // this.nameOfTrack = "";
    this.audio = null;
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

        // Starts playing the music
        this.playMusic();

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
        
        endOfTimer(this);
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
  

  playMusic() {
    // Disable the current sound track if one is currently playing
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }

    // Randomly get a name from the audio track array
    const trackName: string = randomItemInArray(this.audioFileNames);

    // Make the name of track the trackName
    this.nameOfTrack.set(trackName);

    // Add the file path to the track name
    const filepath: string = "/" + trackName + ".mp3";


    // Get the audio track, based off the file path
    this.audio = new Audio(filepath);

    // Have it play a track until the timer is up
    this.audio.addEventListener('ended', () => trackEnded(this));
    
    // play the sound track
    this.audio.play();
    
  }

  switchToTaskList() {
    // Change to the taskView state
    this.appState = "taskView";
  }

  switchToRoot() {
    // Change back to the main menu view
    this.appState = "before-run";
  }

}


// Randomly pick a index between the values of 0 and last index (length - 1)
function randomIndexOfArray(arrayLength: number): number {
  return Math.floor(Math.random() * arrayLength);
}
// Randomly pick the index, then pick a element based off the index, and return it.
function randomItemInArray (array: string []) {
  return array[randomIndexOfArray(array.length)];
}
// Get information for the next track
function trackEnded(appInfo: App) {
  // Destroy the old track
  if (appInfo.audio) {
    appInfo.audio.pause();
    appInfo.audio.currentTime = 0;
  }

  let filePath: string;
  // Randomly get the name of the track from the track name array
  const trackName: string = randomItemInArray(appInfo.audioFileNames);

  // Update the nameOfTrack to be the trackName
  appInfo.nameOfTrack.set(trackName);
  
  // Add the stuff to the track name in order to get the file path
  filePath = "/" + trackName + ".mp3";

  // Get the audio track, based off the file path
  appInfo.audio = new Audio(filePath)
  
  // Keep playing until the timer stops everything
  appInfo.audio.addEventListener('ended', () => trackEnded(appInfo));

  // Play the file
  appInfo.audio.play();
}

function endOfTimer(appInfo: App): void {
  // Return eariler if the audio does not exist
  if (!appInfo.audio) {
    return;
  }

  // Pause the audio
  appInfo.audio.pause();
  // Set the audio to time zero
  appInfo.audio.currentTime = 0;

  // Add the current task to the list
  appInfo.taskList.update(list => [...list, appInfo.task]);

  // Update the timer so that it is back to normal time
  appInfo.timeRemaining.set(timerTime);

  // Make the taskObtained flag false, so that it can get new text
  appInfo.taskObtained = false;

  // Set the state back to the begining
  appInfo.appState = "before-run";
  
}