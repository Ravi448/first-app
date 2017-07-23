import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

import {Storage} from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DefaultPage } from '../pages/default/default';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { LogoutPage } from '../pages/logout/logout';
import { MapsPage } from '../pages/maps/maps';
import {GalleryPage} from '../pages/gallery/gallery';
import {ChatPage} from '../pages/chat/chat';
import {PostsPage} from '../pages/posts/posts';
import {DinfoPage} from '../pages/dinfo/dinfo';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;
  details:{first_name:string,last_name:string}[] = [];
  users:any;
  udet:any;
  pages: Array<{icon:string,title: string, component: any}>;

  constructor(
      public platform: Platform, 
      public statusBar: StatusBar, 
      public splashScreen: SplashScreen,
      public events:Events,
      private localStorage:Storage,
      private alertCtrl:AlertController,
      
      ) {
        var config = {
          apiKey: "AIzaSyDvqN736EjAhoV2BopibRNpb8WuL15KrmQ",
          authDomain: "mynearest-7fa0a.firebaseapp.com",
          databaseURL: "https://mynearest-7fa0a.firebaseio.com",
          projectId: "mynearest-7fa0a",
          storageBucket: "mynearest-7fa0a.appspot.com",
          messagingSenderId: "706527221778"
        };
  firebase.initializeApp(config);
    //this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { icon:'home', title: 'Home', component: PostsPage },
      { icon:'person', title: 'Profile', component: ProfilePage },
      {icon:'images',title:'My Gallery',component:GalleryPage},
      {icon:'chatbubbles',title:'My Chats',component:ChatPage},
      { icon:'help', title: 'Device Info', component: DinfoPage },
      { icon:'log-out', title: 'Logout', component: LogoutPage },

    ];

    this.localStorage.get('loggedIn').then((res)=>{
        if(res){
          this.localStorage.get('users').then((resp)=>{
            this.users = resp;
            this.events.publish('details',(resp));
            this.rootPage = PostsPage;
          });
        }else{
            this.rootPage = DefaultPage;
        }
      });
      this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.events.subscribe('details',(use)=>{
        this.details = use;
      });
    });
  }

  initializeApp() {
    
  }

  successAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
