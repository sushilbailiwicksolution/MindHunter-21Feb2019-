import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }

  constructor(private auth: AuthService,
    private myRoute: Router,private util: UtilService){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.auth.isLoggednIn()){
     
      return true;
    }else{
      this.myRoute.navigate([""]);
      return false;
    }
  }
  canDeactivate(component: any) {
    // will prevent user from going back
    console.log("component =============> ",component);

    if (this.util.getBackClicked()) {
      this.util.setBackClicked(false);
      // push current state again to prevent further attempts.
      history.pushState(null, null, location.href);
      return false;
    }
    return true;
  }

 
}
      