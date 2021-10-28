import { Component, Input, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { ChartDataSets, ChartOptions} from "chart.js";
import { TimelineSummary } from 'src/app/models/timeline-data';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {
  classApplied = false;
  loaded = false;

  public lineChartData: ChartDataSets[] = [
    {data: [], label: 'Cases '}
  ];
  public lineChartLabels = [];

  countryData: TimelineSummary[] = [];

  public lineChartLegend = true;
  public lineChartType = "line";
  globalData!: GlobalDataSummary[];
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  public doughnutChartColors: Color[] = [
    {backgroundColor:["rgb(255, 128, 128)","rgb(255, 179, 128)","rgb(255, 230, 128)","rgb(229, 255, 128)", "rgb(179, 255, 128)", "rgb(128, 255, 128)","rgb(128, 255, 179)","rgb(128, 255, 229)" ,"rgb(128, 229, 255)", "rgb(128, 179, 255)", "rgb(128, 128, 255)", "rgb(178, 128, 255)", "rgb(229, 128, 245)", "rgb(255, 128, 230)", "rgb(255, 128, 179)", "rgb(141, 211, 199)"]},
  ];

  public lineChartColor: Color[] = [{
          backgroundColor: 'rgb(128, 179, 255, 0.2)',
      borderColor: 'rgb(128, 179, 255, 1)',
      pointBackgroundColor: 'rgb(128, 179, 255, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(128, 179, 255, 1)'
  }];

  public doughnutChartLabels: string[] = [];
  public barChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    maintainAspectRatio: false,
    responsive: true
  };
  public barChartData = [
    {data: [] as any, label: 'Confirmed'}
  ];
  @Input('totalConfirmed')
  totalConfirmed!: number;
  @Input('totalDeaths')
  totalDeaths! : number;
  @Input('totalActive')
  totalActive! : number;
  @Input('totalRecovered')
  totalRecovered! : number;

  // updateChart(input : HTMLDivElement) {
  //   console.log(input);
  // }

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next : (result) => {
        console.log(result);
        this.globalData = result;
        result.forEach(cs=>{
          if(!Number.isNaN(cs.cumulative_cases)) {
            this.totalActive+=(<any>cs).active_cases
            this.totalConfirmed+=(<any>cs).cumulative_cases 	
            this.totalDeaths+=(<any>cs).cumulative_deaths 	
            this.totalRecovered+=(<any>cs).cumulative_recovered
          }
        })
        this.updateData('c');
        this.loaded = true;      
      }
    });
    this.dataService.getTimelineData().subscribe((result)=>{
      this.countryData = result;
    });
  }

  updateData(caseType : string) {
    this.globalData.forEach(cs=>{
      switch (caseType) {
        case 'c':
          this.doughnutChartData.push(cs.cumulative_cases!);   
          this.barChartData[0].data.push(cs.cumulative_cases);
          this.barChartData[0].label = 'Confirmed cases: ';
          (<any>this).lineChartData[0].data.push(cs.cumulative_cases);
          (<any>document).getElementById("c").classList.add("flip");         
          (<any>document).getElementById("d").classList.remove("flip");     
          (<any>document).getElementById("r").classList.remove("flip");         
          (<any>document).getElementById("a").classList.remove("flip");             
          break;
          break;
        case 'a':
          this.doughnutChartData.push(cs.active_cases!);
          this.barChartData[0].data.push(cs.active_cases!);
          this.barChartData[0].label = 'Active cases: ';
          (<any>this).lineChartData[0].data.push(cs.active_cases);
          (<any>document).getElementById("a").classList.add("flip");         
          (<any>document).getElementById("d").classList.remove("flip");     
          (<any>document).getElementById("r").classList.remove("flip");         
          (<any>document).getElementById("c").classList.remove("flip");  
          break;
        case 'r':
          this.doughnutChartData.push(cs.cumulative_recovered!);
          this.barChartData[0].data.push(cs.cumulative_recovered!);
          this.barChartData[0].label = 'Recovered cases: ';
          (<any>this).lineChartData[0].data.push(cs.cumulative_recovered);
          (<any>document).getElementById("r").classList.add("flip");         
          (<any>document).getElementById("d").classList.remove("flip");     
          (<any>document).getElementById("c").classList.remove("flip");         
          (<any>document).getElementById("a").classList.remove("flip");  
          break;
        case 'd':
          this.doughnutChartData.push(cs.cumulative_deaths!);
          this.barChartData[0].data.push(cs.cumulative_deaths!);
          this.barChartData[0].label = 'Deaths: ';
          (<any>this).lineChartData[0].data.push(cs.cumulative_deaths);
          (<any>document).getElementById("d").classList.add("flip");         
          (<any>document).getElementById("c").classList.remove("flip");     
          (<any>document).getElementById("r").classList.remove("flip");         
          (<any>document).getElementById("a").classList.remove("flip");  
          break;
        default:
          break;
      }

      this.doughnutChartLabels.push(cs.province);
        if((this.barChartLabels.length) <= 14){
          this.barChartLabels.push(cs.province);
        } else {
          this.barChartLabels.pop();
        }
      },
      this.countryData.forEach(countryData => {
        switch (caseType) {
          case 'c':
            (<any>this).lineChartData[0].data.push(countryData.cumulative_cases);
            break;
          case 'a':
            (<any>this).lineChartData[0].data.push(countryData.active_cases);
            break;
          case 'r':
            (<any>this).lineChartData[0].data.push(countryData.cumulative_recovered);
            break;
          case 'd':
            (<any>this).lineChartData[0].data.push(countryData.cumulative_deaths);
            break;
          default:
            break;
        }
        (<any>this).lineChartLabels.push(countryData.date_active);
      })   
    )
  }

  updateChartType(x: string) {
    this.doughnutChartData = [];
    this.barChartData[0].data = [];
    this.barChartData[0].label = '';
    this.lineChartData[0].data = [];
    this.lineChartLabels = [];

    this.updateData(x);
  }
 convertNumber(x) {
    if (isNaN(x)) return x;

    if (x < 9999) {
      return x;
    }

    if (x < 1000000) {
      return Math.round(x / 1000) + "K";
    }
    if (x < 10000000) {
      return (x / 1000000).toFixed(3) + "M";
    }

    if (x < 1000000000) {
      return (x / 1000000).toFixed(2) + "M";
    }

    if (x < 1000000000000) {
      return Math.round((x / 1000000000)) + "B";
    }

    return "1T+";
  }

}
