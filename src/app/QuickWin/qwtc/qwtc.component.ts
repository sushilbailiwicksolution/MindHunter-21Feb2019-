import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qwtc',
  templateUrl: './qwtc.component.html',
  styleUrls: ['./qwtc.component.css']
})
export class QwtcComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  getHome(){
    this.router.navigate(["/dashboard/quickwin"])
  }
}
