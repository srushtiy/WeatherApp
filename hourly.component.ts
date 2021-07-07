import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';


@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.css']
})
export class HourlyComponent implements OnInit {
  public hourlyStringDat: any;
  public hourlyJSON: any;
  public barChartType = 'bar';
  public choices = ['Temperature', 'Pressure', 'Humidity', 'Ozone', 'Visibility', 'Wind Speed'];
  public barChartData: ChartDataSets[];
  public chartLegend = true;
  public chartLabels = ['0', '1', '2', '3', '4', '5' , '6', '7', '8', '9', '10', '11', '12', '13', '14',
    '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  public chartOptions: any;
  public myColors: any = [{backgroundColor: 'rgba(154,209,240)'
      }];
  choicesForm: FormGroup;
  allData: any;
  temperatureArr: any;
  pressureArr: any;
  humidityArr: any;
  ozoneArr: any;
  visibilityArr: any;
  windSpeedArr: any;
  maxTemp: any;
  maxPressure: any;
  maxOzone: any;
  maxSpeed: any;
  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.choicesForm = this.fb.group({ choicesControl: ['Temperature']});
    this.route.queryParams.subscribe(params => {this.temperatureArr = params.tempArr;
                                                // console.log('from hourly subscribe:' + this.temperatureArr);
                                                this.pressureArr = params.pressure;
                                                this.humidityArr = params.humidity;
                                                // this.humidityArr.map(x => x * 100);
                                                for (let i = 0; i < this.humidityArr.length; i++) {
                                                      this.humidityArr[i] *= 100;
                                                }
                                                this.ozoneArr = params.ozone;
                                                this.windSpeedArr = params.windSpeed;
                                                this.visibilityArr = params.visibility;
                                                // this.maxTemp = Math.max(this.temperatureArr) + 1;
                                                // this.maxPressure = Math.max(this.pressureArr) + 2;
                                                // this.maxOzone = Math.max(this.ozoneArr) + 4;
                                                // this.maxSpeed = Math.max(this.maxSpeed) + 2;
                                                // console.log('max temp: ' + this.maxTemp);
                                                // console.log('max pressure: ' + this.maxPressure);
                                                // console.log('string is: ' + params.str);
    });
    this.barChartData = [{data: this.temperatureArr, label: 'temperature' }];
    this.chartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
        yAxes: [{
          /*ticks: {
            max: this.maxTemp
          },*/
          scaleLabel: {
            display: true,
            labelString: 'Fahrenheit'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Time difference from current hour'
          }
        }]
      }
    };
  }
  onChange(cc) {
    // console.log('CC: ' + cc);
    if (cc === 'Humidity') {
      // console.log('humidity vals will be printed');
      this.barChartData = [{data: this.humidityArr, label: 'humidity' }];
      this.chartOptions = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
          yAxes: [{
            /*ticks: {
              max: 105
            },*/
            scaleLabel: {
              display: true,
              labelString: '% Humidity'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Time difference from current hour'
            }
          }]
        }
      };
    } else if (cc === 'Temperature') {
      // console.log('Temp vals will be printed');
      this.barChartData = [{data: this.temperatureArr, label: 'temperature' }];
      this.chartOptions = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
          yAxes: [{
            /*ticks: {
              max: this.maxTemp
            },*/
            scaleLabel: {
              display: true,
              labelString: 'Fahrenheit'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Time difference from current hour'
            }
          }]
        }
      };
    } else if (cc === 'Pressure') {
      // console.log('Pressure values will be printed');
      this.barChartData = [{data: this.pressureArr, label: 'pressure' }];
      this.chartOptions = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
          yAxes: [{
            /*ticks : {
              max: this.maxPressure
            },*/
            scaleLabel: {
              display: true,
              labelString: 'Milibars'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Time difference from current hour'
            }
          }]
        }
      };
    } else if (cc === 'Wind Speed') {
      // console.log('wind speed vals');
      this.barChartData = [{data: this.windSpeedArr, label: 'wind speed' }];
      this.chartOptions = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
          yAxes: [{
            /*ticks: {
              max: this.maxSpeed
            },*/
            scaleLabel: {
              display: true,
              labelString: 'Miles per Hour'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Time difference from current hour'
            }
          }]
        }
      };
    } else if (cc === 'Visibility') {
      this.barChartData = [{data: this.visibilityArr, label: 'visibility' }];
      this.chartOptions = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              max: 12
            },
            scaleLabel: {
              display: true,
              labelString: 'Miles (Maximum 10)'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Time difference from current hour'
            }
          }]
        }
      };
    } else if (cc === 'Ozone') {
      // console.log('OZONE');
      this.barChartData = [{data: this.ozoneArr, label: 'ozone' }];
      this.chartOptions = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
          yAxes: [{
            /*ticks: {
              max: this.maxOzone
            },*/
            scaleLabel: {
              display: true,
              labelString: 'Dobson Units'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Time difference from current hour'
            }
          }]
        }
      };
    }
    return;
  }

}
