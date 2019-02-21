import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qwfaq',
  templateUrl: './qwfaq.component.html',
  styleUrls: ['./qwfaq.component.css']
})
export class QwfaqComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  getHome(){
    this.router.navigate(["/dashboard/quickwin"])
  }
}
