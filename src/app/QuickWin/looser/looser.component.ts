import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { SoundService } from '../../service/sound.service';

@Component({
  selector: 'app-looser',
  templateUrl: './looser.component.html',
  styleUrls: ['./looser.component.css']
})
export class LooserComponent implements OnInit {
  ans: string;
  index: any;
  temp: string;

  constructor(public router:Router,public soundsrc:SoundService) {
    this.ans = localStorage.getItem("correctAns");
    
      this.soundsrc.playLosser();
    this.temp = localStorage.getItem("ansIndex");
    this.index=+this.temp + 1;
    console.log("index==> ",this.index);

  }

  ngOnInit() {
  
  }
  replay(){

    this.router.navigate(["/dashboard/quickwin"]);
  }
  getHome(){

    this.router.navigate(["/dashboard"])
  }
}
