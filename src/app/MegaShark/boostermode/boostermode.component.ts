import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { MsserviceService } from '../services/msservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-boostermode',
  templateUrl: './boostermode.component.html',
  styleUrls: ['./boostermode.component.css']
})
export class BoostermodeComponent implements OnInit {
  gameId: any;
  packId: any;
  packType: any;
  normal_QuesAnsList: any;
  Ques_text: any;
  qId: any;
  isDisabled:boolean;
  percent:number=100;
  leftQues:number;
  totalQues:number;
  attentedQues:number =0;
  totalScore:number;
  todayScore:number;
  timeLeft: number =30;
  booster_interval:any;
  userId: string;
  score: number;
  remainQues: any;
  pointsPerQues: number;
  booster_qImage: any;

  constructor(public router: Router,public auth: AuthService,public service:MsserviceService,public Route:ActivatedRoute,public spinner: NgxSpinnerService) {
    this.Route.params.subscribe(val => {
      let params = JSON.parse(val.data);
      console.log("Normal Mode Params are ==> "+params);
      this.packId = params.packId;
      this.packType = params.packType;
      this.totalQues = params.totalQues;
      this.remainQues = params.remainQues;
      this.score = params.score;
      this.attentedQues = this.totalQues - this.remainQues;
      this.pointsPerQues = params.pointsPerQues;
      this.todayScore = params.todayScore;
  });
    this.gameId = this.auth.getGameId();
    this.userId = this.auth.getUserId();
    
   }

  ngOnInit() {
   
      this.getNormalModeQuest(this.gameId,this.packId);
    

  }

  startTimer() {

    this.booster_interval = setInterval(() => {
      if(this.timeLeft > 0) {
     
        this.timeLeft--;
        this.percent = this.percent-(100/30);
        
      }else{
       clearInterval(this.booster_interval);
        this.saveAns("",-1);
       
      
      } 
  
    },1000)
 
  }
  
  goForPack(){
    let queryParam ={
      "tabMode":"normal"
    }
    this.router.navigate(['dashboard/megashark/packlist', { data: JSON.stringify(queryParam) }], { skipLocationChange: true });
  }
  getNormalModeQuest(gameId,packId) {
    

    console.log("game id is : "+gameId);
    console.log("pack id is : "+packId);
    let endpoint = "getQuestion";
    let requestBody = {
      "gameId": gameId,
      "packId": packId
    }
    
      
      this.service.getNormalModeQuestions(endpoint,requestBody).then(value =>{
        console.log("Normal Mode QuesAns list is : =>"+JSON.stringify(value.data));
        this.normal_QuesAnsList = value.data.ansOption;
        this.Ques_text = value.data.qText;
        this.qId=value.data.qid;
        this.booster_qImage = value.data.qImage;
        // this.startTimer();
        // this.timeLeft=30;
        // this.percent=100;
       
     },err=>{
       console.log("Normal Mode err = >  "+err);
     });
    
  
  }

  selectedAnsid:any
  getSelectedAns(Ans,index){

    console.log(" Normal Mode index is : "+index);
    this.selectedAnsid=index;
   
    console.log(index+"<==<Answer is => "+Ans);
    this.saveAns(Ans,index);

  }
  saveAns(Answer,index){
    this.spinner.show();
    this.attentedQues +=1;
    console.log("Attempted Question : "+this.attentedQues);

    if(this.remainQues > 0){
      this.remainQues -= 1;
      console.log("Left Question : "+this.remainQues);
   
        
    }
    let endpoint = 'saveAnswer';
    let requestBody = {
      "qId":this.qId,
      "selectedOption":index,
      "uId":this.auth.getUserId(),
      "gameId":this.auth.getGameId(),
      "packId":this.packId,
      "packType":this.packType,
      "scoreCrieteria":this.pointsPerQues
    }

    
    this.service.submitAnswer(endpoint,requestBody).then(value =>{
      console.log("Normal Mode submit ans response : =>"+JSON.stringify(value.data));
      if(value.statusCode == 0){
        let correctAnswer = value.data.correctAnswer;
       if(index != -1){ document.getElementById(this.selectedAnsid).style.backgroundColor = '#FF5252';
       document.getElementById(correctAnswer).style.backgroundColor = '#5DF971';
        this.isDisabled=true;
        
        
       // clearInterval(this.booster_interval);
      }
      if(correctAnswer == this.selectedAnsid){
        this.score = Number(this.score) + this.pointsPerQues;
      }
      
       if(this.remainQues > 0){
        setTimeout(()=>{
          this.spinner.hide();
          this.getNormalModeQuest(this.gameId,this.packId);
        },2000);
      }else if(this.remainQues == 0){
        this.spinner.hide();
        this.scoreBoard();
      }
        
      }
      
   },err=>{
     console.log(" Normal Mode submit ans err = >  "+err);
   });

  

  }
  scoreBoard(){
    let queryParam = {
      "remainQues": this.remainQues,
       "score":this.score,
       "attentedQues":this.attentedQues,
       "totalQues":this.totalQues,
      "packId":this.packId,
      "packType":this.packType,
      "scoreCrieteria":this.pointsPerQues,
      "todayScore":this.todayScore
      
    }
    this.router.navigate(['dashboard/megashark/scoreboard', { data: JSON.stringify(queryParam) }], { skipLocationChange: true });
  }
  ngOnDestroy(){
    //clearInterval(this.booster_interval);
  }
}
