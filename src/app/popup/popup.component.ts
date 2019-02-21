import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  message: any;
  path: any;
  constructor(public router:Router,public actroute:ActivatedRoute) {

    this.actroute.params.subscribe(value => {
      let params = JSON.parse(value.data);
      this.path = params.path;
      this.message = params.message;
   
    });
    console.log("path ===> ",this.path,"  message ===> ",this.message);
 
   }

  ngOnInit() {
  }
  goBack(){    
    this.router.navigate(["/"+this.path]);
  }

}
