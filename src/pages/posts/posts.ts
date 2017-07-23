import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {ListPage} from '../list/list';
import { ServicesProvider } from '../../providers/services/services';
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {
  users:any;
  items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private services:ServicesProvider,) {
  }

  ionViewDidLoad() {
    this.services.allPosts().then((res)=>{
        this.users = res;
        this.items = this.users;
      });
  }

  listUsers(){
    this.navCtrl.push(ListPage);
  }

}
