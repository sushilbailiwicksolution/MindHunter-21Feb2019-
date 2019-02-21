import { Injectable } from '@angular/core';
import { CommonService } from '../../service/common.service';

@Injectable({
  providedIn: 'root'
})
export class QwserviceService {

  constructor(public api:CommonService) { }

  getQuickQuestion(endpoint,body):Promise<any>{
    return this.api.postRequests(endpoint,body);
  }

  submitAnswer(endpoint,body):Promise<any>{
    return this.api.postRequest(endpoint,body);
  }
  clamePrice(endpoint,body):Promise<any>{
    return this.api.postRequests(endpoint,body);
  }
  getActivePlayer(endpoint,body):Promise<any>{
    return this.api.postRequests(endpoint,body);
  }
  saveActivePlayerDetail(endpoint,body):Promise<any>{
    return this.api.postRequests(endpoint,body);
  }
  getPackList(endpoint,body):Promise<any>{
      return this.api.postRequest(endpoint,body);
  }

}
