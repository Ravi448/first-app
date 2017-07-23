import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DefaultPage } from '../pages/default/default';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { LogoutPage } from '../pages/logout/logout';
import { MapsPage } from '../pages/maps/maps';
import {GalleryPage} from '../pages/gallery/gallery';
import {ForgotPage} from '../pages/forgot/forgot';
import {UploadPage} from '../pages/upload/upload';
import {DirectionPage} from '../pages/direction/direction';
import {ChatPage} from '../pages/chat/chat';
import {PostsPage} from '../pages/posts/posts';
import {DinfoPage} from '../pages/dinfo/dinfo';

import { IonicStorageModule} from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import {FilePath} from '@ionic-native/file-path';
import {Device} from '@ionic-native/device';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServicesProvider } from '../providers/services/services';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DefaultPage,
    LoginPage,
    LogoutPage,
    ProfilePage,
    MapsPage,
    SignupPage,
    GalleryPage,
    UploadPage,
    ForgotPage,
    DirectionPage,
    ChatPage,
    PostsPage,
    DinfoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DefaultPage,
    LoginPage,
    LogoutPage,
    ProfilePage,
    MapsPage,
    SignupPage,
    GalleryPage,
    ForgotPage,
    UploadPage,
    DirectionPage,
    ChatPage,
    PostsPage,
    DinfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesProvider,
    Camera,
    Transfer,
    Storage,
    FilePath,
    Device
  ]
})
export class AppModule {}
