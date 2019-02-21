import { Injectable } from '@angular/core';
import { CommonService } from '../service/common.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public api: CommonService) { }
  sendOtpRequest(endPoint, body):Promise<any> {
    return this.api.postRequest(endPoint, body);
  }
  verifyOtpRequest(endPoint, body):Promise<any> {
    return this.api.postRequests(endPoint, body);
  }
  getGameList(endPoint, body):Promise<any> {
    return this.api.postRequests(endPoint, body);
  }

}
