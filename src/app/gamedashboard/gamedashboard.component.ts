import { Component, OnInit } from '@angular/core';
import { LoginService } from '../loginservice/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-gamedashboard',
  templateUrl: './gamedashboard.component.html',
  styleUrls: ['./gamedashboard.component.css']
})
export class GamedashboardComponent implements OnInit {

  public gamelist:any;

  constructor(private service:LoginService,public router:Router,public auth:AuthService) {
    this.getGameList();
 
   }
  
  ngOnInit() {
  }
  // getLoadSound(){
  //   console.log("All sound Loaded ");
  
  // }

  getGameList(){
    let endpoint = "getGameList";
    this.service.getGameList(endpoint,{}).then((value)=>{
      if(value.statusCode == 0){
        console.log("game list is : "+JSON.stringify(value));
        this.gamelist = value.data;
      }else{
        let queryParams = {
          "path": "dashboard/popup",
          "message": value.message
        }
        this.router.navigate(['/dashboard/popup', { data: JSON.stringify(queryParams) }], { skipLocationChange: true });
     
      }
   
    })


  }

  gameSer(game:any){
      // console.log("game_event => "+JSON.stringify(game)+"  Id==>>>>>"+game.id);
      //this.getLoadSound();
      console.log("GameId==> ",game.id);
      this.auth.setIsSpined(false);
      this.auth.setGameId(game.id);
      this.auth.setGameSeasonTime(game.endDate);
      //localStorage.setItem("GameId", game.id)
      let gameUrl=game.title.replace(/\s/g,"").toLowerCase();
       this.router.navigate(['/dashboard/'+gameUrl]);



      // if(game==1){
      
      //   // let endDate:"2018-12-31 00:00:00.0"
      //   // this.auth.setGameSeasonTime(endDate);
 
     
      // }else if(gameId==2){
      //   let endDate:"2018-12-31 00:00:00.0"
      //   this.auth.setGameSeasonTime(endDate);
 
      //  // localStorage.setItem("GameId", game.id)
      //  // let gameUrl=game.title.replace(/\s/g,"").toLowerCase();
      //   this.router.navigate(['/dashboard/spinthewheel']);
      // } else if(gameId==5){
      //   let endDate:"2018-12-31 00:00:00.0"
      //   this.auth.setGameSeasonTime(endDate);
 
      //  // localStorage.setItem("GameId", game.id)
      //  // let gameUrl=game.title.replace(/\s/g,"").toLowerCase();
      //   this.router.navigate(['/dashboard/quickwin']);
      // }else if(gameId == 4){
      //   let endDate:"2018-12-31 00:00:00.0"
      //   this.auth.setGameSeasonTime("2019-03-17 00:00:00.0");
      //   this.router.navigate(['/dashboard/poolprize']);
      //  // localStorage.setItem("GameId", game.id)
      //  // let gameUrl=game.title.replace(/\s/g,"").toLowerCase();
       
      // }else if(gameId == 6){
      //   window.location.href='http://13.233.39.58:8080/spinwheel/spinthewheel.html';
      // }
  }
  gameRedeem(){
    this.router.navigate(["/dashboard/redeem"]);
  }
  gameCoupon(){
    this.router.navigate(["/dashboard/coupon"]);
  }
 
  getBlog(){
    this.router.navigate(["/dashboard/blog"]);
  }
  getTC(){
    this.router.navigate(["/dashboard/tc"])
  }
  getFAQ(){
    this.router.navigate(["/dashboard/faq"]);
  }
  getSupport(){
   
      this.router.navigate(["/dashboard/support"])
    
  }
}
    