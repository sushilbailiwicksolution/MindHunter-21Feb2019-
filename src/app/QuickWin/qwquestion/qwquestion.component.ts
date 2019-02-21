import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { AuthService } from '../../auth.service';
import { QwserviceService } from '../service/qwservice.service';
import { ToastrService } from 'ngx-toastr';
import { SoundService } from '../../service/sound.service';

@Component({
  selector: 'app-qwquestion',
  templateUrl: './qwquestion.component.html',
  styleUrls: ['./qwquestion.component.css']
})
export class QwquestionComponent implements OnInit {
  correctAns: any;
  quesAnsList: any;
  question: any;
  quId: any;
  qImage: any;
  constructor(private router: Router,public toastService:ToastrService,
     private service: QwserviceService, private auth: AuthService, public soundsrc:SoundService) { 

}
  

  getLosser(){
    this.router.navigate(["/dashboard/quickwin/question/looser"]);
  }
  
  getWinner(){
    this.router.navigate(["/dashboard/quickwin/question/winner"]);
  }
  getHome(){
   
      this.router.navigate(["/dashboard/quickwin"]);
   
  }



ngOnInit() {
  this.soundsrc.playGameStart();
 
  this.getQuestions();
}
getQuestions() {
 
  let endPoint = "getQuestion";
  let requestBody = {
    "gameId": this.auth.getGameId(),
  }
  // "packId": "1"
  this.service.getQuickQuestion(endPoint, requestBody).then((value) => {
    console.log("questions ans list" + JSON.stringify(value));
    if (value.statusCode == 0) {
     
      console.log("Api message " + value.statusMessage);
      this.quesAnsList = value.data.ansOption;
      this.question = value.data.qText;
      this.quId = value.data.qid
      this.qImage = value.data.qImage;

    } else {
      let queryParams = {
        "path": "dashboard/quickwin",
        "message": value.statusMessage
      }
      // window.location.href='http://13.233.39.58:8080/MindHunterApi/paytmGateway/'+this.entryFee+'/'+this.userId;
      this.router.navigate(['/dashboard/popup', { data: JSON.stringify(queryParams) }], { skipLocationChange: true });
   
      // this.toastService.success('',value.message);
      // setTimeout(()=>{
      //   this.toastService.clear();
      //   this.router.navigate(["/dashboard/quickwin"])
      // },2000)
     
      console.log("Api message " + value.message);

    }

  });

}

saveAnswer(ans, index) {

  let requestBody = {
    "qId": this.quId,
    "selectedOption": index,
    "uId": this.auth.getUserId(),
    "gameId": this.auth.getGameId(),
    "packId": this.auth.getPackId(),

  }
  this.service.submitAnswer("saveAnswer", requestBody).then(res => {
    console.log("save Answer Response==>", JSON.stringify(res))
    this.correctAns = this.quesAnsList[res.data.correctAnswer];
    console.log("correct Ans==> ",this.correctAns);
    localStorage.setItem("correctAns",this.correctAns);
    localStorage.setItem("ansIndex",res.data.correctAnswer);
    if (res.statusCode == 0) {
      if (res.data.isOptionCorrect) {
        this.soundsrc.playRightAns();
        let data = {
          "userId": this.auth.getUserId(),
          "gameId": this.auth.getGameId(),
          "packId": this.auth.getPackId()
        }
        this.service.clamePrice("claimPrize ", data).then(res => {
         
          if(res.statusCode = 0){
          console.log("With calling clame prize");
          setTimeout(()=>{
            this.router.navigate(["/dashboard/quickwin/question/winner"]);
          },1000)
            
        }else{

          let queryParams = {
            "path": "dashboard",
            "message": res.statusMessage
          }
          this.router.navigate(['/dashboard/popup', { data: JSON.stringify(queryParams) }], { skipLocationChange: true });
    
        }
        }, err => {
          console.log("With calling clame prize Error");
          this.router.navigate(["/dashboard/quickwin/question/winner"]);
        })
      } else {
        this.soundsrc.playWrongAns();
        console.log("Without calling clame prize");
        setTimeout(()=>{
          this.router.navigate(["/dashboard/quickwin/question/looser"])
        },1000)
       
      }

    }else{
      let queryParams = {
        "path": "dashboard",
        "message": res.message
      }
      this.router.navigate(['/dashboard/popup', { data: JSON.stringify(queryParams) }], { skipLocationChange: true });

    }

  }, err => {
    console.log("save Answer Response==>", JSON.stringify(err))
  })

}
}
