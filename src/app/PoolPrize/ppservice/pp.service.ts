import { Injectable } from '@angular/core';
import { CommonService } from '../../service/common.service';

@Injectable({
  providedIn: 'root'
})
export class PPService {

  constructor(public api:CommonService) { }

  getActivePlayer(endpoint,body):Promise<any>{
    return this.api.postRequests(endpoint,body);
  }
  getTier(endpoint,body):Promise<any>{
    return this.api.postRequests(endpoint,body);
  }
  saveActivePlayerDetail(endpoint,body):Promise<any>{
    return this.api.postRequests(endpoint,body);
  }
  getPackList(endpoint,body):Promise<any>{
      return this.api.postRequest(endpoint,body);
  }
  getQuestion(endpoint,body):Promise<any>{
    return this.api.postRequests(endpoint,body);
  }
  saveAnswer(endpoint,body):Promise<any>{
    return this.api.postRequest(endpoint,body);
  }
  getClaim(endpoint,body):Promise<any>{
      return this.api.postRequests(endpoint,body);
  }
}
