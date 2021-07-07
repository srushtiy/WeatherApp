import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WeatherDetailComponent} from './weather-detail/weather-detail.component';
import {AppComponent} from './app.component';
import {HourlyComponent} from './hourly/hourly.component';
import {WeeklyComponent} from "./weekly/weekly.component";


const routes: Routes = [{path: 'results', component: WeatherDetailComponent},
  {path: 'hourly', component: HourlyComponent},
  {path: 'weekly', component: WeeklyComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
