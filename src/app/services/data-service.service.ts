import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { GlobalDataSummary } from '../models/global-data';

var dateObj = new Date();
var month = String(dateObj.getMonth() + 1).padStart(2, '0');
var day = String(dateObj.getDate() - 1).padStart(2, '0');
var year = dateObj.getFullYear();

@Injectable({
  providedIn: 'root'
})

export class DataServiceService {

  // private globalDataURL =  `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${month}-${day}-${year}.csv`;
  private globalDataURL =  'https://raw.githubusercontent.com/ccodwg/Covid19Canada/master/timeseries_prov/active_timeseries_prov.csv';

  constructor(private http : HttpClient) { }

  getGlobalData() {
    return this.http.get(this.globalDataURL, { responseType : 'text'}).pipe(
      map(result=> {
        let data: GlobalDataSummary[] = [];
        let raw = {}
        let rows = result.split('\n');
        rows.splice(0,1);
        rows.forEach(row=> {
          let col = row.split(/,(?=\S)/);

          let cs = {
            province : col[0],
            cumulative_cases: +col[2],
            cumulative_deaths: +col[4],
            cumulative_recovered: +col[3],
            active_cases: +col[5],
            date_active: +col[1]
          };
          let temp : GlobalDataSummary = (<any>raw)[cs.province];
          if(temp) {
            temp.active_cases = cs.active_cases;
            temp.cumulative_cases 	 = cs.cumulative_cases;
            temp.cumulative_deaths 	 = cs.cumulative_deaths;
            temp.cumulative_recovered = cs.cumulative_recovered;

            (<any>raw)[cs.province] = temp;
          } else {
            (<any>raw)[cs.province] = cs;
          }
        })
        return <GlobalDataSummary[]>Object.values(raw);
      })
    )
  }
}
