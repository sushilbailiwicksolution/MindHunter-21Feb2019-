import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpinWheelService } from '../services/spw.service';
import { AuthGuard } from '../../auth.guard';
import { AuthService } from '../../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-spwwinner',
  templateUrl: './spwwinner.component.html',
  styleUrls: ['./spwwinner.component.css']
})
export class SpwwinnerComponent implements OnInit {

  res:any;
  claimForm:any
  winningPrice: any
  winnerData: any;
  constructor(public router: Router,public fb:FormBuilder,private toastrService: ToastrService,public auth:AuthService, public swservice:SpinWheelService, public actroute: ActivatedRoute) { 
    this.claimForm = fb.group({
      mobileNo: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]]
    });
  }

  ngOnInit() {
    this.actroute.params.subscribe(value => {

      this.winnerData = JSON.parse(value.winnerData);
     
      this.winningPrice = this.winnerData.price;
      console.log("Winner Data=======> ", this.winnerData);
      console.log("Price==> ",this.winningPrice);
    });

  }

  getClaim() {
    console.log("get claim=============>")

    if (this.claimForm.valid) {
    let reqbody = {
      userId: this.auth.getUserId(),
      gameId: this.auth.getGameId(),
      stopPointId: this.winnerData.id,
      alternateMobileNumber:this.claimForm.value.mobileNo,
    }
    console.log("request====> ",reqbody)
    this.swservice.getStopPoint("claimPrize", reqbody).then((values) => {
     
      console.log("res data==> ", JSON.stringify(values));
      if(values.statusCode == 0){
        this.toastrService.success('Success', values.message);
        setTimeout(() => {
          this.toastrService.clear();
        this.router.navigate(["/dashboard"]);
        },4000)
      }
  })
  }else{
    console.log("invalid Form")
  }
}
getReplay(){
  this.router.navigate(["/dashboard"]);
}
}
