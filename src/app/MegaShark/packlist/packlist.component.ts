import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MsserviceService } from '../services/msservice.service';
import { AuthService } from 'src/app/auth.service';
import { SoundService } from '../../service/sound.service';

@Component({
  selector: 'app-packlist',
  templateUrl: './packlist.component.html',
  styleUrls: ['./packlist.component.css']
})
export class PacklistComponent implements OnInit {
  gameId: any;
  normal_packList: Array<{
    "denomination_type": any,
    "entryText": any,
    "margin": any,
    "pointsPerQuestion": any,
    "season": any,
    "packId": any,
    "gameId": any,
    "packTitle": any,
    "entryFee": any,
    "description": any,
    "tAndC": any,
    "totalQ": any,
    "reward": any,
    "lifeLines": any,
    "maxPlayer": any,
    "minPlayer": any,
    "qlevel": any,
    "winnerMsg": any,
    "loserMsg": any,
    "maxPlayTime": any,
    "timePerQ": any,
    "packType": any,
    "isRemainQues": any,
    "todayScore":any
  }> = [];


  packList: any;
  totalQues: any;
  entryFee: any;
  starter_packId: any;
  userId: string;
  starter_packType: any;
  isRemainQues: boolean = false;
  isPush: boolean = true;
  starter_isResume: any;
  remainingQues: any;
  activePlayerDetail: any;
  normalTab: boolean = true;
  boosterTab: boolean = false;
  tabMode: any;
  starter_pointsPerQuestion: any;
  todayScore: number = 0;
  starter_todayScore: any;
  denominationType : string;
  s_denominationType : string;

  constructor(public router: Router, public service: MsserviceService, public soundsrc :SoundService, public auth: AuthService, public Route: ActivatedRoute) {
    this.Route.params.subscribe(val => {
      let params = JSON.parse(val.data);
      console.log("Normal Mode Params are ==> " + params);
      this.tabMode = params.tabMode;
      if (this.tabMode === "normal") {
        this.normalTab = true;
        this.boosterTab = false;
      } else if (this.tabMode === "booster") {
        this.normalTab = false;
        this.boosterTab = true;
      }

    });
    this.gameId = this.auth.getGameId();
    this.userId = this.auth.getUserId();
    console.log("Game id is : " + this.gameId);


  }

  ngOnInit() {
    this.normal_packList = [];
    this.getActivePlayerDetail();


  }
  newPackList() {
    console.log("ActiveplayerList is : " + JSON.stringify(this.activePlayerDetail));

    this.normal_packList = this.packList;
    this.packList.forEach((element, index) => {
      this.normal_packList[index].isRemainQues = this.isRemainQues;
      this.normal_packList[index].todayScore = this.todayScore;
    });
    if (this.activePlayerDetail.length > 0) {
      this.activePlayerDetail.forEach(element => {
        let activeUserPackId = element.packId;
        this.todayScore = element.todayScore;
        this.remainingQues = element.remainingQuestion;
        this.normal_packList.forEach((element, index) => {
          if (element.packId == activeUserPackId && this.remainingQues > 0 && this.remainingQues != element.totalQ) {
            this.isRemainQues = true;
            this.normal_packList[index].isRemainQues = this.isRemainQues;
            this.normal_packList[index].todayScore = this.todayScore;
          }
          if (element.packType == 0) {
            this.totalQues = element.totalQ;
            this.entryFee = element.entryFee;
            this.starter_packId = element.packId;
            this.starter_packType = element.packType;
            this.starter_isResume = element.isRemainQues;
            this.starter_pointsPerQuestion = element.pointsPerQuestion;
            this.starter_todayScore = element.todayScore;
            this.s_denominationType = element.denomination_type;
            console.log("starter denomination type is "+this.s_denominationType);
        }

        });
      });
    } else {
      this.normal_packList.forEach((element, index) => {
        if (element.packType == 0) {
          this.totalQues = element.totalQ;
          this.entryFee = element.entryFee;
          this.starter_packId = element.packId;
          this.starter_packType = element.packType;
          this.starter_isResume = element.isRemainQues;
          this.starter_pointsPerQuestion = element.pointsPerQuestion;
          this.starter_todayScore = element.todayScore;
          this.s_denominationType = element.denomination_type;
          console.log("starter denomination type is "+this.s_denominationType);
        }

      });
      console.log("*-------Please buy any pack ------*");
    }

    console.log(" New packList is ====> " + JSON.stringify(this.normal_packList));
  }

  normalmode() {
    if (!this.starter_isResume) {
      this.saveActivePlayerDetail(this.gameId, this.starter_packId, this.totalQues, this.userId, this.starter_packType);
    }

    let remainQues = this.totalQues;
    let score = 0;
    let todayScore = 0;
    if (this.activePlayerDetail.length > 0) {
      this.activePlayerDetail.forEach(element => {
        if (element.packId == this.starter_packId) {
          score = element.score;
          remainQues = element.remainingQuestion;
          todayScore = element.todayScore;
        }

      });
    }
    if(this.s_denominationType != 'Points'){
      // let txnamout = this.entryFee;
      // let userId = this.auth.getUserId();

      // //window.location.href='http://13.233.39.58:8080/MindHunterApi/paytmGateway';
      // window.location.href = 'http://13.233.39.58:8080/MindHunterApi/paytmGateway/' + txnamout + '/' + userId;
      let txnamout = this.entryFee;
      let userId = this.auth.getUserId();
      let packId = this.auth.getPackId();
      let instanceId = "5";  
      let gameId = this.auth.getGameId();

      //window.location.href='http://13.233.39.58:8080/MindHunterApi/paytmGateway';
      this.soundsrc.offSound();
      window.location.href = 'http://13.233.39.58:8092/cms/game/paytmGateway/' + txnamout + '/' + userId + '/' + packId + '/' + instanceId + '/' + gameId;
    
      console.log("Go to payment Getway");
    }else{
     
    let queryParam = {
      "packType": this.starter_packType,
      "packId": this.starter_packId,
      "totalQues": this.totalQues,
      "remainQues": remainQues,
      "score": score,
      "pointsPerQues":this.starter_pointsPerQuestion,
      "todayScore":this.starter_todayScore,
    }
    if (this.normalTab) {
      localStorage.setItem("pack", "1");
      this.router.navigate(['dashboard/megashark/packlist/normalmode', { data: JSON.stringify(queryParam) }], { skipLocationChange: true });
    } else if (this.boosterTab) {
      localStorage.setItem("pack", "2");
      this.router.navigate(['dashboard/megashark/packlist/boostermode', { data: JSON.stringify(queryParam) }], { skipLocationChange: true });
    }
 
  }
  }


