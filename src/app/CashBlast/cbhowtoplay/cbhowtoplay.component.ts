import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-howtoplay',
  templateUrl: './cbhowtoplay.component.html',
  styleUrls: ['./cbhowtoplay.component.css']
})
export class CbHowtoplayComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  goBack(){

    this.router.navigate(["/dashboard/cashblast"]);
  }
  // getPastWinner(){
  //   this.router.navigate(["/dashboard/cashblast/pastwinner"]);
  // }
  getTC(){
    this.router.navigate(["/dashboard/cashblast/tc"]);
  }
}
