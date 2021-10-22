import { Component, Input, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  data: GlobalDataSummary[] | undefined;
  provinces : string[] = [];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  constructor(private service : DataServiceService) { }

  ngOnInit(): void {
    this.service.getGlobalData().subscribe(result => {
      this.data = result;
      this.data.forEach(cs=> {
        return this.provinces.push((<any>cs).province);
      })
    })
  }
  updateValues(country : string){
    // console.log(country);
    this.data?.forEach(cs=>{
      if(cs.province == country){
        this.totalActive=(<any>cs).active_cases
        this.totalConfirmed=(<any>cs).cumulative_cases 	
        this.totalDeaths=(<any>cs).cumulative_deaths 	
        this.totalRecovered=(<any>cs).cumulative_recovered
      }
    })
  }
}
