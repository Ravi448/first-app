import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://localhost/myNearest/';

@Injectable()
export class ServicesProvider {
  data:any;
  constructor(public http: Http) {
    console.log('Hello ServicesProvider Provider');
  }

  doLogin(values){
    return new Promise((resolve, reject) => {
        this.http.post(apiUrl+'login.php',JSON.stringify(values))
          .map(res=>res.json())
          .subscribe(users => {
            this.data = users;
            resolve(this.data.response);
          }, (err) => {
            reject(err);
          });
    });
  }

  doSignup(values){
    return new Promise((resolve, reject) => {
        this.http.post(apiUrl+'index.php',JSON.stringify(values))
          .map(res=>res.json())
          .subscribe(users => {
            this.data = users;
            resolve(this.data.response);
          }, (err) => {
            reject(err);
          });
    });
  }

  updateMe(values,id){
    return new Promise((resolve, reject) => {
        this.http.post(apiUrl+'update.php?id='+id,JSON.stringify(values))
          .map(res=>res.json())
          .subscribe(users => {
            this.data = users;
            resolve(this.data.response);
          }, (err) => {
            reject(err);
          });
    });
  }

  changePass(values,id){
    return new Promise((resolve, reject) => {
        this.http.post(apiUrl+'updatePass.php?id='+id,JSON.stringify(values))
          .map(res=>res.json())
          .subscribe(users => {
            this.data = users;
            resolve(this.data.response);
          }, (err) => {
            reject(err);
          });
    });
  }

  allPosts(){
    return new Promise((resolve) => {
        this.http.get(apiUrl+'allpost.php')
          .map(res=>res.json())
          .subscribe(users => {
            this.data = users;
            resolve(this.data.response);
          });
    });
  }

  listings(id){
    return new Promise((resolve) => {
        this.http.get(apiUrl+'listing.php?id='+id)
          .map(res=>res.json())
          .subscribe(users => {
            this.data = users;
            resolve(this.data.response);
          });
    });
  }

  myMedia(id){
    return new Promise((resolve) => {
        this.http.get(apiUrl+'media.php?user_id='+id)
          .map(res=>res.json())
          .subscribe(users => {
            this.data = users;
            resolve(this.data.response);
          });
    });
  }

  getMyLocation(lat,lon){
    return new Promise((resolve) => {
        this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+'&sensor=true')
          .map(res=>res.json())
          .subscribe(users => {
            this.data = users;
            resolve(this.data);
          });
    });
  }

}
