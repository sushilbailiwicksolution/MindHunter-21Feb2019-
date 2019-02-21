import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { App } from '../models/App';
import { Host } from '../models/Host';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CashblastService } from '../services/cashblast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SoundService } from '../../service/sound.service';


@Component({
  selector: 'app-cbhome',
  templateUrl: './cbhome.component.html',
  styleUrls: ['./cbhome.component.css',]
})
export class CbhomeComponent implements OnInit {
  emitFlag: boolean;
  userId: any;
  app: App;
  host: Host;
  instanceId: any;
  instResponse: any;
  gameId: any;
  regMobileNo: any;
  packList: any;
  isDisabled: any
  soundMode: string = 'play';
  playerDataaa: any
  constructor(private socket: Socket, private spinner: NgxSpinnerService, public router: Router,
    public soundsrc: SoundService, public auth: AuthService, public service: CashblastService) {
    this.gameId = this.auth.getGameId();
    this.getPackList(this.gameId);
    this.regMobileNo = this.auth.getToken();
    console.log("regMobileNo mobile no===>" + this.regMobileNo);


    this.emitFlag = false;
  }
  gameInit(data) {
    this.app.gameId = data.gameId;
    this.app.myRole = 'Host';
    this.app.mySocketId = data.mySocketId;
    this.host.numPlayersInRoom = 0;


  }

  // console.log("Game started with ID: " + App.gameId + ' by host: ' + App.mySocketId);


  ngOnInit() {
    //this.socket.connect();
    this.socket.emit("add-message", "hello");
    console.log("testing -----------------")

  }


  howToPlay() {

    // window.location.href='http://13.233.39.58:8080/MindHunterApi/paytmGateway';
    window.location.href = 'https://youtu.be/vu8tIkMPxvg';


    // this.router.navigate(["dashboard/cashblast/cbhowtoplay"]);

  }

  getMobileNumberMask(mobileNo) {
    return mobileNo.substr(0, 0) + "XXXXXX" + mobileNo.substr(-4);
  }

