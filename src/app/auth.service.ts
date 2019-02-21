import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleCrypt } from "ngx-simple-crypt";
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isSpined: boolean;
  
  winnerFlag: boolean;
  simpleCrypt = new SimpleCrypt();
  key: string = "nmss";
  playerName: string;
  winnerData: Array<{ mobileNo: string, rank: number }>

  constructor(private myRoute: Router) {

  }
  sendToken(token: string) {
    //token= btoa(token);
    //let encodedString = this.simpleCrypt.encode(this.key, token);

    localStorage.setItem("LoggedInUser", token);
  }
  getToken() {
    let decodedString;
    if (localStorage.getItem("LoggedInUser") != undefined) {
      this.playerName = localStorage.getItem("LoggedInUser");
      // this.playerName = this.simpleCrypt.decode(this.key, localStorage.getItem("LoggedInUser"));
      // console.log("Decode mobile no===>" +this.playerName);
      return this.playerName;
    } else {
      return localStorage.getItem("LoggedInUser");
    }

    // return localStorage.getItem("LoggedInUser");
  }
  isLoggednIn() {
    if(this.getToken()!== null && this.getUserId() !== null){
      return true;
    }else{
      return false
    }
    //return this.getToken() !== null;
  }
  setUserId(userId: any) {
    // let encodedString = this.simpleCrypt.encode(this.key, userId);

    localStorage.setItem("userId", userId);
  }
  getUserId() {

    // if (localStorage.getItem("userId") != undefined) {
    //   console.log("Decode userId no===>" + this.simpleCrypt.decode(this.key, localStorage.getItem("userId")));
    //   return this.simpleCrypt.decode(this.key, localStorage.getItem("userId"));
    // } else {
    return localStorage.getItem("userId")

  }
  setInstanceId(instanceId: any) {
    // let encodedString = this.simpleCrypt.encode(this.key, instanceId);
    localStorage.setItem("instanceId", instanceId);
  }
  getInstanceId() {
    // if (localStorage.getItem("instanceId") != undefined) {
    //   console.log("Decode instanceId no===>" + this.simpleCrypt.decode(this.key, localStorage.getItem("instanceId")));

    //   return this.simpleCrypt.decode(this.key, localStorage.getItem("instanceId"));
    // } else {
    return localStorage.getItem("instanceId")

  }
  setGameId(gameId: any) {
    // console.log("before encodedString game Id=>"+gameId)
    // let encodedString = this.simpleCrypt.encode(this.key, gameId);
    // console.log("after encodedString game Id=>"+encodedString)
    localStorage.setItem("gameId", gameId);

  }
  getGameId() {
    //   if (localStorage.getItem("gameId") != undefined) {
    //     console.log("after encodedString game Id=>"+localStorage.getItem("gameId"))
    //     let gameId=localStorage.getItem("gameId");

    //   let decoded =  this.simpleCrypt.decode(this.key, gameId);
    //   console.log("Decode gameId no===>" + decoded);
    //   return decoded;
    // } else {
    return localStorage.getItem("gameId")

  }
  setPackId(packId: any) {
    // let encodedString = this.simpleCrypt.encode(this.key, packId);
    localStorage.setItem("packId", packId);

  }
  getPackId() {
    // if (localStorage.getItem("packId") != undefined) {
    //   return this.simpleCrypt.decode(this.key, localStorage.getItem("packId"));
    // } else {
    return localStorage.getItem("packId")
    // }
  }

  setGameSeasonTime(seasonTime: any) {
    console.log("session time is ", seasonTime);
    localStorage.setItem("seasonTime", seasonTime);
  }
  getGameSeasonTime() {
    return localStorage.getItem("seasonTime");
  }
  setEntryFee(entryFees: any) {
    localStorage.setItem("entryFees", entryFees);
  }
  setReward(reward: any) {
    console.log("session time is ", reward);
    localStorage.setItem("reward", reward);
  }
  getReward() {
    return localStorage.getItem("reward");
  }
  setWinAmt(winamt: any) {
    console.log("session time is ", winamt);
    localStorage.setItem("winamt", winamt);
  }
  getWinAmt() {
    return localStorage.getItem("winamt");
  }
  setDenominationType(denomination: any) {
    console.log("session time is ", denomination);
    localStorage.setItem("denomination", denomination);
  }
  getDenominationType() {
    return localStorage.getItem("denomination");
  }
  getEntryFee() {
    return localStorage.getItem("entryFees");
  }
  setMarginePrice(marginePrice: any) {
    localStorage.setItem("marginePrice", marginePrice);
  }
  getMarginePrice() {
    return localStorage.getItem("marginePrice");
  }

  getWinners() {
    return this.winnerData;
  }
  setWinners(winners: Array<{ mobileNo: string, rank: number }>) {
    this.winnerData =winners;
    // localStorage.setItem("winners", winners);
  }
  setWinnerLength(winnerslength: any) {
    localStorage.setItem("winnerslength", winnerslength);
  }
  getWinnerLength() {
    return localStorage.getItem("winnerslength");
  }
  setWinnerFlag(winnersflag: any) {
    this.winnerFlag = winnersflag
   // localStorage.setItem("winnersflag", winnersflag);
  }
  getWinnerFlag() {
    return this.winnerFlag
  }
setIsSpined(isSpin:any){
  this.isSpined = isSpin;
   //localStorage.setItem("isSpin", isSpin);
}
getIsSpined(){
  return this.isSpined;
 // return localStorage.getItem("isSpin");
}
  
  logout() {
    localStorage.removeItem("LoggedInUser");
    this.myRoute.navigate([""]);
  }



}
