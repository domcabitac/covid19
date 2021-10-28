import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { GlobalDataSummary } from '../models/global-data';
import { TimelineSummary } from '../models/timeline-data';

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
  private timelineDataURL = 'https://raw.githubusercontent.com/ccodwg/Covid19Canada/master/timeseries_canada/active_timeseries_canada.csv';

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
            temp.cumulative_cases = cs.cumulative_cases;
            temp.cumulative_deaths = cs.cumulative_deaths;
            temp.cumulative_recovered = cs.cumulative_recovered;
            (<any>raw)[cs.province] = temp;
          } else {
            (<any>raw)[cs.province] = cs;
          }
          data.push(
            {
              province : col[0],
              cumulative_cases: +col[2],
              cumulative_deaths: +col[4],
              cumulative_recovered: +col[3],
              active_cases: +col[5],
              date_active: col[1]
            }
          );
        })
        return <GlobalDataSummary[]>Object.values(raw);
      })
    )
  }
  getTimelineData() {
    return this.http.get(this.timelineDataURL, {responseType: 'text'}).pipe(
      map(result=> {
        let data: TimelineSummary[] = [];
        let raw = {}
        let rows = result.split('\n');
        rows.splice(0,1);
        rows.forEach(row=> {
          let col = row.split(/,(?=\S)/);
          col.splice(0,1);
          let cs = {
            date_active: col[0],
            cumulative_cases: +col[1],
            cumulative_recovered: +col[2],
            cumulative_deaths: +col[3],
            active_cases: +col[4],
            active_cases_change: +col[5]
          };
          let temp : TimelineSummary = (<any>raw)[cs.date_active];
          if(temp) {
            temp.active_cases = cs.active_cases;
            temp.cumulative_cases = cs.cumulative_cases;
            temp.cumulative_deaths = cs.cumulative_deaths;
            temp.cumulative_recovered = cs.cumulative_recovered;
            (<any>raw)[cs.date_active] = temp;
            temp.active_cases_change = cs.active_cases_change;
          } else {
            (<any>raw)[cs.date_active] = cs;
          }
        })
        return <TimelineSummary[]>Object.values(raw);
      })
    )
  }
  // getCityWiseData() {
  //   return this.http.get(this.cityDataURL, { responseType : 'text'}).pipe(
  //     map(result=> {
  //       let mainData = {};
  //       let data: ProvinceDataSummary[] = [];
  //       let rows = result.split('\n');
  //       let header = rows[0];
  //       let dates = header.split(/,(?=\S)/)
  //       let raw = {};
  //       //remove 0th index as it contains column names
  //       rows.splice(0, 1);
  //       rows.forEach(row => {
  //         let rows = row.split('\n');
  //         let cols = row.split(/,(?=\S)/);
  //         rows.forEach(row => {
  //           let prov = cols[0];
  //           let city = cols[1];
  //           let date = cols[2];
  //           let cases = cols[3];
  //           console.log(row);
            
  //           // console.log(cols);
            
  //           cols.splice(0 , 1);
  //           mainData[prov] = [];
  //           cols.forEach(()=>{
  //             cols.splice(0 , 2);
  //             let dw : ProvinceDataSummary = {
  //               cases: +cases,
  //               province: prov,
  //               health_region: city,
  //               date_report: new Date(Date.parse(date[date])) 
  //             }
  //             mainData[prov].push(dw)
  //         })

  //         })
          
  //       })
  //       return mainData;
  //     }
  //       )
  //     )
  // }
}
