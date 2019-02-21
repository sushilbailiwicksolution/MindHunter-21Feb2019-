import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

   API_URL = "http://13.233.39.58:8080/MindHunterApi";
   API_URLs = "http://13.233.39.58:8092/cms/game";
   API_URL_new = "http://13.232.118.226:8091/cms/userHistory";

  //  API_URL = "http://13.232.210.178:8080/MindHunterApi";
  //  API_URLs = "http://13.232.210.178:8092/cms/game";
  //  API_URL_new = "http://13.232.118.226:8091/cms/userHistory";

 constructor(public http: HttpClient) { }
  postRequest(endpoint: string, body: any) {
    const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return new Promise((resolve, reject) => {
      this.http.post(this.API_URL + "/" + endpoint, JSON.stringify(body),{headers:myHeaders})
        .subscribe((res: any) => {  
          resolve(res);  
        }, (err) => {
          reject(err);   
        });
    });
  }

  postRequests(endpoint: string, body: any) {
    const myHeaders = new HttpHeaders({ 
      'Content-Type': 'application/json',
       'Access-Control-Allow-Origin' :'http://localhost:4200'});
    return new Promise((resolve, reject) => {
      this.http.post(this.API_URLs + "/" + endpoint, JSON.stringify(body),{headers:myHeaders})
        .subscribe((res: any) => {  
          resolve(res);  
        }, (err) => {
          reject(err);   
        });
    });
  }
  postRequest_new(endpoint: string, body: any) {
    const myHeaders = new HttpHeaders({ 
      'Content-Type': 'application/json',
       'Access-Control-Allow-Origin' :'http://localhost:4200'});
    return new Promise((resolve, reject) => {
      this.http.post(this.API_URL_new + "/" + endpoint, JSON.stringify(body),{headers:myHeaders})
        .subscribe((res: any) => {  
          resolve(res);  
        }, (err) => {
          reject(err);   
        });
    });
  }

  getRequest(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.API_URL + '/' + endpoint, reqOpts).toPromise();
  }


  
  // public PostData(enpoint, data): Observable<any> {
  //   const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post(this.API_URL + '/' + enpoint, JSON.stringify(data), { headers: myHeaders })

  // }

   // 
}
