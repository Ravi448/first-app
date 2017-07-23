import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Geolocation} from '@ionic-native/geolocation';

import { ServicesProvider } from '../../providers/services/services';

declare var google;

@Component({
  selector: 'page-direction',
  templateUrl: 'direction.html',
})
export class DirectionPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start: Object = {};
  end: Object = {lat:28.4594965,lng:77.0266383};
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  resx:any;
  resd:any;
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private geolocation:Geolocation,
      public authService:ServicesProvider,
    ) {
      this.geolocation.getCurrentPosition().then((res)=>{
        this.start = {lat:res.coords.latitude,lng:res.coords.longitude};
        // this.authService.getMyLocation(res.coords.latitude, res.coords.longitude).then((resc)=>{
        //   this.resx = resc;
        //   console.log(this.resx);
        //   console.log(this.resx.results[0].place_id);
        //   this.start = this.resx.results[0].geometry.location;
        // });
      });
      // this.authService.getMyLocation(28.4595, 77.0266).then((resc)=>{
      //   this.resd = resc;
      //   console.log(this.resd);
      //   console.log(this.resd.results[0].place_id);
      //   this.end = this.resd.results[0].geometry.location
      // });
      setTimeout(()=>{
          this.calculateAndDisplayRoute();
      },10000);
  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });

    this.directionsDisplay.setMap(this.map);
  }

  calculateAndDisplayRoute() {
    console.log(this.start);
    console.log(this.end);
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        this.directionsDisplay.setPanel(document.getElementById('directionsPanel'));
      } else {
        console.log(status);
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