  gameHosted(pack: any) {
    // Yash
    // this.spinner.show()
    // this.onPackSound.load();

    // this.timerSound.play();    
    // this.onPackSound.volume = 1;
    this.soundsrc.PlayOnPackClick();
    this.playerDataaa = [];
    this.isDisabled = true;
    localStorage.setItem("pack", pack);
    localStorage.setItem("packId", pack.packId);

    this.auth.setEntryFee(pack.entryFee);
    this.auth.setMarginePrice(pack.margin);
    this.auth.setReward(pack.reward);
    this.auth.setDenominationType(pack.denomination_type);

    console.log("pack id to be set" + pack.packId);
    if (pack.denomination_type === "Rs.") {
      let txnamout = pack.entryFee;
      let userId = this.auth.getUserId();
      let packId = this.auth.getPackId();
      let instanceId = this.auth.getInstanceId();
      let gameId = this.auth.getGameId();

      //window.location.href='http://13.233.39.58:8080/MindHunterApi/paytmGateway';
      this.soundsrc.offSound();
      window.location.href = 'http://13.233.39.58:8092/cms/game/paytmGateway/' + txnamout + '/' + userId + '/' + packId + '/' + instanceId + '/' + gameId;
    }
    else {
      console.log("pack ===>" + JSON.stringify(pack));
      let body = {
        userId: this.auth.getUserId(),
        gameId: this.auth.getGameId(),
        packId: pack.packId
      };
      this.auth.setPackId(pack.packId);
      this.service.getGameInstance("getInstance", body).then(res => {
        this.instanceId = res.instanceId;
        if (res.statusCode == 0) {
          // localStorage.setItem('instanceId',this.instanceId);
          this.auth.setInstanceId(this.instanceId);
          //this.instanceId = this.instResponse.instanceId
          console.log("Instance Response instanceId==>", this.instanceId);

          console.log("hostCreateNewGame");
          console.log("Current user==>" + this.auth.getToken());

          let data = { playerName: this.auth.getToken(), gameId: this.auth.getInstanceId(), lifeLine: 3, isBomb: false };
          console.log("playerCheckRoom start ")
          this.socket.emit("playerCheckRoom", data);
          console.log("playerCheckRoom end ")
          this.socket.on("firstPlayer", (data) => {

            console.log("first player ", JSON.stringify(data));
            data.isBomb = true;
            console.log("hostCreateNewGame emit ==> ", data.gameId, " instanceId ==> ", this.auth.getInstanceId(), " emit Flag===> ", this.emitFlag);
            if (this.emitFlag == false) {
              this.emitFlag = true;
              this.socket.emit("hostCreateNewGame", data);

              console.log("hostCreateNewGame emiting    ========= emit Flag===> ", this.emitFlag);
              //this.payment();
              this.spinner.hide();

              this.soundsrc.offSound();
              this.router.navigate(['dashboard/cashblast/opponent']);
            }
          })
          console.log("ready to newGameCreated ")
          this.socket.on("newGameCreated", (dataget) => {
            console.log("new game created ");
            let data = { playerName: this.auth.getToken(), gameId: this.auth.getInstanceId(), lifeLine: 3, isBomb: false };
            this.socket.emit("playerJoinGame", data);
            //this.payment();
            this.spinner.hide()
            this.router.navigate(['/dashboard/cashblast/opponent']);

            //this.gameInit(data);
          })
          console.log("end to newGameCreated ")
          this.socket.on("notFirstPlayer", (data1) => {
            let data = { playerName: this.auth.getToken(), gameId: this.auth.getInstanceId(), lifeLine: 3, isBomb: false };
            console.log("not a first player Joining", JSON.stringify(data));
            this.socket.emit("playerJoinGame", data);
            //this.payment();
            this.spinner.hide()
            this.router.navigate(['/dashboard/cashblast/opponent']);

            //this.gameInit(data);
          })
        } else {
          let queryParams = {
            "path": "dashboard",
            "message": res.message
          }
          this.router.navigate(['/dashboard/popup', { data: JSON.stringify(queryParams) }], { skipLocationChange: true });

        }

      }, err => {
        console.error("Error in generating instance", err);
      });
    }
  }

  getPackList(gameId: any) {
    console.log("game id is : " + gameId);
    let endpoint = "getPackList ";
    let requestBody = {
      "gameId": gameId
    }
    this.service.getPackList(endpoint, requestBody).then(value => {
      if (value.statusCode == 0) {
        // console.log("pack list is : =>" + JSON.stringify(value.data));
        this.packList = value.data;
        console.log("pack list=[====." + this.packList)


      } else {
        let queryParams = {
          "path": "dashboard",
          "message": value.message
        }
        this.router.navigate(['/dashboard/popup', { data: JSON.stringify(queryParams) }], { skipLocationChange: true });

      }

    }, err => {
      console.log("err = >  " + err);
    })
  }


  paytmIntegration(gameId, packId) {
    //  this.userId = "9540643208";


  }

  payment() {
    //let orderId = 5;
    let txnamout = 80;
    let userId = this.auth.getUserId();

    // window.location.href='http://13.233.39.58:8080/MindHunterApi/paytmGateway';
    window.location.href = 'http://13.233.39.58:8080/MindHunterApi/paytmGateway/' + txnamout + '/' + userId;
    // this.router.navigateByUrl('http://13.233.39.58:8080/MindHunterApi/paytmGateway');    




  }


  getHome() {
    this.router.navigate(["/dashboard"]);
  }
  getTc() {
    this.router.navigate(["/dashboard/tc"]);
    //this.router.navigate(["/dashboard/cashblast/tc"]);
  }
  getRules() {
    this.router.navigate(["/dashboard/faq"]);
    // this.router.navigate(["/dashboard/cashblast/rules"]);
  }
  getHelp() {
    // window.location.href='http://13.233.39.58:8080/gamesfont/blastgame/support.html';
    this.router.navigate(["/dashboard/support"]);
  }


  sound() {
    this.soundMode = 'pause'
    console.log("sound Mode==> ", this.soundMode)

  }


}
