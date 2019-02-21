import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  goHome(){
    this.router.navigate(["/dashboard"]);
  }
  getBlog(){
  
  }
  getTC(){
    this.router.navigate(["/dashboard/tc"])
  }
  getFAQ(){
    window.location.href='http://13.233.39.58:8080/gamesfont/dashboard/faq.html';
  }
  sendQuery(){
    this.router.navigate(["/dashboard/support"])
  }

}
