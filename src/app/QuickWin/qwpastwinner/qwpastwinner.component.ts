import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qwpastwinner',
  templateUrl: './qwpastwinner.component.html',
  styleUrls: ['./qwpastwinner.component.css']
})
export class QwpastwinnerComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  getHome(){
    this.router.navigate(["/dashboard/quickwin"])
  }

}
