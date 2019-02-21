import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';


@Injectable({
  providedIn: 'root'
})
export class SpinWheelService {

  constructor(public api:CommonService) { 


  }

  getStopPoint(endPoint,body):Promise<any>{
   return this.api.postRequest(endPoint,body);   
  }

  getStartWheel(endPoint,body):Promise<any>{
    return this.api.postRequest(endPoint,body);
  }

  getClaimPrize(endPoint,body):Promise<any>{
    return this.api.postRequest(endPoint,body);
  }
  getPackList(endPoint,body):Promise<any>{
    return this.api.postRequest(endPoint,body);
  }
}
