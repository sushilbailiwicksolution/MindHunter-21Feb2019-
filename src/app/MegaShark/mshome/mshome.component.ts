import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mshome',
  templateUrl: './mshome.component.html',
  styleUrls: ['./mshome.component.css']
})
export class MshomeComponent implements OnInit {
  timer: any;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  compareDate: Date ;
  
  constructor(public router: Router,public auth:AuthService) { 
    this.getCountDown();
  }

  ngOnInit() {
  }
  goForPack(){
    let queryParam ={
      "tabMode":"normal"
    }
    this.router.navigate(['dashboard/megashark/packlist', { data: JSON.stringify(queryParam) }], { skipLocationChange: true });
  }
  getCountDown(){
    let date:string = this.auth.getGameSeasonTime().toString();
    //let date:string = "2019-01-04 00:00:00.0"
    console.log("Date is =====> ",date);
    let toYear = Number(date.split('-')[0]);
    let toMonth=Number(date.split('-')[1])-1;
    let todate=Number(date.split('-')[2].split(' ')[0]);
    let toHour=Number(date.split(' ')[1].split(':')[0]);
    let toMinute =Number(date.split(':')[1]);
    let toSecond = Number(date.split(':')[2].split('.')[0]);
    //new Date(2019,0,4,0,0,0)
    this.compareDate = new Date(toYear,toMonth,todate,toHour,toMinute,toSecond)
    console.log("year ==> ",toYear,"  month ==> ",toMonth,"  date ==> ",todate,"  hour ==> ",toHour,"  minute ==> ",toMinute,"  second ==> ",toSecond);
    this.timer = setInterval(()=>{
      this.timeBetewwbDates(this.compareDate);
    },1000);
}


timeBetewwbDates(toDate){
 let dateEntered = toDate;
 
 let now = new Date();
 
 let difference = dateEntered.getTime() - now.getTime();
 
 if (difference <= 0){
   clearInterval(this.timer);
 }
 else{
    this.seconds = Math.floor(difference / 1000);
    
    this.minutes = Math.floor(this.seconds / 60);
    
    this.hours = Math.floor(this.minutes / 60);
   
    this.days = Math.floor(this.hours / 24);
    

    this.hours %= 24;
    this.minutes %= 60;
    this.seconds %= 60;
   // console.log("day==> ",this.days,"  hh==> ",this.hours,",  min==> ",this.minutes,",  sec==> ",this.seconds);
    

 }
}
pastWinners(){
  this.router.navigate([''])
}

}
