import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { CashblastService } from '../services/cashblast.service';
import { Router } from '@angular/router';
import { SoundService } from '../../service/sound.service';


@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  //winnerData: Array<{ mobileNo: string, rank: string }>;
  winnerData: Array<{ mobileNo: string, rank: number }>;
  currentUser: any;
  playerName: string;
  winamt: any;
  denomination_type: any;
  entryFee: any;
  winnerFlag:boolean;
 

  constructor(public router: Router, public cbservice: CashblastService, public soundsrc:SoundService, public auth: AuthService) {
    //this.winnerData = [];
  

    //this.getClaim();
    this.winnerFlag = this.auth.getWinnerFlag();
    if(this.winnerFlag == false){
      this.winamt = this.auth.getWinAmt();
    }else{
      this.winamt = this.auth.getReward();
    }
   
  }

  ngOnInit() {
    this.entryFee = this.auth.getEntryFee();
    this.currentUser = this.auth.getToken();
    this.denomination_type = this.auth.getDenominationType();
    //this.getMargine();
  this.soundsrc.playWinnerSound();
    // this.postRequest("getMargin",{packId:this.auth.getPackId()});

    // let body = {
    //   "gameId": this.auth.getGameId(),

    //   "packId": this.auth.getPackId(),
    //   "gameInstanceId": this.auth.getInstanceId()
    // }
    // let body = {
    //   "gameId": this.auth.getGameId(),
    //   "packId": this.auth.getPackId(),
    //   "instanceId": this.auth.getInstanceId()
    // }
    // this.cbservice.getWinner("getPlayersDetail ", body).then(res => {
    //   console.log("Winner Response===>" + JSON.stringify(res))
    //   if (res.statusCode == 0) {
    //     // this.winnerData=res.data.lstPlayerDetail;
    //     res.data.forEach(element => {
    //       this.winnerData.push({
    //         mobileNo: element.mobileNo,
    //         rank: element.rank
    //       });
    //     })
    //   }
    //   console.log("Winner Array is : " + JSON.stringify(this.winnerData));
    // })
    this.winnerData = this.auth.getWinners();
    console.log("Winner Array is on scorboard: " + this.winnerData);
  }

  getMobileNumberMask(mobileNo) {
    this.playerName = mobileNo.substr(0, 0) + "XXXXXX" + mobileNo.substr(-4);
    return this.playerName;
  }
  getReplay() {
   this.soundsrc.offSound();
    localStorage.removeItem('players');
    this.router.navigate(['/dashboard/cashblast'])
  }
  getHome() {
    this.soundsrc.offSound();
    localStorage.removeItem('players');
    this.router.navigate(['/dashboard']);
  }
  // getMargine() {
  //   let endPoint = "getPrice";
  //   console.log("Intance ID is : ", this.auth.getInstanceId(), " GetEntryFee : ", this.auth.getEntryFee(), " getMarginePrice is : ", this.auth.getMarginePrice());
  //   let body = {

  //     instanceId: this.auth.getInstanceId(),
  //     entryFees: this.auth.getEntryFee(),
  //     marginePrice: this.auth.getMarginePrice()


  //   }
  //   this.cbservice.getMargine(endPoint, body).then((res) => {
  //     console.log("margine res==> ", res);
  //     this.winamt = res.data;
  //   });
  // }  

  // getClaim() {
  //   let endPoint = "claimPrize";
  //   console.log("Intance ID is : ", this.auth.getInstanceId(), " GetEntryFee : ", this.auth.getEntryFee(), " getMarginePrice is : ", this.auth.getMarginePrice());
  //   let body = {

  //     instanceId: this.auth.getInstanceId(),
  //     gameId: this.auth.getGameId(),
  //     packId: this.auth.getPackId(),
  //     rewardValue:this.auth.getReward(),
	//     denominationType:this.auth.getDenominationType()


  //   }
  //   this.cbservice.getClaim(endPoint, body).then((res) => {
  //     console.log("Claim res==> ", res);
   
  //   });
  // }
}
