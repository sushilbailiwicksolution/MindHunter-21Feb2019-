import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginService } from '../loginservice/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup;

  constructor(public router:Router,public fb:FormBuilder, 
    private auth: AuthService,private loginService:LoginService) {

    this.loginForm = fb.group({
      mobileNo: ['', Validators.compose([
        Validators.required, 
        Validators.pattern('[0-9]+'), 
        Validators.min(6000000000),
        Validators.max(9999999999)])]
    });
   }

  ngOnInit() {
    if(this.auth.isLoggednIn()){
      this.router.navigate(['/dashboard']);
    }
  }
  login(){
    this.auth.sendToken(this.loginForm.value.mobileNo)
    console.log("Valid Form===>"+this.loginForm.valid);
    if (this.loginForm.valid) {
      let body={mobileNo:this.loginForm.value.mobileNo}
      this.loginService.sendOtpRequest("sendOtp",body).then(res=>{
        if(res.statusCode == 0){
          console.log("sendotp res==> ",JSON.stringify(res));
          this.router.navigate(['/otp']);
        }else{
          let queryParams = {
            "path": "login",
            "message": res.message
          }
          this.router.navigate(['/dashboard/popup', { data: JSON.stringify(queryParams) }], { skipLocationChange: true });
  
        }
      
      },err=>{

      }).catch(resaon=>{

      })
      //this.auth.sendToken(this.loginForm.value.mobileNo)
      
    }else{

    }
    
  }
  signup(){
    this.router.navigate(['/register']);
  }


//  cordova.system.library.1=com.android.support:support-v4:24.1.1+
//cordova.system.library.2=com.android.support:support-annotations:27.+
//cordova.system.library.3=com.android.support:support-v4:26.+
//cordova.system.library.4=com.android.support:appcompat-v7:26.+
}
