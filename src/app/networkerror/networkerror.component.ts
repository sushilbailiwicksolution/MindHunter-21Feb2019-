import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-networkerror',
  templateUrl: './networkerror.component.html',
  styleUrls: ['./networkerror.component.css']
})
export class NetworkerrorComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  getHome(){
    this.router.navigate(["/dashboard"]);
  }

}
