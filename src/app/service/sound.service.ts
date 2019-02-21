import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class SoundService {
  onPackSound: HTMLAudioElement = new Audio();
  beginGameSound: HTMLAudioElement = new Audio();
  timerSound: HTMLAudioElement = new Audio();
  rightAnsSound: HTMLAudioElement = new Audio();
  wrongAnsSound: HTMLAudioElement = new Audio();
  winnerSound: HTMLAudioElement = new Audio();
  lostSound:HTMLAudioElement = new Audio();
  ansTimerSound:HTMLAudioElement = new Audio();
  bombBlastAudio:HTMLAudioElement = new Audio();

  constructor() {
    this.loadSound();
   }
        
   loadSound(){
    this.onPackSound.src = 'assets/gamesound/EnterGamesoundonclick.mp3';
    this.timerSound.src = 'assets/gamesound/tick_timer_loop.wav';
    this.beginGameSound.src = 'assets/gamesound/BeginGamewhenmatched.wav';
    this.rightAnsSound.src='assets/gamesound/rightAnsSound.wav';
    this.wrongAnsSound.src='assets/gamesound/wrongAnsSound.wav'; 
    this.winnerSound.src = 'assets/gamesound/VictoryMarch2.mp3';
    this.ansTimerSound.src = 'assets/gamesound/SecondstimerClicks.mp3';
    this.bombBlastAudio.src = 'assets/cashblast/sound/sound4.m4r';
    this.lostSound.src = 'assets/gamesound/GameLost.wav';
   }
   playWinnerSound(){
    this.winnerSound.load();
    this.winnerSound.play();
    //this.winnerSound.volume = 1;
   }
   playGameStart(){
    this.beginGameSound.load();
    this.beginGameSound.play();
  //  this.beginGameSound.volume = 1;
   }
   playWrongAns(){
    this.wrongAnsSound.load();
    this.wrongAnsSound.play();
   }
   playRightAns(){
    this.rightAnsSound.load();
    this.rightAnsSound.play();
   }
   playLosser(){
     this.lostSound.load();
     this.lostSound.play();
   }
   playtimerTick(){
     this.timerSound.load();
     this.timerSound.play();
   }
   PlayOnPackClick(){
     this.onPackSound.load();
     this.onPackSound.play();
   }
   playAnsTimer(){
     this.ansTimerSound.load();
     this.ansTimerSound.play();
   }
   playBlast(){
     this.bombBlastAudio.load();
     this.bombBlastAudio.play();
   }
   offSound(){
     this.winnerSound.pause();
     this.beginGameSound.pause();
     this.timerSound.pause();
     this.rightAnsSound.pause();
     this.wrongAnsSound.pause();
     this.lostSound.pause();
     this.ansTimerSound.pause();
     this.bombBlastAudio.pause();
   }
}
