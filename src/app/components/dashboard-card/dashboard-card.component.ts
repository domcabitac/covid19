import { Component, Input, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { ChartDataSets, ChartOptions} from "chart.js";
import { TimelineSummary } from 'src/app/models/timeline-data';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {
  is_active = "";
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
          break;
        case 'a':
          this.doughnutChartData.push(cs.active_cases!);
          this.barChartData[0].data.push(cs.active_cases!);
          this.barChartData[0].label = 'Active cases: ';
          (<any>this).lineChartData[0].data.push(cs.active_cases);
          break;
        case 'r':
          this.doughnutChartData.push(cs.cumulative_recovered!);
          this.barChartData[0].data.push(cs.cumulative_recovered!);
          this.barChartData[0].label = 'Recovered cases: ';
          (<any>this).lineChartData[0].data.push(cs.cumulative_recovered);
          break;
        case 'd':
          this.doughnutChartData.push(cs.cumulative_deaths!);
          this.barChartData[0].data.push(cs.cumulative_deaths!);
          this.barChartData[0].label = 'Deaths: ';
          (<any>this).lineChartData[0].data.push(cs.cumulative_deaths);
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
  toggleNav(){
    if(this.is_active){
      this.is_active = "";
    }
    else{
      this.is_active = "is-active";
    }
  }  
}
