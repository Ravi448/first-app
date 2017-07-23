import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


import * as firebase from 'firebase';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  ref;
	name;
	newmessage;
	messagesList;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl:AlertController,  
  ) {
      this.ref = firebase.database().ref('messages');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.alertCtrl.create({
  		title:'Username',
  		inputs:[{
  			name:'username',
  			placeholder: 'username'
  		}],
  		buttons:[{
  			text: 'Continue',
  			handler: username =>{
  				this.name = username
  			}
  		}]
  	}).present();

  	//reading data from firebase
  	this.ref.on('value',data => {
  		let tmp = [];
  		data.forEach( data => {
  			tmp.push({
  				key: data.key,
  				name: data.val().name,
  				message: data.val().message
  			})
  		});
  		this.messagesList = tmp;
  	});
  }

  send(){
  	// add new data to firebase
  	this.ref.push({
  		name: this.name.username,
  		message: this.newmessage
  	});
  }


}
