import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData!: GlobalDataSummary[];
  loaded = false;
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
        this.initializeChart('confirmed');
        this.loaded = true;      
      }
    });
  }
  
  initializeChart(caseType: String) {
    this.globalData.forEach(cs=>{
      
    if(caseType == 'confirmed') {
      this.doughnutChartData.push(cs.cumulative_cases!);   
      this.barChartData[0].data.push(cs.cumulative_cases);
      this.barChartData[0].label = 'Confirmed cases: ';   
    }
    

      if (caseType == 'active') {
        this.doughnutChartData.push(cs.active_cases!);
        this.barChartData[0].data.push(cs.active_cases!);
        this.barChartData[0].label = 'Active cases: ';
      }
      if (caseType == 'recovered'){        
        this.doughnutChartData.push(cs.cumulative_recovered!);
        this.barChartData[0].data.push(cs.cumulative_recovered!);
        this.barChartData[0].label = 'Recovered cases: ';
      }
      if (caseType == 'deaths')
{        this.doughnutChartData.push(cs.cumulative_deaths!);
        this.barChartData[0].data.push(cs.cumulative_deaths!);
        this.barChartData[0].label = 'Deaths: ';}

      this.doughnutChartLabels.push(cs.province);
        // if(caseType == 'confirmed') {
        //   this.barChartData[0].data.push(cs.cumulative_cases);
        //   this.barChartData[0].label = 'Confirmed cases: ';
        // }
        // if (caseType == 'active') {
        //   this.barChartData[0].data.push(cs.active_cases!);
        //   this.barChartData[0].label = 'Active cases: ';
        // }
        // if (caseType == 'recovered') {
        //   this.barChartData[0].data.push(cs.cumulative_recovered!);
        //   this.barChartData[0].label = 'Recovered cases: ';
        // }
        // if (caseType == 'deaths') {
        //   this.barChartData[0].data.push(cs.cumulative_deaths!);
        //   this.barChartData[0].label = 'Deaths: ';
        // }
        if((this.barChartLabels.length) <= 14){
          this.barChartLabels.push(cs.province);
        } else {
          this.barChartLabels.pop();
        }

    })
  }

  updateChartType(input: HTMLInputElement) {
    this.doughnutChartData = [];
    this.barChartData[0].data = [];
    this.barChartData[0].label = '';

    this.initializeChart(input.value);
  }
}
