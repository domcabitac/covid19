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
  globalData: GlobalDataSummary[] | undefined;

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
      }
    });
  }

}