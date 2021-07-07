import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-weather',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent implements OnInit {
  weatherSub: any;
  timezone: any;
  temp: any;
  curr: any;
  JSONcurr: any;
  city: any;
  summary: any;
  imgSeal: any;
  humidity: any;
  pressure: any;
  wind: any;
  visibility: any;
  cc: any;
  ozone: any;
  humidBool = true;
  pressBool = true;
  windBool = true;
  visibilityBool = true;
  ccBool = true;
  ozoneBool = true;

  constructor(private route: ActivatedRoute, private router: Router) { }
  example: string;
  ngOnInit() {
   /* const navigation = this.router.getCurrentNavigation();
    const stat = navigation.extras.state;
    this.example = stat.example;
    console.log('example:' + this.example);
    console.log('here!!');*/
    this.route.queryParams.subscribe(params => {this.timezone = params.tz;
                                                this.imgSeal = params.imglink; this.temp = Math.round(params.temperature);
                                                this.curr = params.curr; this.city = params.city;
                                                this.summary = params.summ;
      });
    // console.log('in the new route');
    // console.log('tz received:' + this.timezone);
    // console.log('temp received: ' + this.temp);
    // console.log('summary received: ' + this.summary);
    // console.log('currently stringify received: ' + this.curr);
    // console.log('currently parsed received: ' + this.curr);
    this.JSONcurr = JSON.parse(this.curr);
    if ((this.JSONcurr.humidity === 0) || (this.JSONcurr.humidity === undefined)) {
      this.humidBool = false;
    } else {
      this.humidity = this.JSONcurr.humidity;
    }
    if ((this.JSONcurr.windSpeed === 0) || (this.JSONcurr.windSpeed === undefined)) {
      this.windBool = false;
    } else {
      this.wind = this.JSONcurr.windSpeed;
    }
    if ((this.JSONcurr.pressure === 0) || (this.JSONcurr.pressure === undefined)) {
      this.pressBool = false;
    } else {
      this.pressure = this.JSONcurr.pressure;
    }
    if ((this.JSONcurr.visibilty === 0) || (this.JSONcurr.visibility === undefined)) {
      this.visibilityBool = false;
    } else {
      this.visibility = this.JSONcurr.visibility;
    }
    if ((this.JSONcurr.cloudCover === 0) || (this.JSONcurr.cloudCover === undefined)) {
      this.ccBool = false;
    } else {
      this.cc = this.JSONcurr.cloudCover;
    }
    if ((this.JSONcurr.ozone === 0) || (this.JSONcurr.ozone === undefined)) {
      this.ozoneBool = false;
    } else {
      this.ozone = this.JSONcurr.ozone;
    }
    // console.log('humidity received: ' + this.JSONcurr.humidity);
    // console.log('image received:' + this.imgSeal);
  }

}
