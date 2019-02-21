import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poolfaq',
  templateUrl: './poolfaq.component.html',
  styleUrls: ['./poolfaq.component.css']
})
export class PoolfaqComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  goHome(){
    this.router.navigate(["/dashboard/poolprize"])
  }
}
