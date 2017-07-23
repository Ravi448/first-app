import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';


import {UploadPage} from '../upload/upload';


import { ServicesProvider } from '../../providers/services/services';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  users:any;
  items:any;
  constructor(
    public navCtrl: NavController, 
      public navParams: NavParams,
      private localStorage:Storage,
      private services:ServicesProvider,
      private events:Events,
  ) {
    this.localStorage.get('users').then((resp)=>{
        this.users = resp;
        this.events.publish('details',(resp));
      });
  }

  ionViewDidLoad() {
    this.events.subscribe('details',(use)=>{
      this.users = use;
      this.services.myMedia(this.users.user_id).then((res)=>{
        this.users = res;
        this.items = this.users;
      });
    });
  }

  newPic(){
    this.navCtrl.push(UploadPage);
  }

}
