import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { AuthService } from '../../auth.service';
import { PPService } from '../ppservice/pp.service';
import { SoundService } from '../../service/sound.service';

@Component({
  selector: 'app-poolwinner',
  templateUrl: './poolwinner.component.html',
  styleUrls: ['./poolwinner.component.css']
})
export class PoolwinnerComponent implements OnInit {
  winningamt: any;
  scoreData: any;
  totalQuestion: any;
  score: any;
  tier:any;
  tier_amount:any;
  percent:any;
  compareDate: Date;
  timer: any;
  isPackActive: boolean;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;

  gameId: string;
  tiers: any;

  constructor(public router:Router,public actroute:ActivatedRoute,public auth:AuthService,
    public service:PPService,public soundsrc:SoundService) { 
  //  this.getCountDown();
  
  }

  ngOnInit() {
    this.soundsrc.playWinnerSound();
    this.tier = 1;
    this.getTier();
    this.actroute.params.subscribe(value => {
      this.scoreData = JSON.parse(value.score);
      this.totalQuestion = this.scoreData.totalQuestion;
      this.score = this.scoreData.correctAnswer;
      if(this.score == 20){
        document.getElementById('h1_0').style.background='#fdda00';
        document.getElementById('h2_0').style.background='#fdda00';
        document.getElementById('h3_0').style.background='#fdda00';
      }else if(this.score == 19){
        document.getElementById('h1_1').style.background='#fdda00';
        document.getElementById('h2_1').style.background='#fdda00';
        document.getElementById('h3_1').style.background='#fdda00';
      }else if(this.score == 18){
        document.getElementById('h1_2').style.background='#fdda00';
        document.getElementById('h2_2').style.background='#fdda00';
        document.getElementById('h3_2').style.background='#fdda00';
      }
      console.log("Score Data==> ",this.scoreData)
      console.log("score==> ",this.scoreData.correctAnswer,",  totalques==> ",this.scoreData.totalQuestion)
    })
  }
  getHome(){
    this.soundsrc.offSound();
    this.router.navigate(["/dashboard"]);
  }    
  getTier() {
    this.gameId = this.auth.getGameId();
    console.log("game id is : " + this.gameId);
    let endpoint = "getTier";
    let requestBody = {
      gameId: this.gameId
    }
    this.service.getTier(endpoint, requestBody).then(value => {
      
      if(value.statusCode==0){
        this.tiers = value.data;
        this.winningamt = this.tiers[0].reward;
        console.log("winner amt=== => ",this.winningamt);
     
        
      }else{
        let queryParams = {
          "path": "dashboard",
          "message": value.message
        }
        this.router.navigate(['/dashboard/popup', { data: JSON.stringify(queryParams) }], { skipLocationChange: true });

      }
      console.log("Tiers   : =>" + JSON.stringify(value));

    }, err => {
      console.log("err = >  " + err);
    })
  }
  
  getCountDown(){
    let date:string = this.auth.getGameSeasonTime().toString();
    //let date:string = "2019-01-04 00:00:00.0"
    console.log("Date is =====> ",date);
    let toYear = Number(date.split('-')[0]);
    let toMonth=Number(date.split('-')[1])-1;
    let todate=Number(date.split('-')[2].split(' ')[0]);
    let toHour=Number(date.split(' ')[1].split(':')[0]);
    let toMinute =Number(date.split(':')[1]);
    let toSecond = Number(date.split(':')[2].split('.')[0]);
    //new Date(2019,0,4,0,0,0)
    //this.compareDate = new Date(2019,0,12,0,0,0);
    this.compareDate = new Date(toYear,toMonth,todate,toHour,toMinute,toSecond)
    console.log("year ==> ",toYear," month ==> ",toMonth," date ==> ",todate," hour ==> ",toHour," minute ==> ",toMinute," second ==> ",toSecond);
    this.timer = setInterval(()=>{
    this.timeBetewwbDates(this.compareDate);
    },1000);
    }
  timeBetewwbDates(toDate){
   let dateEntered = toDate;
   
   let now = new Date();
   
   let difference = dateEntered.getTime() - now.getTime();
   //console.log("time Diff==> ",difference)
   
   if (difference <= 0){
    console.log("time Diff==> ",difference)
     this.isPackActive=false;
     console.log("isPackActive==> ",this.isPackActive)
     clearInterval(this.timer);
   }
   else{
    this.isPackActive=true;
    //console.log("else isPackActive==> ",this.isPackActive)
      this.seconds = Math.floor(difference / 1000);
      
      this.minutes = Math.floor(this.seconds / 60);
      
      this.hours = Math.floor(this.minutes / 60);
     
      this.days = Math.floor(this.hours / 24);
      

      this.hours %= 24;
      this.minutes %= 60;
      this.seconds %= 60;
     // console.log("day==> ",this.days,"  hh==> ",this.hours,",  min==> ",this.minutes,",  sec==> ",this.seconds);
      

   }
  }
 

}
