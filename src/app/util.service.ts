import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class UtilService {

  isBacked:boolean;
  constructor(public router: Router, public auth: AuthService) {
    this.isBacked = false;
   }

   setBackClick(value){
    console.log("isbacked===========> ",value)
 
    this.isBacked = value
  }
 
  setBackClicked(value){
    console.log("current component url====> ",this.router.url);
    console.log("isbacked===========> ",value)
    if(value == false && this.router.url == '/dashboard/quickwin/question'){
      this.backToHome();
    }else if(value == false && this.router.url == '/dashboard/cashblast/opponent/playquestion'){
      this.backToHome();
    }else if(value == false && this.router.url == '/dashboard/cashblast/opponent'){
      this.backToHome();
    }
    // else if(this.auth.getGameId() == '4'){
    //   this.backToHome();
    // }
    this.isBacked = value
  }
  getBackClicked(){
    return this.isBacked;
  }

  
  backToHome() {
    

    
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you realy want to exit !",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#808080',
      cancelButtonColor: '#ff6d00',
      confirmButtonText: 'Exit',
      cancelButtonText: 'Continue'  
    }).then((result) => {
      if (result.value) {
       
        console.log(" i m here ==========");
       
        if(this.auth.getGameId() == '5'){
          this.router.navigate(["/dashboard/quickwin"]);
        }else if(this.auth.getGameId() == '1'){
          this.router.navigate(["/dashboard/cashblast"]);
        }
          // }else if(this.auth.getGameId() == '4'){
        //   this.router.navigate(["/dashboard/poolprize"]);
        // }
      
      }
  
    })
  }
}
