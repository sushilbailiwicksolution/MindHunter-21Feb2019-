import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-termandcondition',
  templateUrl: './termandcondition.component.html',
  styleUrls: ['./termandcondition.component.css']
})
export class TermandconditionComponent implements OnInit {
reward:any;
denomination:any;
  constructor(public router:Router) { }

  ngOnInit() {
    
  }
  goHome(){
    this.router.navigate(["/dashboard"])
  }
}
