import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';

import {Storage} from '@ionic/storage';

import {DefaultPage} from '../default/default';


@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private loadingCtrl:LoadingController,
      private localStorage:Storage,
      ) {

        let loader = this.loadingCtrl.create({
        content: "Logging out...",
        duration: 2000
      });
      loader.present();
      this.localStorage.clear();
      loader.dismiss();
      this.navCtrl.setRoot(DefaultPage);
  }

  ionViewDidLoad() {
  }

}
