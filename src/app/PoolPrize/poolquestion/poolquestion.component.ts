import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { NgxSpinnerService } from '../../../../node_modules/ngx-spinner';
import { AuthService } from '../../auth.service';
import { PPService } from '../ppservice/pp.service';
import Swal from 'sweetalert2';
import { SoundService } from '../../service/sound.service';

@Component({
  selector: 'app-poolquestion',
  templateUrl: './poolquestion.component.html',
  styleUrls: ['./poolquestion.component.css']
})
export class PoolquestionComponent implements OnInit {

  remainingQuestion: any;
  tier: any;
  score: void;
  activePlayer: any;
  percent: number = 100;
  timeLeft: number = 30;
  answers: any;
  packdata: any;
  totalQ: any;
  qId: any;
  quesData: any;
  question: any;
  isOption: boolean;
  questionleft: any;
  questionplayed: any;
  totalquestion: any;
  correctAnswer: number = 0;
  npath: string;
  qImage: any;
  isDisabled:boolean = true;


  constructor(public router: Router,
    public soundsrc:SoundService,
    private spinner: NgxSpinnerService,
    public auth: AuthService,
    public service: PPService,
    public actroute: ActivatedRoute,
  ) {
    //this.isDisabled = true;

    //this.getActivePlayer();
    this.actroute.params.subscribe(value => {
      let params = JSON.parse(value.data);
      this.totalquestion = params.totalQues;
      this.questionleft = params.remainQues;
      this.correctAnswer = params.score;
      this.questionplayed = this.totalquestion - this.questionleft;
    });
    console.log("totalquestion ===> ",this.totalquestion,"  questionleft ===> ",this.questionleft,"  score == > ",this.score);
  }

  ngOnInit() {
    this.soundsrc.playGameStart();
    //this.isDisabled = true;
    this.getQuestion();
    

  }

