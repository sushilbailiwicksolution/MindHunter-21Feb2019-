import { Component, OnInit } from '@angular/core';
import { SpinWheelService } from '../services/spw.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-spinthewheel',
  templateUrl: './spinthewheel.component.html',
  styleUrls: ['./spinthewheel.component.css']
})
export class SpinthewheelComponent implements OnInit {

  packList: any;
  constructor(public service: SpinWheelService,public auth: AuthService, public router: Router) {
    
    
    // window.location.href='http://13.233.39.58:8080/spinwheel/spinthewheel.html'
  }

  ngOnInit() {
    console.log("IsSpin========> ",this.auth.getIsSpined())
    if(this.auth.getIsSpined() == false ){
     
     this.getPackList(this.auth.getGameId());
    }else{
      this.router.navigate(["/dashboard"]);
    }
  }

  getPackList(gameId: any) {
    console.log("game id is : " + gameId);
    let endpoint = "getPackList";
    let requestBody = {
      "gameId": gameId
    }
    this.service.getPackList(endpoint, requestBody).then((value) => {
      if (value.statusCode == 0) {
        
        this.auth.setIsSpined(true);
        // console.log("pack list is : =>" + JSON.stringify(value.data));
        this.packList = value.data;
        console.log("pack list=====>" + JSON.stringify(value));
        if(this.packList.costType == 'PAID'){
          let txnamout = 50;
          let userId = this.auth.getUserId();
          let packId = this.auth.getPackId();
          let instanceId = "5";
          let gameId = this.auth.getGameId();
       
          //window.location.href='http://13.233.39.58:8080/MindHunterApi/paytmGateway';
         // this.router.navigate(["/dashboard/spinthewheelhome"]);
          window.location.href = 'http://13.233.39.58:8092/cms/game/paytmGateway/' + txnamout + '/' + userId + '/' + packId + '/' + instanceId + '/' + gameId;
      
        }else{
          this.router.navigate(["/dashboard/spinthewheelhome"]);
        }
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
}
