import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { SpinWheelService } from '../services/spw.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-spwhome',
  templateUrl: './spwhome.component.html',
  styleUrls: ['./spwhome.component.css']
 // changeDetection: ChangeDetectionStrategy.Default
})
export class SpwhomeComponent implements OnInit {
  
  packList: any;
  trans: any;
  startWheel: any;
  time: any;
  transf: any;
  click: number = 1;
  userId: any;
  gameId: 1;
  response: any;
  transform: string;
  isDisabled:boolean;
  webTrans: string;
  mozTran: string;
  oTrans: string;
  msTrans: string;
  border: string;
  wheelId: any;
  testArray: any


  wheelAry: Array<{ bgColor: any, id: any, imgUrl: any, nextAction: any, price: any, text: any }>;
  constructor(public ngZone:NgZone,public swservice: SpinWheelService,public auth:AuthService, public router: Router, public ref: ChangeDetectorRef) {
    this.userId = this.auth.getUserId();
   // this.getPackList(2);
    //  this.startWheel = localStorage.getItem('wheelData');
  }

  ngOnInit() {
    this.testArray = ['1', '5', '3', '8', '6', '5', '4', '9']
    let body = { gameId: this.auth.getGameId() }
    console.log("userId==>", this.userId);
    this.swservice.getStartWheel("getPackList", body).then((res) => {
      this.response = res;
      console.log("API res===> ", JSON.stringify(res));
      this.startWheel = res.data.spinBlocks;
      console.log("Array==> ",this.startWheel)
      let count = 1;
      this.wheelAry = [];
      let len = this.startWheel.length;
      if (len == 4) {
        this.wheelId = "wheel_for";
      } else if (len == 6) {
        this.wheelId = "wheel";
      }
      else if (len == 8) {
        this.wheelId = "wheel_eight";
      }
      let deg = 360 / len;
      this.startWheel.forEach(element => {
        let childDeg = deg * count;
        this.transform = 'rotate(' + childDeg + 'deg)';
        this.webTrans = 'rotate(' + childDeg + 'deg)';
        this.mozTran = 'rotate(' + childDeg + 'deg)';
        this.oTrans = 'rotate(' + childDeg + 'deg)';
        this.msTrans = 'rotate(' + childDeg + 'deg)';
        this.border = element.bgColor + ' transparent';
        console.log("bg color==> ",element.bgColor);
        let childcustomStyle = {
          'transform': this.transform, "-webkit-transform": this.webTrans,
          '-moz-transform': this.mozTran, "-o-transform": this.oTrans, '-ms-transform': this.msTrans, 'border-color': this.border
        }

        console.log("custom Style==>" + childcustomStyle);
        this.wheelAry.push({ bgColor: childcustomStyle, id: element.id, imgUrl: element.imgUrl, nextAction: element.nextAction, price: element.price, text: element.text })

        count++;
      });
      console.log("data ===> ", JSON.stringify(this.wheelAry));

    });
  }

ngDoCheck(){
  this.ref.detectChanges();
}

