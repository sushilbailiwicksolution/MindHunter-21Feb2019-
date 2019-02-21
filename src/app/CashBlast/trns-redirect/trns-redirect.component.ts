import { Component, OnInit } from '@angular/core';
import { CashblastService } from '../services/cashblast.service';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-trns-redirect',
  templateUrl: './trns-redirect.component.html',
  styleUrls: ['./trns-redirect.component.css']
})
export class TrnsRedirectComponent implements OnInit {
  pack: string;
  instanceId: any;
  gameId: string;
  reward: any;
  denomination: any;
  soundMode: string = 'play';
  onPackSound: HTMLAudioElement = new Audio();
  constructor(public service: CashblastService, private socket: Socket, public router: Router, public auth: AuthService) {
    this.onPackSound.src = 'assets/gamesound/EnterGamesoundonclick.mp3';
    console.log("waiting for response")
  }

  ngOnInit() {
    this.reward = this.auth.getReward();
    this.denomination = this.auth.getDenominationType();
    this.gameId = this.auth.getGameId();
    console.log("gameId===> ", this.gameId);
    if (this.gameId == "1") {
      this.pack = localStorage.getItem("pack");
      console.log("pack id to be get" + this.pack);
      this.gameHosted(this.pack);

    }else if (this.gameId == "5") {
      this.router.navigate(["/dashboard/quickwin/question"]);
    }else if (this.gameId == "4") {
      this.router.navigate(["/dashboard/poolprize/question"]);
    }else if (this.gameId == "3") {
      this.pack = localStorage.getItem("pack")
      if( this.pack == '1'){
        this.router.navigate(["/dashboard/megashark/packlist/normalmode"]);
      }else if( this.pack == '2'){
        this.router.navigate(["/dashboard/megashark/packlist/boostermode"]);
      }
     
    }else if (this.gameId == "2" || this.gameId == "6") {
      this.router.navigate(["/dashboard/spinthewheelhome"]);
    }
  }

  public gameHosted(pack: any) {
    // let txnamout = 20;
    // let userId = this.auth.getUserId();

    //  // window.location.href='http://13.233.39.58:8080/MindHunterApi/paytmGateway';
    //  window.location.href='http://13.233.39.58:8080/MindHunterApi/paytmGateway/'+txnamout+'/'+userId; 
    this.onPackSound.load();
    this.onPackSound.play();
    this.onPackSound.volume = 1;
    console.log("pack ===>" + JSON.stringify(pack));
    let body = {
      userId: this.auth.getUserId(),
      gameId: this.auth.getGameId(),
      packId: localStorage.getItem("packId")


    };
    this.auth.setPackId(localStorage.getItem("packId"));
    this.service.getGameInstance("getInstance", body).then(res => {
      this.instanceId = res.instanceId;
      // localStorage.setItem('instanceId',this.instanceId);
      this.auth.setInstanceId(this.instanceId);
      //this.instanceId = this.instResponse.instanceId
      console.log("Instance Response instanceId==>", this.instanceId);

      console.log("hostCreateNewGame");
      console.log("Current user==>" + this.auth.getToken());

      let data = { playerName: this.auth.getToken(), gameId: this.auth.getInstanceId(), lifeLine: 3, isBomb: false };
      this.socket.emit("playerCheckRoom", data);
      this.socket.on("firstPlayer", (data) => {
        data.isBomb = true;
        this.socket.emit("hostCreateNewGame", data);
        //this.payment();
        this.router.navigate(['dashboard/cashblast/opponent']);

      })

      this.socket.on("newGameCreated", (dataget) => {

        let data = { playerName: this.auth.getToken(), gameId: this.auth.getInstanceId(), lifeLine: 3, isBomb: false };
        this.socket.emit("playerJoinGame", data);
        //this.payment();
        this.router.navigate(['dashboard/cashblast/opponent']);

        //this.gameInit(data);
      })
      this.socket.on("notFirstPlayer", (data1) => {
        let data = { playerName: this.auth.getToken(), gameId: this.auth.getInstanceId(), lifeLine: 3, isBomb: false };
        console.log("Joining", JSON.stringify(data));
        this.socket.emit("playerJoinGame", data);
        //this.payment();
        this.router.navigate(['dashboard/cashblast/opponent']);

        //this.gameInit(data);
      })
    }, err => {
      console.error("Error in generating instance", err);
    });

  }



}
