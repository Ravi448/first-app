import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events, LoadingController, AlertController} from 'ionic-angular';

import { ServicesProvider } from '../../providers/services/services';

import { Storage } from '@ionic/storage';

import {ListPage} from '../list/list';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  users:any;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private loadingCtrl:LoadingController,
      private alertCtrl:AlertController,
      private services:ServicesProvider,
      private localStorage:Storage,
      private events:Events,
      ) {
  }

  ionViewDidLoad() {
    
  }

  signup(values){
    if(values.password == values.cpassword){
      if(values.email.includes('@')){
        let loader = this.loadingCtrl.create({
          content: "Logging In ...",
          duration: 2000
        });
        loader.present();
        this.services.doSignup(values).then((res)=>{
          loader.dismiss();
          this.users = res;
          if(this.users.success){
            this.successAlert(this.users.message);
            this.localStorage.set('loggedIn',true);
            this.localStorage.set('users',this.users);
            this.events.publish('details',(this.users));
            this.navCtrl.setRoot(ListPage);
          }else{
            this.errorAlert(this.users.message);
          }
        });
      }else{
         this.errorAlert('Invalid email given.');
      }
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

}
