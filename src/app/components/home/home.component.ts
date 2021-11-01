import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  yesterday = this.getYesterdaysDate();
  
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData!: GlobalDataSummary[];

  constructor(private dataService: DataServiceService) {
   }

  ngOnInit(): void {
  }
  getYesterdaysDate() {
    var date = new Date();
    date.setDate(date.getDate()-1);
    return date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
}

}
