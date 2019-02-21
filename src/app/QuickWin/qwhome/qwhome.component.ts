import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { QwserviceService } from '../service/qwservice.service';
import { AuthService } from '../../auth.service';
import { SoundService } from '../../service/sound.service';


@Component({
  selector: 'app-qwhome',
  templateUrl: './qwhome.component.html',
  styleUrls: ['./qwhome.component.css']
})
export class QwhomeComponent implements OnInit {

  pack: any;
  packList: any;
  userId: string;
  entryFee: any;
  isActivePlayer: boolean;
  buttonText: any;
  error: boolean;

  constructor(private router: Router, private service: QwserviceService,  public soundsrc:SoundService, private auth: AuthService) {
  
    this.error = false;
  }

  ngOnInit() {
    this.error = false;
    console.log("gameId==> ", this.auth.getGameId());
    this.getActivePlayer();
  }

  getActivePlayer() {
    console.log("game id is : " + this.auth.getGameId());
    let endpoint = "getActivePlayerDetail  ";
    let requestBody = {
      gameId: this.auth.getGameId(),
      userId: this.auth.getUserId()
    }
    this.service.getActivePlayer(endpoint, requestBody).then(value => {
      if (value.data != null) {
        this.isActivePlayer = true;

      } else {
        this.isActivePlayer = false;

      }

      this.getPackList(this.auth.getGameId())


    }, err => {
      console.log("err = >  " + err);
    })
  }



  playNow(pack: any) {
    this.pack = pack;
    this.soundsrc.PlayOnPackClick();
    console.log("pack Data==> ", pack);
    this.auth.setPackId(pack.packId);
    this.entryFee = pack.entryFee;
    this.userId = this.auth.getUserId();
    //paytm integration after Success response navigate to Question
    if (!this.isActivePlayer) {
      this.saveActivePlayer();
    }else{
      this.router.navigate(["/dashboard/quickwin/question"]);
    }
    
  }

  saveActivePlayer() {
    let requestBody = {
      "userId": this.auth.getUserId(),
      "gameId": this.auth.getGameId(),
      "packId": this.auth.getPackId(),
      "totalQuestions": "1"
    };

    this.service.saveActivePlayerDetail("saveActivePlayerDetail", requestBody).then(res => {
      if (res.statusCode == 0) {
        // window.location.href='http://13.233.39.58:8080/MindHunterApi/paytmGateway/'+this.entryFee+'/'+this.userId;
        if(this.pack.denomination_type == "Points"){
          this.router.navigate(["/dashboard/quickwin/question"]);
         }else if (this.pack.denomination_type === "Rs.") {
          let txnamout = this.pack.entryFee;
          let userId = this.auth.getUserId();
          let packId = this.auth.getPackId();
          let instanceId = "5";
          let gameId = this.auth.getGameId();
    
          //window.location.href='http://13.233.39.58:8080/MindHunterApi/paytmGateway';
          this.soundsrc.offSound();
          window.location.href = 'http://13.233.39.58:8092/cms/game/paytmGateway/' + txnamout + '/' + userId + '/' + packId + '/' + instanceId + '/' + gameId;
        }

      }

    }, err => { })
  }
  getPackList(gameId: any) {
    console.log("game id is : " + gameId);
    let endpoint = "getPackList ";
    let requestBody = {
      "gameId": gameId
    }
    this.service.getPackList(endpoint, requestBody).then(value => {
      if (value.statusCode == 0) {
        console.log("pack list is : =>" + JSON.stringify(value.data));
        this.packList = value.data;
      } else {
        let queryParams = {
          "path": "dashboard",
          "message": value.message
        }
        setTimeout(()=>{
          this.router.navigate(['/dashboard/popup', { data: JSON.stringify(queryParams) }], { skipLocationChange: true });
        },1000)
      }
    }, err => {
      console.log("err = >  " + err);
    })
  }

  goDashboard() {
    this.router.navigate(["/dashboard"]);
  }
  getTc() {
   this.router.navigate(["/dashboard/quickwin/tc"]);
  }
  getPastWinner() {
   this.router.navigate(["/dashboard/quickwin/pastwinner"]);
  }
  getFaq() {
   this.router.navigate(["/dashboard/quickwin/faq"]);
  }
}
