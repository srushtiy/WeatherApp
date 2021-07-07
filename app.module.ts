import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {NgbTypeaheadConfig, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {StorageServiceModule} from 'angular-webstorage-service';
import { HttpClientModule } from '@angular/common/http';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';
import { HourlyComponent } from './hourly/hourly.component';
import { WeeklyComponent } from './weekly/weekly.component';
import {ChartsModule} from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    WeatherDetailComponent,
    HourlyComponent,
    WeeklyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    HttpClientModule,
    ChartsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
