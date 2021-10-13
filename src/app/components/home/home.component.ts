import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { GoogleChartInterface } from 'ng2-google-charts';

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
  globalData: GlobalDataSummary[] | undefined;
  pieChart : GoogleChartInterface = {
    chartType: 'PieChart'
  }
  columnChart : GoogleChartInterface = {
    chartType: 'columnChart'
  }

  constructor(private dataService: DataServiceService) { }

  initChart(caseType : string) {

    let datatable: string[][] | any = [];
    datatable.push(["Province", "Cases"])
    this.globalData?.forEach(cs=>{
      let value : number | any;
      if(caseType == 'c') 
        value = cs.cumulative_cases;
      if(caseType == 'a') 
        value = cs.active_cases;
      if(caseType == 'd') 
        value = cs.cumulative_deaths
      if(caseType == 'r') 
        value = cs.cumulative_recovered
      
      datatable.push([
        cs.province, value
      ])
    })
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: {
        height: 500,
        'Province': 'Cases',
      },
    };
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: {
        height: 500,
        'Province': 'Cases',
      },
    };
  }

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
        this.initChart('c');
      }
    });
  }
  updateChart(input : HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value);
  }
}
