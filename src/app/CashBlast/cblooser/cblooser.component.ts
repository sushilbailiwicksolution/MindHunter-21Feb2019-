import { Component, OnInit } from '@angular/core';
import { CashblastService } from '../services/cashblast.service';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { element } from '@angular/core/src/render3';
import { SoundService } from '../../service/sound.service';

@Component({
  selector: 'app-cblooser',
  templateUrl: './cblooser.component.html',
  styleUrls: ['./cblooser.component.css']
})
export class CblooserComponent implements OnInit {
looserData:Array<{mobileNo:string,life:string}>;
currentUser:any;
denomination_type:any;
entryFee:any;
  playerName: string;
  constructor(public router:Router,public cbservice: CashblastService, public soundsrc:SoundService, public auth: AuthService) { 
    this.looserData = [];
  }

  ngOnInit() {
    this.entryFee=this.auth.getEntryFee();
    
     this.denomination_type = this.auth.getDenominationType();

   this.currentUser= this.auth.getToken();
this.soundsrc.playLosser();
    // let body = {
    //   "gameId": this.auth.getGameId(),

    //   "packId": this.auth.getPackId(),
    //   "gameInstanceId": this.auth.getInstanceId()
    // }
    let body = {
      "gameId": this.auth.getGameId(),
      "packId": this.auth.getPackId(),
      "instanceId": this.auth.getInstanceId()
    }
    this.cbservice.getLooser("getPlayersDetail", body).then(res => {
      console.log("Looser Response===>"+JSON.stringify(res))
      if (res.statusCode == 0) {
          //this.looserData=res.data.lstPlayerDetail;
          res.data.forEach(element => {
            this.looserData.push({
              mobileNo:element.mobileNo,
              life:element.rank
            });
          })
          console.log("looser Array is : "+JSON.stringify(this.looserData));
      }else{
        let queryParams = {
          "path": "dashboard",
          "message": res.message
        }
        this.router.navigate(['/dashboard/popup', { data: JSON.stringify(queryParams) }], { skipLocationChange: true });
     
      }

    })
  }

  getMobileNumberMask(mobileNo){
    this.playerName = mobileNo.substr(0,0)+"XXXXXX"+mobileNo.substr(-4);
    return this.playerName;
    }

  getReplay(){
    this.soundsrc.offSound();
    localStorage.removeItem('players');
    this.router.navigate(['/dashboard/cashblast'])
  }
  getHome(){
    this.soundsrc.offSound();
    this.router.navigate(['/dashboard']);
    localStorage.removeItem('players');
  }
 
}
