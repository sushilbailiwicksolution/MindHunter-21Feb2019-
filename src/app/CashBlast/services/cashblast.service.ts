import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';

@Injectable({
  providedIn: 'root'
})
export class CashblastService {

  constructor(public api:CommonService) { 
    
  }
  getGameList(end,body){
//return this.api.postRequest
  }

getGameInstance(endPoint,body):Promise<any>{
  return this.api.postRequest(endPoint,body);
}

// getGamePackList(endPoint,body):Promise<any>{
//   return this.api.postRequest(endPoint,body);
// }

getQuestion(endpoint,body):Promise<any>{
  return this.api.postRequests(endpoint,body);
}
getPackList(endpoint,body):Promise<any>{
 return this.api.postRequest(endpoint,body);
}

gameInstanceStart(endpoint,body):Promise<any>{
  return this.api.postRequest(endpoint,body);
}
submitAnswer(endpoint,body):Promise<any>{
  return this.api.postRequests(endpoint,body);
}

getLooser(endpoint,body):Promise<any>{
  return this.api.postRequests(endpoint,body);
}
getWinner(endpoint,body):Promise<any>{
  return this.api.postRequests(endpoint,body);
}
submitQuery(endpoint,body):Promise<any>{
  return this.api.postRequests(endpoint,body);
}

getPayment(endpoint):Promise<any>{
  return this.api.getRequest(endpoint);
}
getredirectendpoint(endpoint,body):Promise<any>{
  return this.api.postRequest(endpoint,body);
}
getMargine(endpoint,body):Promise<any>{
  return this.api.postRequests(endpoint,body);
}
getClaim(endpoint,body):Promise<any>{
  return this.api.postRequests(endpoint,body);
}
getRefund(endpoint,body):Promise<any>{
  return this.api.postRequests(endpoint,body);
}
}
