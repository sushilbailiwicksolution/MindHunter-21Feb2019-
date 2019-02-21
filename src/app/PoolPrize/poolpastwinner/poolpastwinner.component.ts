import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poolpastwinner',
  templateUrl: './poolpastwinner.component.html',
  styleUrls: ['./poolpastwinner.component.css']
})
export class PoolpastwinnerComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  goHome(){
    this.router.navigate(["/dashboard/poolprize"])
  }
}
