import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController } from 'ionic-angular';

import { PostsPage } from '../posts/posts';

import { ServicesProvider } from '../../providers/services/services';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  users:any;
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public services:ServicesProvider,
      private localStorage:Storage,
      public events:Events,
      private loadingCtrl:LoadingController,
      private alertCtrl:AlertController,
      ) {
  }

  ionViewDidLoad() {
    
  }

  login(values){
    let loader = this.loadingCtrl.create({
      content: "Logging In ...",
      duration: 2000
    });
    loader.present();
    this.services.doLogin(values).then((res)=>{
      loader.dismiss();
      this.users = res;
      if(this.users.success){
        this.successAlert(this.users.message);
        this.localStorage.set('loggedIn',true);
        this.localStorage.set('users',this.users);
        this.events.publish('details',(this.users));
        this.navCtrl.setRoot(PostsPage);
      }else{
        this.errorAlert(this.users.message);
      }
      
    });
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
