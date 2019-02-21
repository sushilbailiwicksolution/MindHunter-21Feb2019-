import { Component, OnInit } from '@angular/core';
import { MsserviceService } from '../services/msservice.service';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute,  Router } from '@angular/router';

@Component({
  selector: 'app-msscoreboard',
  templateUrl: './msscoreboard.component.html',
  styleUrls: ['./msscoreboard.component.css']
})
export class MsscoreboardComponent implements OnInit {
  packId: any;
  packType: any;
  totalQues: any;
  remainQues: any;
  score: any;
  attentedQues: number;
  requiredPoints:number;
  pointsPerQues: any;
  todaySore: any;

  constructor(public router :Router,public acRoute: ActivatedRoute,public service:MsserviceService,public auth: AuthService) {
    this.acRoute.params.subscribe(val => {
      let params = JSON.parse(val.data);
      console.log("Normal Mode Params are ==> "+params);
      this.packId = params.packId;
      this.packType = params.packType;
      this.totalQues = params.totalQues;
      this.remainQues = params.remainQues;
      this.score = params.score;
      this.attentedQues = params.attentedQues;
      this.pointsPerQues = params.scoreCrieteria,
      this.todaySore = params.todayScore,
      this.requiredPoints = (this.totalQues *  this.pointsPerQues)-this.score;
      
  });
  } 

  
  ngOnInit() {
    this.getScoreBoard();
    
    
  }
  claim() {
    let endPoint = 'claimPrize ';
    let requestBody = {

      "userId": this.auth.getUserId(),
      "gameId": this.auth.getGameId(),
      "packId": this.packId
    }
    this.service.applyClaim(endPoint,requestBody).then(value =>{
      console.log("claim api response is ===> "+JSON.stringify(value));
    },error =>{

    });
  }
  getScoreBoard() {
    let endPoint = 'getActivePlayerDetail ';
    let requestBody = {

      "userId": this.auth.getUserId(),
      "gameId": this.auth.getGameId(),
     
    }
    this.service.getActivePlayerDetails(endPoint,requestBody).then(value =>{
      console.log("claim api response is ===> "+JSON.stringify(value));
      if(this.remainQues == 0){
        this.claim();
      }
    },error =>{
      console.log("error  : ",error);
    });
  }
  goForPack(modeType){
    let queryParam ;
    if(modeType === "1"){
      queryParam ={
        "tabMode":"normal"
      }
    }else if(modeType === "2"){
      queryParam ={
        "tabMode":"booster"
      }
    }
    this.router.navigate(['dashboard/megashark/packlist', { data: JSON.stringify(queryParam) }], { skipLocationChange: true });
  }
}
    