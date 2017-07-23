import { Component } from '@angular/core';
import { IonicPage,ActionSheetController ,NavController, NavParams,Events,AlertController,LoadingController } from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import {GalleryPage} from '../gallery/gallery';

import {Storage} from '@ionic/storage';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import {FilePath} from '@ionic-native/file-path';

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
  latitude:any = 0.0;
  longitude:any = 0.0;
  share:any = "Private";
  shareVal:number = 0;
  myImage:any = "11.jpg";
  selImg:any;
  users:any;
  response:any;
  response1:any;
  response2:any;
  uid1:any;
  uid2:number = 0;
  imageData:any = '';
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private transfer: Transfer,
      private camera: Camera,
      private localStorage:Storage,
      public events:Events,
      private alertCtrl:AlertController,
      private loadingCtrl:LoadingController,
      private actionSheetCtrl:ActionSheetController,
      private filePath:FilePath,
      private geolocation:Geolocation
  ) {
    this.localStorage.get('users').then((resx)=>{
        this.uid1 = resx;
      this.uid2 =  this.uid1.user_id;
    });
    this.geolocation.getCurrentPosition().then((res)=>{
      this.latitude = res.coords.latitude;
      this.longitude = res.coords.longitude;
    });
  }

  ionViewDidLoad() {
  }

  chooseImage(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Browse from Gallery',
          handler: () => {
            this.takePicture(0);
          }
        },
        {
          text: 'Capture With Camera',
          handler: () => {
            this.takePicture(1);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


  takePicture(type){
    let options = {
      quality: 100,
      sourceType:type,
      destinationType:this.camera.DestinationType.NATIVE_URI,
    };
    this.camera.getPicture(options).then((imageData) => {
      this.imageData = imageData;
      this.filePath.resolveNativePath(imageData)
      .then(filePath => this.myImage = filePath)
      .catch(err => console.log(err));
    });
  }


  changeStatus(event){
    if(event.checked){
      this.share = "Public";
      this.shareVal = 1;
    }else{
      this.share = "Private";
      this.shareVal = 0;
    }
  }

  newPost(values){
    console.log(this.latitude);
    let loader = this.loadingCtrl.create({
      content: "Uploading post ..."
    });
    loader.present();
    this.localStorage.get('users').then((resx)=>{
      this.uid1 = resx;
      this.uid2 =  this.uid1.user_id;
      this.users = values;
      if(this.imageData != ''){
        const fileTransfer: TransferObject = this.transfer.create();
        this.selImg = this.imageData;
        let options1: FileUploadOptions = {
          fileKey: 'file',
          fileName: 'memory.jpg',
          chunkedMode: false,
          mimeType: "multipart/form-data",
          params : {
              'user_id':this.uid2,
              'title': this.users.title,
              'about':this.users.about,
              'share':this.shareVal,
              'latitude':this.latitude,
              'longitude':this.longitude
          }
        }
        fileTransfer.upload(this.imageData, 'http://www.vowelsoft.in/myNearest/upload.php', options1)
        .then((data) => {
          loader.dismiss();
          this.response = data;
          this.response1 = JSON.parse(this.response.response);
          this.response2 = this.response1.response;
          this.successAlert(this.response2.message);
        }, (err) => {
          loader.dismiss();
          alert(JSON.stringify(err));
          this.errorAlert(this.response2.message);
        });
      }else{
        loader.dismiss();
        this.errorAlert('Please chooose an image');
      }
    });
  }

  successAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: msg,
      buttons: [
          {
          text: 'Got it!!',
          handler: data => {
            this.navCtrl.setRoot(GalleryPage);
          }
        }
      ]
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
