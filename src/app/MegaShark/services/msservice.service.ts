import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';

@Injectable({
  providedIn: 'root'
})
export class MsserviceService {

  constructor(public api:CommonService) { }
   getPackList(endpoint,body):Promise<any>{
    return this.api.postRequests(endpoint,body);
   }
   getNormalModeQuestions(endpoint,body):Promise<any>{
    return this.api.postRequests(endpoint,body);
   }
   getBosterModeQuestions(endpoint,body):Promise<any>{
    return this.api.postRequests(endpoint,body);
   }
   getActivePlayerDetails(endpoint,body):Promise<any>{
    return this.api.postRequests(endpoint,body);
   }
   saveActivePlayerDetail(endpoint,body):Promise<any>{
    return this.api.postRequests(endpoint,body);
   }
   submitAnswer(endpoint,body):Promise<any>{
    return this.api.postRequests(endpoint,body);
   }
   applyClaim(endpoint,body):Promise<any>{
    return this.api.postRequests(endpoint,body);
   }
   getScoreBoard(endpoint,body):Promise<any>{
    return this.api.postRequests(endpoint,body);
   }
}
