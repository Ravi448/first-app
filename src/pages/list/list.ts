import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { FormControl } from '@angular/forms';

import {MapsPage} from '../maps/maps';

import { ServicesProvider } from '../../providers/services/services';
import { Storage } from '@ionic/storage';

import {DirectionPage} from '../direction/direction';

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{image: string, first_name: string,last_name:string, created: string}>;
  users:any;
  using:any;
  searchTerm: string = '';
  searchControl:FormControl;
  searching: any = false;
  lis:any;
  list1:any = '';
  items1:any;
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private localStorage:Storage,
      private services:ServicesProvider,
      private events:Events,
      ) {
      this.searchControl = new FormControl();

      this.localStorage.get('users').then((resp)=>{
        this.users = resp;
        this.events.publish('details',(resp));
      });
      // setInterval(()=>{
      //    this.localStorage.get('loggedIn').then((resp)=>{
      //      if(resp){
      //         this.reloadingD();
      //      }
      //    })
      // },1000);
  }

  ionViewDidLoad(){
    this.events.subscribe('details',(use)=>{
      this.using = use;
      this.services.listings(this.using.user_id).then((res)=>{
        this.users = res;
        this.items = this.users;
        this.items1 = this.items;
      });
    });
    // console.log(this.searchTerm);
    // this.setFilteredItems();
 
        this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
            this.searching = false;
            this.setFilteredItems();
 
        }); 
  }

  onSearchInput(){
        this.searching = true;
    }

  getData(){
    this.events.subscribe('details',(use)=>{
      this.using = use;
      this.services.listings(this.using.user_id).then((res)=>{
        this.users = res;
        this.items = this.users;
      });
    });
  }
 
  filterItems(searchTerm){
 
        return this.items.filter((item) => {
          this.lis = item;
          this.list1 = this.lis.first_name+' '+this.lis.last_name
            return this.list1.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });     
 
    }

  setFilteredItems(){
      if(this.searchTerm.length>0){
        // this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
          this.items = this.filterItems(this.searchTerm);
        // });
      }else{
        this.items = this.items;
      }
  }

  getDirection(){
    this.navCtrl.push(DirectionPage);
  }

  doRefresh(refresher) {
    this.reloadingD();
    if(refresher != 0){
      console.log('fkdhk');
      refresher.complete();
    }
  }

  reloadingD(){
    this.localStorage.get('users').then((resp)=>{
      this.using = resp;
      this.services.listings(this.using.user_id).then((res)=>{
        this.users = res;
        this.items = this.users;
      });
    });
  }

  wayToMap(){
    this.navCtrl.push(MapsPage);
  }

}
