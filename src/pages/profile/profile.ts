import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController } from 'ionic-angular';


import { ServicesProvider } from '../../providers/services/services';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile:string = "myData";
  users:any;
  details:{first_name:string,last_name:string,email:string,phone:number,user_id:number,password:string}[] = [];
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public events:Events,
      private localStorage:Storage,
      private services:ServicesProvider,
      private alertCtrl:AlertController,
      private loadingCtrl:LoadingController
      ) {
      this.localStorage.get('users').then((resp)=>{
        this.users = resp;
        this.events.publish('details',(resp));
      });
        
  }

  ionViewDidLoad() {
    this.events.subscribe('details',(use)=>{
       this.details = use;
    });
  }

  updateProfile(values){
    let loader = this.loadingCtrl.create({
      content: "Updating profile ...",
      duration: 2000
    });
    this.localStorage.get('users').then((use)=>{
      loader.present();
       this.users = use;
       this.details = this.users;
       this.services.updateMe(values,this.users.user_id).then((res)=>{
        loader.dismiss();
        this.users = res;
        if(this.users.success){
          this.localStorage.remove('users');
          this.localStorage.set('users',this.users);
          this.events.publish('details',this.users);
          this.successAlert(this.users.message);
        }else{
          this.errorAlert(this.users.message);
        }
       });
    });
  }

  changePass(values){
    if(values.password == values.cpassword){
      delete values.cpassword;
      let loader = this.loadingCtrl.create({
        content: "Changing password ...",
        duration: 2000
      });
      this.localStorage.get('users').then((use)=>{
        loader.present();
        this.users = use;
        this.details = this.users;
        this.services.changePass(values,this.users.user_id).then((res)=>{
          loader.dismiss();
          this.users = res;
          if(this.users.success){
            this.localStorage.remove('users');
            this.localStorage.set('users',this.users);
            this.events.publish('details',this.users);
            this.successAlert(this.users.message);
          }else{
            this.errorAlert(this.users.message);
          }
        });
      });
    }else{
      this.errorAlert('Password did not match.');
    }
  }

  successAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  errorAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: msg,
      buttons: ['Try Again']
    });
    alert.present();
  }

  isReadonly() {return true;}

}
