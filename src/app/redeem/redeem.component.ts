import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.css']
})
export class RedeemComponent implements OnInit {



  constructor(public router:Router) { }

  ngOnInit() {
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
  sendQuery(){
    this.router.navigate(["/dashboard/support"])
  }
}