  getActivePlayerDetail() {
    let endpoint = "getActivePlayerDetail";
    let requestBody1 = {
      "userId": this.userId,
      "gameId": this.gameId
    }
    this.service.getActivePlayerDetails(endpoint, requestBody1).then(value => {
      if (value.data == null) {
        this.activePlayerDetail = [];
      } else if (value.data.length != 0) {
        this.activePlayerDetail = value.data;
        value.data.forEach((element, index) => {
          if ((element.remainingQuestion < 0) || (element.remainingQuestion == 0)) {
            this.activePlayerDetail[index].remainingQuestion = element.totalQuestions;
          }
        });

      }
      this.getPackList();

    }, err => {
      console.log("Normal Mode getActivePlayer Detail err ==> " + err);
    });
  }


  getPackList() {
    let endpoint = "getPackList ";
    let requestBody1 = {
      "gameId": this.gameId
    }

    this.service.getPackList(endpoint, requestBody1).then(value => {

      this.packList = value.data;
      this.newPackList();

    }, err => {
      console.log("err = >  " + err);
    });

  }

  selectedPack(pack) {
    localStorage.setItem("pack", pack.packType);

    let gameId = pack.gameId;
    let packId = pack.packId;
    let totalQ = pack.totalQ;
    let packType = pack.packType;
    let pointsPerQues = pack.pointsPerQuestion;
    this.denominationType = pack.denomination_type;
    
    if (!pack.isRemainQues) {
      this.saveActivePlayerDetail(gameId, packId, totalQ, this.userId, packType);
    }
    let remainQues = totalQ;
    let score = 0;
    let todayScore = 0;
    if (this.activePlayerDetail.length > 0) {
      this.activePlayerDetail.forEach(element => {
        if (element.packId == packId) {
          score = element.score;
          remainQues = element.remainingQuestion;
          todayScore = element.todayScore;
        }

      });
    }
if(this.denominationType != 'Points'){
 

      //window.location.href='http://13.233.39.58:8080/MindHunterApi/paytmGateway';
     // window.location.href = 'http://13.233.39.58:8080/MindHunterApi/paytmGateway/' + txnamout + '/' + userId;
      let txnamout = pack.entryFee;
      let userId = this.auth.getUserId();
      let packId = this.auth.getPackId();
      let instanceId = "5";
      let gameId = this.auth.getGameId();

      //window.location.href='http://13.233.39.58:8080/MindHunterApi/paytmGateway';
      this.soundsrc.offSound();
      window.location.href = 'http://13.233.39.58:8092/cms/game/paytmGateway/' + txnamout + '/' + userId + '/' + packId + '/' + instanceId + '/' + gameId;
  
     
      console.log("Go to payment Getway");
}else{

    if (packType == 1) {


      let queryParam = {
        "packType": packType,
        "packId": packId,
        "totalQues": totalQ,
        "remainQues": remainQues,
        "score": score,
        "pointsPerQues":pointsPerQues,
        "todayScore":todayScore,
      }
      this.router.navigate(['dashboard/megashark/packlist/normalmode', { data: JSON.stringify(queryParam) }], { skipLocationChange: true });
    } else if (packType == 2) {
      let queryParam = {
        "packType": packType,
        "packId": packId,
        "totalQues": totalQ,
        "remainQues": remainQues,
        "score": score,
        "pointsPerQues":pointsPerQues,
        "todayScore":todayScore,
      }
      this.router.navigate(['dashboard/megashark/packlist/boostermode', { data: JSON.stringify(queryParam) }], { skipLocationChange: true });

    }
      
}

  }



  saveActivePlayerDetail(gameId, packId, totalQ, userId, packType) {

    let endpoint = "saveActivePlayerDetail";
    let requestBody = {

      "userId": userId,
      "gameId": gameId,
      "packId": packId,
      "totalQuestions": totalQ

    }
    this.service.saveActivePlayerDetail(endpoint, requestBody).then(value => {
      console.log("Saved active player detail ==> " + JSON.stringify(value));


    }, err => {
      console.log("err ==> " + err);
    });
  }

  ngOnDestroy() {
    this.normal_packList = [];
  }

  getBoosterMode(){
    this.router.navigate(['/dashboard/megashark/packlist/normalmode']);

  }
  getNormalMode(){
    this.router.navigate(['/dashboard/megashark/packlist/boostermode'])
  }
  pastWinners() {
    this.router.navigate(['dashboard/megashark/packlist/pastwinner'])
  }
}