  goBack(){

    this.router.navigate(["/dashboard/poolprice"]);
  }
  getQuestion() {
    console.log("correct Ans========count=>",this.correctAnswer);
   
     
    
    if (this.questionleft > 0) {
      
      let endpoint = "question";
      let requestBody = {
        userId: this.auth.getUserId(), 
        gameId: this.auth.getGameId(),
        packId: this.auth.getPackId(),
        season: "NA"
      }
      console.log("request==>  ", requestBody)
      this.service.getQuestion(endpoint, requestBody).then((value) => {
        if(value.statusCode == 0){
          
        this.quesData = value.data;
        this.question = value.data.qText;
        this.answers = value.data.ansOption;
        this.qId = value.data.qid;
        this.qImage= value.data.qImage;
      // this.qImage = "http://13.233.39.58:8080/gamesImages/gutthi.png" ;
        // document.getElementById("0").style.backgroundColor = '#3b4155';
        // document.getElementById("0").style.color = '#FFF';
        // document.getElementById("1").style.backgroundColor = '#3b4155';
        // document.getElementById("1").style.color = '#FFF';
        // document.getElementById("2").style.backgroundColor = '#3b4155';
        // document.getElementById("2").style.color = '#FFF';
        // document.getElementById("3").style.backgroundColor = '#3b4155';
        // document.getElementById("3").style.color = '#FFF';
        console.log("qId==> ", this.qId);
        console.log("ques Data==> ", JSON.stringify(this.quesData));
        this.spinner.hide();

        }else{
          let queryParams = {
            "path": "dashboard/poolprize",
            "message": value.message
          }
          this.router.navigate(['/dashboard/popup', { data: JSON.stringify(queryParams) }], { skipLocationChange: true });
       
          //this.router.navigate(["/dashboard/poolprize"]);
        }
      }, err => {
        console.log("err = >  " + err);
      })
    } else {
      console.log("ready to get claim")
     
       this.getClaim();

    }
  }
  answer(ans, i) {
    //this.isDisabled = false;
    this.spinner.show();
    this.questionplayed += 1;
    this.questionleft -= 1;
    let endpoint = "saveAnswer ";
    let requestBody = {
      gameId: this.auth.getGameId(),
      packId: this.auth.getPackId(),
      qId: this.qId,
      selectedOption: i,
      uId: this.auth.getUserId(),

    }

    console.log("ans==> ", ans, " index==> ", i);
    console.log("request==>  ", requestBody)
    this.service.saveAnswer(endpoint, requestBody).then(value => {
      console.log("Ans Data==> ", JSON.stringify(value));
      if (value.statusCode == 0) {
        if (i != -1) {
          console.log("correct Ans==> ", value.data.correctAnswer, ",  index==> ", i);
          document.getElementById(i).style.backgroundColor = '#FF5252'
          document.getElementById(value.data.correctAnswer).style.backgroundColor = '#5DF971'
        }
       
        if (value.data.correctAnswer == i || value.data.isOptionCorrect == true) {
          this.correctAnswer++;
        this.soundsrc.playRightAns();
        }else {
          this.soundsrc.playWrongAns();
        }
        //this.correctAnswer
        setTimeout(() => {
         //this.spinner.hide();
          clearInterval(this.interval);
          this.getQuestion();
        }, 2000);
        
      }else{
        let queryParams = {
          "path": "dashboard/poolprize",
          "message": value.message
        }
        this.router.navigate(['/dashboard/popup', { data: JSON.stringify(queryParams) }], { skipLocationChange: true });
     
      }


    }, err => {
      console.log("err = >  " + err);
    })

    // this.router.navigate(['/dashboard/poolprice/tier'], { skipLocationChange: true });
  }
  interval: any;
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        console.log("timer if")
        this.timeLeft--;
        this.percent = this.percent - (100 / 30);
      } else {
        clearInterval(this.interval);
        this.answer(-1, -1);
      }
    }, 1000);


  }
  getClaim() {
    console.log("get claim=============>")
    if(this.correctAnswer == 20){
     this.tier = 1;
    }else if(this.correctAnswer == 19){
      this.tier = 2;
    }else if(this.correctAnswer == 18){
      this.tier = 3;
    }else {
      this.tier = 0;
    }
    let endPoint = "claimPrizeForPoolPrize"
    let reqbody = {
      userId: this.auth.getUserId(),
      gameId: this.auth.getGameId(),
      packId: this.auth.getPackId(),
      totalCorrectAnswer:this.correctAnswer,
      tierValue:this.tier
      //stopPointId: this.winnerData.id,
      //alternateMobileNumber:this.claimForm.value.mobileNo,
    }
    console.log("request====> ", reqbody)
    this.service.getClaim(endPoint, reqbody).then((values) => {

      console.log("res data==> ", JSON.stringify(values));
      if (values.statusCode == 0) {
        let scoreData = {
          correctAnswer: this.correctAnswer,
          totalQuestion: this.totalquestion
        }
        console.log("claimed======> ",this.correctAnswer)
         if(this.correctAnswer ==19 && this.questionleft==0){
           console.log("19 correct ans")
          this.router.navigate(["/dashboard/poolprize/question/winnerscore", { score: JSON.stringify(scoreData) }], { skipLocationChange: true });
        }else if(this.correctAnswer ==18 && this.questionleft==0){
          console.log("18 correct ans")
          this.router.navigate(["/dashboard/poolprize/question/winnerscore", { score: JSON.stringify(scoreData) }], { skipLocationChange: true });
        }else if(this.correctAnswer < 18 && this.questionleft==0){
          console.log("<18 correct ans")
          this.router.navigate(["/dashboard/poolprize/question/looserscore" , { score: JSON.stringify(scoreData) }], { skipLocationChange: true });
        }else if(this.correctAnswer == 20 && this.questionleft==0){
          console.log("20 correct ans")
          this.router.navigate(["/dashboard/poolprize/question/winners", { score: JSON.stringify(scoreData) }], { skipLocationChange: true });
        }
       // this.router.navigate(["/dashboard/poolprice/tier", { score: JSON.stringify(scoreData) }], { skipLocationChange: true });
      }else{
        let queryParams = {
          "path": "dashboard/poolprize",
          "message": values.message
        }
        this.router.navigate(['/dashboard/popup', { data: JSON.stringify(queryParams) }], { skipLocationChange: true });
     
      }
    })
  }
  ngOnDesdroy() {
    clearInterval(this.interval);
  }
  getPastWinner() {
    this.router.navigate(["dashboard/poolprice/pastwinner"]);

  }
  getTC() {
        this.router.navigate(["/dashboard/poolprice/tc"]);
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
        this.activePlayer = value.data[0];
        console.log("getActivePlayerDetail response   : =>" + JSON.stringify(value));
        console.log("remainingQuestion=== >", this.activePlayer.remainingQuestion);
        this.questionleft = this.activePlayer.remainingQuestion;
        this.correctAnswer = this.activePlayer.score;
        this.totalquestion = this.activePlayer.totalQuestions
        this.questionplayed = this.totalquestion - this.questionleft;
 
        this.getQuestion();
      }
    }, err => {
      console.log("err = >  " + err);
    })
  }
  backToHome() {
 

  
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you realy want to exit !",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#808080',
      cancelButtonColor: '#ff6d00',
      confirmButtonText: 'Exit',
      cancelButtonText: 'Continue'  
    }).then((result) => {
      if (result.value) {
        // Swal.fire(
        // 'Deleted!',
        // 'Your file has been deleted.',
        // 'success'
        // )
        // this.onPopState(event);
      //   this.loc.onPopState(() => {

      //     console.log('pressed back!===============================');
     
      // });
        console.log(" i m here ==========");
       
        this.router.navigate(["/dashboard/poolprize"]);
      }
    })
  }

getlooser(){
  this.router.navigate(["/dashboard/poolprize/question/looserscore"])
}
getWinner(){
  this.router.navigate(["/dashboard/poolprize/question/winnerscore"])

}
getHome(){
  this.router.navigate(["/dashboard/poolprize"])
}
}
