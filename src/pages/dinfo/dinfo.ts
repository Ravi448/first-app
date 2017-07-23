import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Device } from '@ionic-native/device';

@Component({
  selector: 'page-dinfo',
  templateUrl: 'dinfo.html',
})
export class DinfoPage {
  info:any;
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private device:Device,
    ) {
      var items = [
                {key:'UUID',value: this.device.uuid},
                {key:'MODEL',value: this.device.model},
                {key:'MANUFACTURER',value: this.device.manufacturer},
                {key:'VERSION',value: this.device.version},
                {key:'PLATFORM',value: this.device.platform}
                ];
      this.info = items;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DinfoPage');
  }

}
