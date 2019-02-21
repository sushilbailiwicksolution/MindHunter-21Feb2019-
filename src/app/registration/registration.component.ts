import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../service/common.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../loginservice/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  signupResponse: any;
  constructor(public router: Router, public fb: FormBuilder,public loginService:LoginService, public api: CommonService, private toastrService: ToastrService
  ) {


  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  register() {

    if (this.registerForm.valid) {
      let body = { mobileNo: this.registerForm.value.mobileNumber }
      this.api.postRequest("sendOtp", body).then(res => {
        this.signupResponse = res;
        if (this.signupResponse.statusCode == 0) {
          this.toastrService.success('Success', this.signupResponse.message);
          setTimeout(() => {
            this.toastrService.clear();
         
              console.log("Send Otp==>"+JSON.stringify(res));
              this.router.navigate(['/otp']);
           
            
          }, 1000);

        } else {
        //  this.toastrService.error('Failed', this.signupResponse.message);
          let queryParams = {
            "path": "login",
            "message":this.signupResponse.message
          }
          this.router.navigate(['/dashboard/popup', { data: JSON.stringify(queryParams) }], { skipLocationChange: true });
    
        }
        console.log("this.registerForm=>", JSON.stringify(res))

      }, err => {
        console.log("this.registerForm=>", JSON.stringify(err))
      })
    } else {
      console.log("this.registerForm=>", this.registerForm);
    }



  }
}
