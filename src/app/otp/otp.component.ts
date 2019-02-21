import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginService } from '../loginservice/login.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  public otpForm:FormGroup;
  public mobileNo: any;
  public otp:AbstractControl;
  constructor(public router: Router, public fb: FormBuilder, public auth: AuthService, public loginService: LoginService) {

    this.mobileNo = this.auth.getToken()
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
    this.otp=this.otpForm.controls['otp']
  }

  ngOnInit() {
   
  }
  getMobileNumberMask(mobileNo){
    return mobileNo.substr(0,0)+"XXXXXX"+mobileNo.substr(-4);
    }


  verifyOtp() {
    console.log(" otp is ====> ",this.otpForm.controls['otp'].value);
    if (this.otpForm.valid) {
      //   this.auth.sendToken(this.otpForm.value.otp)
      let body = {
        mobileNo: this.mobileNo,
        otp: this.otpForm.controls['otp'].value };
if(this.otpForm.controls['otp'].value != undefined && this.otpForm.controls['otp'].value != ""){
  this.loginService.verifyOtpRequest("verifyOtp", body).then(res => {
    console.log("verify otp res==> ",res);
    if (res.statusCode == 0) {
      this.auth.setUserId(res.data);
      console.log("Login response==>" + JSON.stringify(res));
      if(res.data != 0 ){
        this.router.navigate(['/dashboard']);
      }
     
    }else{
      let queryParams = {
        "path": "login",
        "message": res.message
      }
      this.router.navigate(['/dashboard/popup', { data: JSON.stringify(queryParams) }], { skipLocationChange: true });

    }

  })
}
     

    }
  }


  resendOtp(){
    console.log("Mobile No ===>"+this.mobileNo);
    if (this.mobileNo !=null) {
      let body={mobileNo:this.mobileNo}
      this.loginService.sendOtpRequest("sendOtp",body).then(res=>{
        
        this.router.navigate(['/otp']);
      },err=>{

      }).catch(resaon=>{

      })
      //this.auth.sendToken(this.loginForm.value.mobileNo)
      
    }else{

    }
  }
}
