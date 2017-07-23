import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-default',
  templateUrl: 'default.html',
})
export class DefaultPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DefaultPage');
  }

  wayToLogin(){
    this.navCtrl.push(LoginPage);
  }

  wayToSignup(){
    this.navCtrl.push(SignupPage);
  }


}
