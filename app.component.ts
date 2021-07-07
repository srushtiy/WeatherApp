import {Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {NavigationExtras, Router} from '@angular/router';
import { DatePipe } from '@angular/common';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {TooltipPosition} from '@angular/material';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('weatherForm', {static: false}) public weatherForm: NgForm;
  title = 'weather-app';
  submitted = false;
  public timezone: any;
  lat: any;
  lon: any;
  res: any;
  region: any;
  state: any;
  cit: any ;
  street: any;
  public weatherTodayString: any;
  public hourlyString: any;
  temperatureTwitter: any;
  summaryTwitter: any;
  public twitterMessage: any;
  gLat: any;
  gLong: any;
  public noData = false;
  public favs = false;
  public noAddress = false;
  public resIsCurrently = false;
  public resList: any[] = [];
  public favLoaded: any[];
  public favoriteIcon = 'star_border';
  public model: any;
  public city1: any;
  cities;
  public myVariableColor = 'black';
  curlocation: any;
  weatherToday: any;
  imglink: any;
  public ipAddCity: any;
  public ipAddLat: any;
  public favColor = '#818181';
  public favColorBg = 'white';
  public resultColor = 'white';
  public resultColorBg = '#6593AD';
  public ipAddLon: any;
  public counter = 0;
  public tempArr: Array<number> = [];
  public pressureArr: Array<number> = [];
  public windArr: Array<number> = [];
  public visibilityArr: Array<number> = [];
  public humidityArr: Array<number> = [];
  public ozoneArr: Array<number> = [];
  public daily: any;
  public dates: any = [];
  public lowTempArr: any = [];
  public highTempArr: any = [];
  public timestamps: any = [];
  constructor(private httpClient: HttpClient, private router: Router, config: NgbTabsetConfig) {
    // config.justify = 'end';
  }
  public progressEdit = false;
  @ViewChild('ts', {static: false}) ts;

  // this.city1.valueChanges.distinctUntilChanged().map(v => v ? this.getAuto(v) : []);

  ngOnInit(): void {
    this.getLatLong();
    // tslint:disable-next-line:indent
	   // this.cities = this.city1.valueChanges.distinctUntilChanged().map(v => v ? this.getAuto(v) : []);
    // this.city1 = new FormControl();
    // this.search = (text$: Observable<string[]>) => text$.pipe(debounceTime(200),
      // distinctUntilChanged(), map(term => term ? this.getAuto(term) : []));
    // tslint:disable-next-line:max-line-length

  }
  public beforeChange($event: NgbTabChangeEvent) {
    if (($event.nextId === 'tab-pc2') || ($event.nextId === 'tab-pc1') ||
      ($event.activeId === 'tab-pc2') || ($event.activeId === 'tab-pc1')) {
      if ($event.nextId === 'tab-pc1') {
        // console.log('TAB CHANGE');
        this.onTwitter();
      }
      $event.preventDefault();
    } else if ($event.nextId === 'resultsTab') {
      this.getCurrent();
    } else if ($event.nextId === 'hourTab') {
      this.getHourly();
    } else if ($event.nextId === 'week') {
      this.getWeekly();
    } else if ($event.nextId === 'tab-pc1') {
      // console.log('twitter share');
      this.onTwitter();
    }
  }
  onTwitter() {
    // console.log('twitter share');
    // this.twitterMessage = 'https://twitter.com/intent/tweet?text=The current temperature at ' + this.cit +
    //  ' is ' + this.temperatureTwitter + '. The weather conditions are ' + this.summaryTwitter + '. CSCI571WeatherSearch';
    // console.log(this.twitterMessage);
    window.open(this.twitterMessage, '_blank');
  }

  search = (text$: Observable<string>) => text$.pipe(debounceTime(200),
    distinctUntilChanged(), map(term => term.length < 1 ? [] :
      this.getAuto(term).filter(v => v.toLowerCase()).splice(0, 10)))

  getLatLong() {
    // this.http.get<any>('https://ipapi.co/json/').subscribe(response => {this.latLong = response.data; });
    this.httpClient.get<any>('https://ipapi.co/json/').subscribe(data => {// console.log(data);
                                                                          this.ipAddLat = data.latitude;
                                                                          this.ipAddLon = data.longitude;
                                                                          this.region = data.region_code;
                                                                          this.ipAddCity = data.city;
                                                                          // console.log('lat:' + this.lat);
                                                                          // console.log('lon:' + this.lon);
                                                                          /* console.log('region:' + this.region);*/ });
  }

  getAuto(term: string) {
    // term = 'Los';
    // this.httpClient.get<any>('/autocomplete?term=' + term).subscribe(responseData => {console.log(responseData);
      //                                                                                this.res = this.getList(responseData.predictions);
    // });
    // console.log('here: ' + this.res);
    this.cities = this.httpClient.get<any>('/autocomplete?term=' + term).
    subscribe(responseData => {/*console.log(responseData);*/ this.resList = this.getList(responseData.predictions); });

    this.resList = this.resList.filter(v => v.toLowerCase().indexOf(v.toLowerCase()) === 0);
    return  this.resList;
    // this.resList.filter(v => v.toLowerCase().startsWith(term.toLocaleLowerCase())).splice(0, 10); ))
    // return [];
  }

  getList(prediction: any) {
    /*console.log('predictions:' + prediction);*/
    let len = prediction.length;
    const resList2: any [] = [];
    if (len > 5) {
      len = 5;
    }
   // let res: any[] = [] ;
    for (let i = 0; i < len; i++) {
      resList2.push((prediction[i]).structured_formatting.main_text);
    }
    /*console.log('resList:' + resList2);*/
    return resList2;
  }

  onSubmit(wForm: NgForm) {

    this.submitted = true;
    /*console.log('form submitted');
    console.log(wForm.value);
    console.log(typeof(wForm.value));*/
    this.favColor = '#818181';
    this.favColorBg = 'white';
    this.resultColor = 'white';
    this.resultColorBg = '#6593AD';

    if (wForm.value.curlocation !== true) {
      // console.log('its not checked');
      this.street = wForm.value.street;
      this.street = (this.street.split(' ')).join('+');
      // console.log(this.street);
      this.state = wForm.value.state;
      this.cit = wForm.value.city;
      // console.log(this.cit);
      const cit2 = (this.cit.split(' ')).join('+');
      // console.log(this.cit);
      const address: string = this.street + ',' + cit2 + ',' + this.state;
      // console.log('address: ' + address);
      this.httpClient.get<any>('/getCoord?address=' + address).subscribe(responseData => {
        if (responseData !== undefined) {
        if (responseData.status === 'ZERO_RESULTS') {
          // console.log('error log here now:');
          this.noAddress = true;
          this.noAddress = true; this.noData = false; this.resIsCurrently = false;
          this.favs = false; this.router.navigate(['']); return;
        }
        this.lat = responseData.results[0].geometry.location.lat;
        this.lon = responseData.results[0].geometry.location.lng;
        this.darkSkyApiCall(); /*this.noData = false; this.noAddress = false; this.progressEdit = true;*/}
      }, err => { console.log('in the error log!'); this.noAddress = true; this.noData = false; this.resIsCurrently = false;
                  this.favs = false; return; });
    } else {
      this.state = this.region;
      this.cit = this.ipAddCity;
      this.lat = this.ipAddLat;
      this.lon = this.ipAddLon;
      this.darkSkyApiCall();
    }
  }
  searchFav(c: any, st: any) {
    // console.log('searchingFav!');
    // this.lat = la;
    // this.lon = ln;
    this.cit = c;
    this.state = st;
    const cit2 = (this.cit.split(' ')).join('+');
    // console.log('search: ' + this.cit + ',' + this.state);
    const address = cit2 + ',' + this.state;
    // console.log('address from fav search:' + address);
    this.httpClient.get<any>('/getCoord?address=' + address).subscribe(responseData => {if (responseData.status === 'ZERO_RESULTS') {
          // console.log('HERE:');
          this.noAddress = true;
          return;
        } else {
        this.lat = responseData.results[0].geometry.location.lat;
        this.lon = responseData.results[0].geometry.location.lng;
        this.darkSkyApiCall(); }
    }, err => {console.log('ERROR INPUT'); });
  }
  darkSkyApiCall() {
      this.progressEdit = true;
      this.noAddress = false;
      this.noData = false;
      this.favs = false;
      const latLn = this.lat + ',' + this.lon;
      this.httpClient.get<any>('/getWeather?latLong=' + latLn).subscribe(responseData => {
                                                                                          this.imageCall();
                                                                                          this.weatherToday = responseData;
                                                                                          this.temperatureTwitter =
                                                                                            this.weatherToday.currently.temperature;
                                                                                          this.summaryTwitter =
                                                                                            this.weatherToday.currently.summary;
                                                                                           });
      return;
  }

  imageCall() {
    this.httpClient.get<any>('/getCustom?qq=' + this.state).
    subscribe(responseData => {
                               this.imglink = responseData.items[0].link;
                               this.callRouter(); });
  }

  callRouter() {
    this.progressEdit = false;
    if (localStorage.getItem(this.cit + this.state) == null) {
      this.favoriteIcon = 'star_border';
      this.myVariableColor = 'black';
    } else {
      this.favoriteIcon = 'star';
      this.myVariableColor = '#FED72A';
    }
    this.resIsCurrently = true;

    this.weatherTodayString = JSON.stringify(this.weatherToday.currently);
    this.processArr();
    this.checkDaily();
    this.timezone = this.weatherToday.timezone;
    this.twitterMessage = 'https://twitter.com/intent/tweet?text=The current temperature at ' + this.cit +
      ' is ' + Math.round(this.temperatureTwitter) + '°F. The weather conditions are ' + this.summaryTwitter +
      '.&hashtags=CSCI571WeatherSearch';
    // console.log(this.imglink);
    // const navigationExtras: NavigationExtras = {state: {example: 'This is an example'}};
    // this.ts.select('resultsTab');
    this.router.navigate(['results'], {queryParams: {tz: this.timezone,
        city: this.cit, temperature: this.temperatureTwitter,
        curr: this.weatherTodayString, summ : this.summaryTwitter, imglink: this.imglink}});
    this.ngAfterViewInit();
  }
  ngAfterViewInit() {
    // console.log('VIEW INITIALIZED');
    this.changeTab('resultsTab');
  }
  changeTab(id: string) {
    this.ts.select(id);
  }
  processArr() {
    const dat = this.weatherToday.hourly.data;
    this.tempArr = []; this.windArr = []; this.pressureArr = []; this.ozoneArr = [];
    this.humidityArr = []; this.visibilityArr = [];
    for (let i = 0; i < 24; i++) {
      this.tempArr.push(this.weatherToday.hourly.data[i].temperature);
      this.windArr.push(this.weatherToday.hourly.data[i].windSpeed);
      this.pressureArr.push(this.weatherToday.hourly.data[i].pressure);
      this.ozoneArr.push(this.weatherToday.hourly.data[i].ozone);
      this.humidityArr.push(this.weatherToday.hourly.data[i].humidity);
      this.visibilityArr.push(this.weatherToday.hourly.data[i].visibility);

    }
    // console.log('after processing: ' + this.tempArr);
    return;
  }
  checkDaily() {
    const dat = this.weatherToday.daily.data;
    const datePipe = new DatePipe('en-US');
    // console.log('data length:' + dat.length);
    // console.log('DATES:' + this.dates);
    this.lowTempArr = []; this.highTempArr = []; this.timestamps = [];
    for (let i = 0; i < dat.length; i++) {
      const timestamp = dat[i].time;
      const formatted = datePipe.transform(timestamp * 1000, 'dd/MM/yyyy');
      this.timestamps.push(timestamp);
      // console.log('FORMATTED: ' + formatted);
      // console.log(typeof(formatted));
      this.dates.push(formatted);
      const lowTemp = Math.round(parseFloat(dat[i].temperatureLow));
      const highTemp = Math.round(parseFloat(dat[i].temperatureHigh));
      // const tem = [lowTemp, highTemp];
      this.lowTempArr.push(lowTemp);
      this.highTempArr.push(highTemp);
    }
    return;
  }

  checkStorage() {
    // console.log(localStorage);
    // console.log(localStorage.length);
    this.favColorBg = '#6593AD';
    this.favColor = 'white';
    this.resultColorBg = 'white';
    this.resultColor = '#818181';
    this.resIsCurrently = false;
    this.noAddress = false;
    if (localStorage.length === 0) {
      this.noData = true;
      this.router.navigate(['']);
      // this.router.navigate('');
    } else {
      // console.log('there is data');
      this.favLoaded = [];
      // let objArray: any[];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const val = JSON.parse(localStorage.getItem(key));
        const obj: any = {};
        obj.imglink = val.imglink;
        obj.timestamp = val.timestamp;
        // console.log('GOT LINK:' + val.imglink);
        obj.cit = val.cit;
        obj.state = val.state;
        this.favLoaded.push(obj);
      }
      this.favLoaded.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1 );
      // console.log('FAVS: ' + this.favLoaded);
      this.favs = true;
      this.router.navigate(['']);
    }
  }

  clearAll() {
    this.favColor = '#818181';
    this.favColorBg = 'white';
    this.resultColor = 'white';
    this.resultColorBg = '#6593AD';
    this.weatherForm.reset();
    this.noData = false;
    this.noAddress = false;
    this.resIsCurrently = false;
    this.favs = false;
    this.router.navigate(['']);
    return true;
  }
  deleteFav(id: any) {
    this.favs = false;
    localStorage.removeItem(id);
    if (localStorage.length === 0) {
      this.noData = true;
      // this.favs = true;
      this.router.navigate(['']);
    } else {
      console.log('there is data 2');
      this.favLoaded = [];
      // let objArray: any[];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const val = JSON.parse(localStorage.getItem(key));
        const obj: any = {};
        obj.imglink = val.imglink;
        obj.timestamp = val.timestamp;
        console.log('GOT LINK:' + val.imglink);
        obj.cit = val.cit;
        obj.state = val.state;
        this.favLoaded.push(obj);
      }
      this.favs = true;
      this.router.navigate(['']);
    }
    // this.checkStorage();
    return;
  }
  addFav() {
    // console.log(this.favoriteIcon);
    if (this.favoriteIcon === 'star_border') {
      this.favoriteIcon = 'star';
      this.myVariableColor = '#FED72A';
      this.counter += 1;
      const obj: any = {};
      const d = new Date();
      obj.timestamp = d.getTime();
      obj.imglink = this.imglink;
      // console.log('imglink:' + obj.imglink);
      obj.cit = this.cit;
      // console.log('obj:' + this.cit);
      obj.state = this.state;
      obj.lat = this.lat;
      obj.lon = this.lon;
      localStorage.setItem(this.cit + this.state, JSON.stringify(obj));
      // console.log('localStorage: ' + localStorage);
      // console.log('adding to fav');
      // console.log('FAVS now:');
      let len = localStorage.length;
      // console.log('len: ' + len);
      for (let i = 0; i ++; i < len) {
        let key = localStorage.key(i);
        let val = localStorage.getItem(key);
        // console.log('VAL 1:' + val);
      }
    } else {
      this.favoriteIcon = 'star_border';
      this.myVariableColor = 'black';
      this.counter -= 1;
      localStorage.removeItem(this.cit+this.state);
      // console.log('removing from fav');
      // console.log('FAVS now2:');
      let len = localStorage.length;
      // console.log('len2: ' + len);
      for (let i = 0; i ++; i < len) {
        let key = localStorage.key(i);
        let val = localStorage.getItem(key);
        // console.log('VAL 1:' + val);
      }
    }
  }
  getCurrent() {
    // this.router.navigate();
    this.router.navigate(['results'], {queryParams: {tz: this.timezone,
        city: this.cit, temperature: this.temperatureTwitter,
        curr: this.weatherTodayString, summ : this.summaryTwitter, imglink: this.imglink}});
  }
  getHourly() {
    // console.log('before switching:' + this.tempArr);
    this.router.navigate(['hourly'], {queryParams: {tempArr: this.tempArr, windSpeed: this.windArr, humidity: this.humidityArr,
        visibility: this.visibilityArr, ozone: this.ozoneArr, pressure: this.pressureArr }});
  }
  getWeekly() {
    this.router.navigate(['weekly'], {queryParams : {dates: this.dates, lowTemp: this.lowTempArr, highTemp: this.highTempArr,
      lat: this.lat, lng: this.lon, timestamp: this.timestamps, city: this.cit}});
  }
}
