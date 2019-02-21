import { Component } from '@angular/core';
import { Observable, fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PlatformLocation, LocationStrategy } from '@angular/common';
import { UtilService } from './util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CashBlast';
  currentUrl:any;


  online$: Observable<boolean>;
  name: string;

  constructor(public router:Router,public currentroute:ActivatedRoute,public util:UtilService, public location: LocationStrategy) {
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
     
    )
    this.location.onPopState(() => {
      // set isBackButtonClicked to true.
      this.util.setBackClicked(true);
      return false;
    });
  
    console.log("network=========> ",JSON.stringify(this.online$))
    this.networkStatus()

    
    router.events.subscribe(event => {

      if (event instanceof NavigationEnd ) {
        this.currentUrl = event.url;
        console.log("current url=> ",event.url); // event.url has current url
        // your code will goes here
      }
    });
  }

  public networkStatus() {
   // console.log("current route================>",this.router.url);
    this.online$.subscribe(value => {
      console.log("connection is : "+value);
      if(value == false){
        //alert("connection is : "+value);
     
        this.router.navigate(['/networkerror'])
      }
     
      this.name = `Angular 6 - Network Online? ${value}`;
    })
  }

    // check if back or forward button is pressed.
  
}
