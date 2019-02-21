import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CommonService } from '../service/common.service';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CashblastService } from '../CashBlast/services/cashblast.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  public supportForm: FormGroup;
  public name: AbstractControl
  public contestname: AbstractControl;
  public mobile: AbstractControl;  
  public email: AbstractControl;  
  

  userId:any;
  constructor(public cbservice: CashblastService,public auth:AuthService, public router: Router,public fb: FormBuilder,private toastrService: ToastrService) {
    this.supportForm = this.fb.group({
      name: ['', Validators.required],
      contestname: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required]
    });
    // this.userId = localStorage.getItem('mobileNo');
    // console.log("userId==> ",this.userId);
    this.userId= this.auth.getUserId();
  }

  ngOnInit() {

    this.name = this.supportForm.controls['name'];
    this.contestname = this.supportForm.controls['contestname'];
    this.mobile = this.supportForm.controls['mobile'];
    this.email = this.supportForm.controls['email'];
  }


  //yash//


  
  response:any; 
  userQuery() {
    //console.log("Valid Form===>" + this.supportForm);
    console.log("userId==> ",this.userId);
    if (this.supportForm.valid) {
      
      let reqBody = { 
        userId:this.userId,
        name: this.supportForm.value.name, 
        mobileNo: this.supportForm.value.mobile, 
        email: this.supportForm.value.email, 
        contestName: this.supportForm.value.contestname, 
        query: "Just Testing Purpose Only" }
      // console.log(reqData);
      console.log("name==> ", this.supportForm.value.email, " mobile==> ", this.supportForm.value.mobile);
      this.cbservice.submitQuery("addSupportQuery", reqBody).then((res) => {
  
        console.log("response ==> "+JSON.stringify(res));
       this.response = JSON.stringify(res);
       console.log("statusCode==>",res.statusCode)
       if(res.statusCode == 0){
        this.toastrService.success('Success', res.message);
        setTimeout(()=>{
          this.toastrService.clear();
          this.router.navigate(["/dashboard"]);
        },2000);
         
       }  
       
      }, err => {

      }
      ).catch(reason => {

      })
    } else {
      this.supportForm.controls['name'].markAsTouched();
      this.supportForm.controls['contestname'].markAsTouched();
      this.supportForm.controls['mobile'].markAsTouched();
      this.supportForm.controls['email'].markAsTouched();
      console.log("invalid from")
    }
  }


  goBack(){
    this.router.navigate(["/dashboard"])
  }
}
