import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { CashblastService } from '../services/cashblast.service';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { HostListener } from '@angular/core';
import { PlatformLocation, Location } from '@angular/common'
import { SoundService } from '../../service/sound.service';

@Component({
  selector: 'app-opponent',
  templateUrl: './opponent.component.html',
  styleUrls: ['./opponent.component.css']
})
export class OpponentComponent implements OnInit {
  timer: any;
  isPoints: boolean;
  tempPlayerData: any;
  currentUser: any;
  instanceId: any;

  timerValue: any = 0;
  denomination: any;
  reward: any;
  isPopup: boolean;
  player: Array<{ playerName: string, gameId: any, mySocketId: string }>;
  constructor(public ref: ChangeDetectorRef, public spinner: NgxSpinnerService,
    public socket: Socket, public auth: AuthService, public router: Router,
    public service: CashblastService, public cbservice: CashblastService,public soundsrc:SoundService, public location: PlatformLocation) {
    // this.sendMessage();

    // this.location.onPopState(() => {
    //   console.log("back Button ==============================>");
    //   this.backToHome()
    //   // this.router.navigateByUrl("/dashboard/cashblast/opponent");

    //   });
   
  
    this.instanceId = localStorage.getItem('instanceId');
    this.player = [];
    this.timer = [];


    this.socket.on("timertick", (data) => {
     
      this.timer.push(data);
      this.timerValue = data.timertick;
      console.log("Timer VAlue==>" + this.timerValue);
      if (this.timerValue == 0) {
        console.log("Timer Array===> ", this.timer)
        this.timer = [];
        this.spinner.show()
      } else {
        this.soundsrc.playtimerTick();
        // this.timerSound.load();
        // this.timerSound.play();
        //this.timerSound.volume = 1;

      }
    });


    this.socket.on("playerLeft", (data) => {
      console.log("after Player Left users", JSON.stringify(data));
      this.getClearData();
      this.router.navigate(['dashboard/cashblast']);
      this.player = data;

    });

    this.socket.on("startgame", (data) => {

      let body = { instanceId: this.instanceId };
      this.service.gameInstanceStart("updateInstanceStatus", body).then((res) => {
        console.log("Status Begin game==>", JSON.stringify(res))
        if (res.statusCode == 0) {
          if (data.some(item => item.playerName == this.auth.getToken())) {
            console.log("before List Start game Of Players==>", JSON.stringify(data));
            this.tempPlayerData = data;

            let currentPlayerIndex = this.tempPlayerData.findIndex(item => item.playerName == this.auth.getToken());
            let temp = this.tempPlayerData[0];
            this.tempPlayerData[0] = this.tempPlayerData[currentPlayerIndex];
            this.tempPlayerData[currentPlayerIndex] = temp;
          }
          localStorage.setItem("players", JSON.stringify(this.tempPlayerData));
          console.log("After List Start game Of Players==>", JSON.stringify(this.tempPlayerData));
    
          this.spinner.hide()
          this.soundsrc.offSound();
          this.router.navigate(['/dashboard/cashblast/opponent/playquestion']);

        } else {
          console.log("updateInstanceStatus fail room not locked statusCode : ", res.statusCode);
        }

      }, err => {
        console.log("Status Begin game err ==>", JSON.stringify(err))
      });
      // if(data.some(item => item.playerName == this.auth.getToken())){
      //   let temp = data[0];
      // console.log("player on 0th position ===> ",temp);
      // data[0]= data.find(item => item.playerName == this.auth.getToken());
      // console.log("player on 0th position ===> ",data[0]);
      // data[data.findIndex(item => item.playerName == this.auth.getToken())]=temp;
      // console.log("List Start game Of Players==>", JSON.stringify(data));
      // }
      // localStorage.setItem("players",JSON.stringify(data));
      //console.log("List Start game Of Players==>", JSON.stringify(data));

    });

    this.socket.on("notmatch", (data) => {
      console.log("userlet===> ", data);
      this.getRefund();
    })

    this.socket.on("players", (data) => {
      this.player = [];
      this.player = data;
      //  this.ref.detectChanges();

      this.getReward();

      console.log("List Of Players==>", JSON.stringify(data));

    });
  }





  backToHome() {


    this.isPopup = true;
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
        let pl = this.player.filter(item => item.playerName == this.auth.getToken());
        this.socket.emit("playerRemove", pl);
        this.router.navigate(["/dashboard/cashblast"]);
      }
    })
  }

  getMobileNumberMask(mobileNo) {
    return mobileNo.substr(0, 0) + "XXXXXX" + mobileNo.substr(-4);
  }
  ngOnInit() {
  
    this.denomination = this.auth.getDenominationType();
    if (this.denomination === 'points') {
      this.isPoints = true;
    } else {
      this.isPoints = false;
    }
    this.currentUser = this.auth.getToken()

    this.socket.on("playerJoinedRoom", (data) => {

      console.log("Joined", JSON.stringify(data));

      console.log("Players==>" + JSON.stringify(this.player))
      //  this.socket.emit("playerJoinGame",data);
      //this.gameInit(data);
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
  sendMessage() {
    //this.socket.emit("hostCreateNewGame");
  }

  getRefund() {
    let body = {
      "gameId": this.auth.getGameId(),
      "packId": this.auth.getPackId(),
      "gameInstanceId": this.auth.getInstanceId(),
      "userId": this.auth.getUserId()

    }
    this.service.getRefund("paytmRefund", body).then(res => {
      console.log("Winner Response===>" + JSON.stringify(res))
      if (res.statusCode == 0) {
        this.getClearData();
      }

    })

  }
  getClearData() {
    let body = {
      "gameId": this.auth.getGameId(),

      "packId": this.auth.getPackId(),
      "gameInstanceId": this.auth.getInstanceId()
    }
    this.service.getWinner("getwinnerDetail ", body).then(res => {
      console.log("Winner Response===>" + JSON.stringify(res))
      if (res.statusCode == 0) {
        let queryParams = {
          "path": "dashboard/cashblast",
          "message": "we couldn't find anyone now! Please try after sometime. In the meantime we're refunding your entry fees."
        }
        this.router.navigate(['/dashboard/popup', { data: JSON.stringify(queryParams) }], { skipLocationChange: true });
     
        // this.router.navigate(["/dashboard/popup"], { skipLocationChange: true })
      }

    })

  }
  sound() {
    //this.timerSound.load();
    // this.timerSound.play();
  }




}
