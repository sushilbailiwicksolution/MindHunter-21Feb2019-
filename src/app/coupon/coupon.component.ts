import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  goHome(){
    this.router.navigate(["/dashboard"]);
  }
  getBlog(){
   this.router.navigate(["/dashboard/blog"]);
  }
  getTC(){
    this.router.navigate(["/dashboard/tc"]);
  }
  getFAQ(){
    this.router.navigate(["/dashboard/faq"]);
  }
  sendQuery(){
    this.router.navigate(["/dashboard/support"])
  }
}