  getstartWheel() {
    this.isDisabled=true;
    let stopPoint = 5;
    let stopres: any;
    let newdeg = this.click * 1800 * 50;
    this.transf = 'rotate(' + newdeg + 'deg)';
    let reqbody = { userId: this.userId, gameId: this.gameId }
    console.log('start Wheel Array=======================>', this.startWheel);
    this.time = setTimeout(() => {
      newdeg++;
      this.transf = 'rotate(' + newdeg + 'deg)';
      this.swservice.getStopPoint("getStopWheelPoint", reqbody).then((res) => {
        console.log("res data==> ", res)
        stopres = res;
        //this.wheelAry=[];
        console.log("wheel end point==> ", stopres.data.blockIndex);
        // let  stopPoint =  res.data;
        if (stopres.statusCode == 0) {
          for (let i = 0; i < this.startWheel.length - 1; i++) {
            
            if (i == stopres.data.blockIndex) {
              console.log("index==> ", i,"  Next Action===> ",this.startWheel[i].nextAction)
              if(this.startWheel[i].nextAction==1){
                this.isDisabled=false;
                this.click++;
              }
              let temp = this.startWheel[this.startWheel.length - 1];
              this.startWheel[this.startWheel.length - 1] = this.startWheel[i];
              this.startWheel[i] = temp;
              let changedata = this.startWheel;
              this.ngZone.run(()=>{
                this.startWheel=[];
                // this.wheelAry = Object.assign({},changedata);
                 console.log("Stop wheel Array===> ", this.startWheel);
                
                changedata.forEach(element=>{
                 this.startWheel.push(element);
                });
              })
            
           
              this.ref.markForCheck();
              this.ref.detectChanges();
            //  this.testArray = ['1', '5', '9', '8', '6', '5', '4', '3']
             this.getNewArray(this.startWheel);  
            console.log("Stop wheel Array===> ", this.startWheel);
              let Winner = this.startWheel[this.wheelAry.length - 1];
              if (Winner.nextAction != 1) {
                 this.getWinner(Winner);
              }

              break;
            }

          }

        }
      })
    }, 1000)

  }
  public trackItem(index: number, item: any) {
    console.log("array ids==>",item.id)
    return item.id;
  }

  getWinner(winner) {
    console.log("Go to Winner Page", winner)
    setTimeout(() => {
      this.router.navigate(["/dashboard/spinthewheel/spinwinner",{winnerData:JSON.stringify(winner)} ],{ skipLocationChange: true } )
    }, 7000)
  }

  pauseTimer() {
    clearInterval(this.time);
  }

  getNewArray(newwheel){
    this.startWheel =[];
    this.startWheel = newwheel;
    console.log("new Array==> ",this.startWheel)
    let count = 1;
    this.wheelAry = [];
    let len = this.startWheel.length;
    console.log("array size",this.startWheel.length)
    if (len == 4) {
      this.wheelId = "wheel_for";
    } else if (len == 6) {
      this.wheelId = "wheel";
    }
    else if (len == 8) {
      this.wheelId = "wheel_eight";
    }
    let deg = 360 / len;
    this.startWheel.forEach(element => {
      let childDeg = deg * count;
      this.transform = 'rotate(' + childDeg + 'deg)';
      this.webTrans = 'rotate(' + childDeg + 'deg)';
      this.mozTran = 'rotate(' + childDeg + 'deg)';
      this.oTrans = 'rotate(' + childDeg + 'deg)';
      this.msTrans = 'rotate(' + childDeg + 'deg)';
      this.border = element.bgColor + ' transparent';
      console.log("bg color===> ",element.bgColor);

      let childcustomStyle = {
        'transform': this.transform, "-webkit-transform": this.webTrans,
        '-moz-transform': this.mozTran, "-o-transform": this.oTrans, '-ms-transform': this.msTrans, 'border-color': this.border
      }

      console.log("custom Style==>" + childcustomStyle);
      this.wheelAry.push({ bgColor: childcustomStyle, id: element.id, imgUrl: element.imgUrl, nextAction: element.nextAction, price: element.price, text: element.text })

      count++;
    });
   // this.wheelAry=[];
//     newwheel.forEach(element => {
// this.wheelAry.push(element);
//     });
    console.log("new data ===> ", JSON.stringify(this.wheelAry));

  }


  
  getPackList(gameId: any) {
    console.log("game id is : " + gameId);
    let endpoint = "getPackList ";
    let requestBody = {
      "gameId": gameId
    }
    this.swservice.getPackList(endpoint, requestBody).then((value) => {
      if (value.statusCode == 0) {
        // console.log("pack list is : =>" + JSON.stringify(value.data));
        this.packList = value.data;
        console.log("pack list=====>" + this.packList.costType)
        if(this.packList.costType == 'PAID'){
          let txnamout = 50;
          let userId = this.auth.getUserId();
          let packId = this.auth.getPackId();
          let instanceId = "5";
          let gameId = this.auth.getGameId();
    
          //window.location.href='http://13.233.39.58:8080/MindHunterApi/paytmGateway';
         
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
