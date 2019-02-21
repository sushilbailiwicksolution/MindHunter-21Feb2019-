import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pooltc',
  templateUrl: './pooltc.component.html',
  styleUrls: ['./pooltc.component.css']
})
export class PooltcComponent implements OnInit {
  constructor(public router:Router) { }

  ngOnInit() {
  }
  goHome(){
    this.router.navigate(["/dashboard/poolprize"])
  }
}
