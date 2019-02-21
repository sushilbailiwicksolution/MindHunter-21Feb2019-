import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { QwserviceService } from '../service/qwservice.service';
import { AuthService } from '../../auth.service';
import { SoundService } from '../../service/sound.service';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit {
  ans: string;
  index: any;
  temp: string;
  winnerSound: HTMLAudioElement = new Audio();

  constructor(public router: Router,public soundsrc:SoundService, public auth: AuthService, public service: QwserviceService) {
    // this.winnerSound.src = 'assets/gamesound/VictoryMarch2.mp3';
    this.ans = localStorage.getItem("correctAns");
    this.temp = localStorage.getItem("ansIndex");
    this.index = +this.temp + 1;
    console.log("index==> ", this.index);
    
    this.claimPrize();
  }

  ngOnInit() {
    this.soundsrc.playWinnerSound();  
  }
  claimPrize() {
    // this.winnerSound.load();
    // this.winnerSound.play();
    // this.winnerSound.volume = 1;
    let endPoint ="claimPrizeForQuickWin"
    let reqBody = {
      "userId": this.auth.getUserId(),
      "packId": this.auth.getPackId(),
      "gameId": this.auth.getGameId()
    }
    this.service.clamePrice(endPoint,reqBody).then((res)=>{
      console.log("claim Price res======> ",res);
    })



  }


  goHome() {
    this.winnerSound.volume = 0;
    this.soundsrc.offSound();
    this.router.navigate(["/dashboard"]);
  }
  getHome() {
  
    this.soundsrc.offSound();
    this.router.navigate(["/dashboard"])
  }

}
