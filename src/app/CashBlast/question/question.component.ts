import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { CashblastService } from '../services/cashblast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import Swal from 'sweetalert2';
import { SoundService } from '../../service/sound.service';
//  if(this.player.length>0){
//   let tempPlayer = this.player[0];
//   console.log("current player position==> ",this.player.find(item => item.index));
//   this.player[0] =  this.player[this.player.indexOf(this.player.find(item => item.playerName == this.auth.getToken()))];
//   this.player[this.player.indexOf(this.player.find(item => item.playerName == this.auth.getToken()))] = tempPlayer;
//   console.log(" new Player array===> ",this.player);
//  }



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  winamt: number;
  isPoints: boolean;
  qImage: any;
  timeLeft: number = 20;
  selectedAnsid: any
  startmsg: any;
  interval: any;
  players_length: any;
  public QuesAnsList: any;
  public Questions: any;
  percent: number = 100;
  player: any;
  isDisabled: boolean;
  isOption: boolean;
  quId: any;
  soundMode: string = 'play';
  currentUser: any;
  audio: HTMLAudioElement;
 
  isblast: boolean = false;
  img: any;
  reward: any;
  denomination: any;
  //audioElement = document.createElement('audio');
  sound1: any
  ctx = null
  usingWebAudio = true;
  notBackLooser = false;
  winnerData: Array<{ mobileNo: string, rank: number }>;

  @ViewChild('audioOption') audioPlayerRef: ElementRef;
  constructor(public loc: PlatformLocation, public router: Router, public auth: AuthService,
    public service: CashblastService, public socket: Socket, public cbservice: CashblastService,
    public soundsrc:SoundService, private spinner: NgxSpinnerService) {
    //  this.beginGameSound.src = 'assets/gamesound/BeginGamewhenmatched.wav';
    //this.audioElement.setAttribute('src', 'assets/cashblast/sound/bomBlastSound.wav');
 
    this.player = [];
    this.winnerData = [];
    this.audio = new Audio();
   // this.bombBlastAudcio.src = 'assets/cashblast/sound/sound4.m4r';
    this.audio.src = 'assets/cashblast/sound/song1.mp3';
    

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
      
        console.log(" i m here ==========");
        let pl = this.player.filter(item => item.playerName == this.auth.getToken());

        if (pl.some(item => item.playerName == this.auth.getToken())) {
          pl.find(item => item.playerName == this.auth.getToken()).isBomb = false;
          pl.find(item => item.playerName == this.auth.getToken()).lifeLine = 0;

          //  this.isblast = true;
          let data = { playerName: this.auth.getToken(), gameId: this.auth.getInstanceId(), lifeLine: 3, isBomb: false, isblast: false };


          pl = pl[0];
          this.socket.emit("homePressed", pl);
          console.log("current player==>", JSON.stringify(pl));
          this.notBackLooser =true;
          this.router.navigate(['/dashboard/cashblast'])
        } else {
          console.log("isbomb is false");
        }

      }
    })
  }

  getReward() {
    let endPoint = "getPrice";
    console.log("Intance ID is : ", this.auth.getInstanceId(), " GetEntryFee : ", this.auth.getEntryFee(), " getMarginePrice is : ", this.auth.getMarginePrice());
    let body = {

      instanceId: this.auth.getInstanceId(),
      entryFees: this.auth.getEntryFee(),
      marginePrice: this.auth.getMarginePrice()


    }
    this.cbservice.getMargine(endPoint, body).then((res) => {
      console.log("margine res==> ", res);
      this.reward = res.data;
    });
    
  }

  ngOnInit() {
    this.getReward();
    this.denomination = this.auth.getDenominationType();
 console.log("denomination =============================>",this.denomination);
    setTimeout(() => {
      this.isblast = false
    }, 1000)

    this.player = JSON.parse(localStorage.getItem("players"));
    console.log("players array length ===> " + this.player.length);
    this.players_length = this.player.length;
    this.showNextQuestion();
    this.socket.on("blastBroadcast", (data) => {
      this.isblast = true;
      // this.sound1.play();
     this.soundsrc.playBlast();

      // this.audioElement.load();
      // this.audioElement.addEventListener("canplay", function() {
      //   this.play();

      // }, true);

  

      this.audioPlayerRef.nativeElement.play();


      console.log("blast event Data==> ", data);

    })

  
    this.socket.on("updateLife", (data) => {
      this.player = data;
      this.isDisabled = false;
      console.log("Player Updates Life==>" + JSON.stringify(this.player));
      console.log("Player Updates isOption == > ", this.isOption);
      if (data.some(item => item.playerName == this.auth.getToken())) {
        console.log("before List Start game Of Players==>", JSON.stringify(data));
        this.player = data;

        let currentPlayerIndex = this.player.findIndex(item => item.playerName == this.auth.getToken());
        let temp = this.player[0];
        this.player[0] = this.player[currentPlayerIndex];
        this.player[currentPlayerIndex] = temp;
      }

      console.log("After List Start game Of Players==>", JSON.stringify(this.player));

      this.showNextQuestion();


    });

    this.socket.on("questionBroadcast", (data) => {
      this.Questions = data.qText;
      this.quId = data.qid;
      this.qImage = data.qImage;
      console.log("Question==> ", this.Questions, "image url===> ", data.qImage);
      console.log("questionBroadcast received" + JSON.stringify(data));
    });

    this.socket.on("gameOver",(data) => {
      this.auth.setWinnerFlag(false)
      console.log(" gameOver player length  =========> ",data.length ,"  player List===> ",data);
      this.auth.setWinnerLength(data.length);
     
      this.getWinner();
      this.winamt = this.reward/data.length    
      this.auth.setWinAmt(this.winamt); 
      // this.router.navigate(['/dashboard/cashblast/opponent/playquestion/scoreboard'])
    })



  }

  showNextQuestion() {

    setTimeout(() => {
      this.isblast = false
    }, 1000)

    this.spinner.show();
    clearInterval(this.interval);

    setTimeout(() => {
      this.spinner.hide();
      this.currentUser = this.auth.getToken();
      if (this.player.length == 1) {
        if (this.player.some(item => item.playerName == this.auth.getToken())) {
          console.log("Winner");

          let data = { gameId: this.auth.getInstanceId() };
          this.socket.emit("clearRoom", data);
          setTimeout(() => {
            this.auth.setWinAmt(this.reward);
            this.auth.setWinnerFlag(true)
            this.getWinner();
           
            // this.router.navigate(['/dashboard/cashblast/opponent/playquestion/scoreboard'])
          }, 2000);
        } else {

          console.log("Looser")
          let data = { gameId: this.auth.getInstanceId() };
          this.socket.emit("clearRoom", data);
          if(!this.notBackLooser){
            this.router.navigate(['/dashboard/cashblast/cblooser']);
          }
         
        }

      } else {
        console.log(" Player array===> ", JSON.stringify(this.player.indexOf(this.player.find(item => item.playerName == this.auth.getToken()))));

        this.startTimer();
        this.percent = 100;
        this.timeLeft = 20;

        if (this.player.some(item => item.playerName == this.auth.getToken())) {

          if (this.player.find(item => item.playerName == this.auth.getToken()).isBomb == true) {
            this.isOption = true;

            this.getQuestions();
          } else {
            this.isOption = false;
          }

        } else {
          console.log("Looser");
          clearInterval(this.interval);
          this.router.navigate(['/dashboard/cashblast/cblooser'])
        }

      }

    }, 5000);


  }

  getMobileNumberMask(mobileNo) {
    return mobileNo.substr(0, 0) + "XXXXXX" + mobileNo.substr(-4);
  }



  getQuestions() {
    setTimeout(() => {
      this.isblast = false
    }, 1000)

    let endPoint = "getQuestion";  
    let requestBody = {
      "gameId": this.auth.getGameId(),
      "packId": this.auth.getPackId(),
      "userId": this.auth.getInstanceId(), 
      "season": "NA"
       
    }
    this.service.getQuestion(endPoint, requestBody).then((res) => {
      console.log("questions ans list" + JSON.stringify(res));
      if (res.statusCode == 0) {
        console.log("Api message " + res.message);
        this.QuesAnsList = res.data.ansOption;
        this.Questions = res.data.qText;

        console.log("image url =====> ", this.img);
        this.quId = res.data.qid
        let data = { gameId: this.auth.getInstanceId(), question: res.data };
        this.socket.emit("question", data)
       // this.spinner.hide();
      } else {
        let queryParams = {   
          "path": "dashboard/cashblast",
          "message": res.message
        }
        this.router.navigate(['/dashboard/popup', { data: JSON.stringify(queryParams) }], { skipLocationChange: true });
     
        //this.router.navigate(["/dashboard/cashblast"]);
        console.log("Api message " + res.message);

      }

    });

  }




  getSelectedAns(Ans, index) {
    this.isDisabled = true;
    this.soundsrc.offSound();
    console.log("index is : " + index);
    this.selectedAnsid = index;
    document.getElementById(index).style.backgroundColor = 'skyblue';
    console.log(index + "<==<Answer is => " + Ans);
    this.submitAns(index);

  }

  submitAns(Answer: any) {
    let endPoint = "saveAnswer";
    let spentTime = 20 - this.timeLeft;
    clearInterval(this.interval);
    let requestBody = {
      "qId": this.quId,
      "selectedOption": Answer,
      "uId": this.auth.getUserId(),
      "gameId": this.auth.getGameId(),
      "packId": this.auth.getPackId(),
      "gameInstanceId": this.auth.getInstanceId(),
      "spentTime": spentTime
    }

    this.service.submitAnswer(endPoint, requestBody).then((value) => {
      console.log("questions ans list" + JSON.stringify(value));
      if (value.statusCode == 0) {
        console.log("Api message " + value.message);
        console.log("submit Ans response : " + JSON.stringify(value));
        let correctAnswer = value.data.correctAnswer;
        console.log('correct answer id is : ' + correctAnswer);

        document.getElementById(this.selectedAnsid).style.backgroundColor = '#FF5252';
        document.getElementById(correctAnswer).style.backgroundColor = '#5DF971';

       
        setTimeout(() => {
          let pl = this.player.filter(item => item.playerName == this.auth.getToken());


          if (this.selectedAnsid != correctAnswer) {
            // this.wrongAnsSound.load();
            // this.wrongAnsSound.play();
            // this.wrongAnsSound.volume = 1;
            if (pl.find(item => item.playerName == this.auth.getToken()).isBomb == true) {
              pl.find(item => item.playerName == this.auth.getToken()).isBomb = false;
              pl.find(item => item.playerName == this.auth.getToken()).lifeLine -= 1;

              //  this.isblast = true;
              let data = { playerName: this.auth.getToken(), gameId: this.auth.getInstanceId(), lifeLine: 3, isBomb: false, isblast: false };
              if (this.isblast) {
                this.socket.emit("blast", data);
              }

              pl = pl[0];
              this.socket.emit("manageLife", pl);
              console.log("current player==>", JSON.stringify(pl))
            } else {
              console.log("isbomb is false");
            }
          } else {
            this.soundsrc.playRightAns();
            if (pl.find(item => item.playerName == this.auth.getToken()).isBomb == true) {
              pl.find(item => item.playerName == this.auth.getToken()).isBomb = false;
              pl = pl[0];
              this.socket.emit("manageLife", pl);
            }
            console.log("current player life ==>", JSON.stringify(pl))
          }

        }, 2000);

      } else {
        console.log("Api message " + value.message);

      }

    });
  }



  startTimer() {
    setTimeout(() => {
      this.isblast = false
    }, 1000)


    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.soundsrc.playAnsTimer();
        this.timeLeft--;
        this.percent = this.percent - (100 / 20);
      } else if (this.timeLeft == 0) {
        this.isDisabled = true;
        clearInterval(this.interval);
       

        let pl = this.player.filter(item => item.playerName == this.auth.getToken());
        if (pl.find(item => item.playerName == this.auth.getToken()).isBomb == true) {
          pl.find(item => item.playerName == this.auth.getToken()).isBomb = false;
          pl.find(item => item.playerName == this.auth.getToken()).lifeLine -= 1;
          //   this.isblast = true;
          if (this.isblast) {
            this.socket.emit("blast", pl);
          }
          pl = pl[0];
          console.log("Player NOt Answer===>" + JSON.stringify(pl))
          this.socket.emit("manageLife", pl);
        } else {
          console.log("isbomb is false");
        }


      }

    }, 1000)

  }
  getWinner(){
    console.log("getWinner===>");
    this.getPlayerData();
  }
  getPlayerData(){
    let body = {
      "gameId": this.auth.getGameId(),
      "packId": this.auth.getPackId(),
      "instanceId": this.auth.getInstanceId()
    }
    this.cbservice.getWinner("getPlayersDetail ", body).then(res => {
      console.log("Winner Response===>" + JSON.stringify(res))
      if (res.statusCode == 0) {
        // this.winnerData=res.data.lstPlayerDetail;
        res.data.forEach(element => {
          this.winnerData.push({
            mobileNo: element.mobileNo,
            rank: element.rank
          });
        })
        this.auth.setWinners(this.winnerData);
        this.claimPrize();
      }
      console.log("Winner Array is : " + JSON.stringify(this.winnerData));
    })

  }
  claimPrize(){
    let endPoint = "claimPrize";
    console.log("Intance ID is : ", this.auth.getInstanceId(), " GetEntryFee : ", this.auth.getEntryFee(), " getMarginePrice is : ", this.auth.getMarginePrice());
    let body = {

      instanceId: this.auth.getInstanceId(),
      gameId: this.auth.getGameId(),
      packId: this.auth.getPackId(),
      rewardValue:this.auth.getReward(),
	    denominationType:this.auth.getDenominationType()


    }
    this.cbservice.getClaim(endPoint, body).then((res) => {
      console.log("Claim res==> ", res);
   
        this.router.navigate(['/dashboard/cashblast/opponent/playquestion/scoreboard'])
      
   
    });
  }


  // sound() {
  //   this.bombBlastAudio.load();
  //   this.bombBlastAudio.play();
  //   if (this.audio.volume == 1) {
  //     this.audio.volume = 0;
  //   } else {
  //     this.audio.volume = 1;
  //   }

  // }



  ngOnDestroy() {

    this.soundsrc.offSound();
    clearInterval(this.interval);

  }


}

