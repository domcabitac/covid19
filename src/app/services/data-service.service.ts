import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private globalDataURL =  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/09-28-2021.csv';
  constructor(private http : HttpClient) { }

  getGlobalData() {
    return this.http.get(this.globalDataURL, { responseType : 'text'}).pipe(
      map(result=> {

        let rows = result.split('\n');
        rows.forEach(row=> {
          let col = row.split(/,(?=\S)/);
          console.log(col);
        })

        return [];
      })
    )
  }
}
