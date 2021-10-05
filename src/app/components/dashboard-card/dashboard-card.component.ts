import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {
  
  @Input('totalConfirmed')
  totalConfirmed!: number;
  @Input('totalDeaths')
  totalDeaths! : number;
  @Input('totalActive')
  totalActive! : number;
  @Input('totalRecovered')
  totalRecovered! : number;

  constructor() { }

  ngOnInit(): void {
  }

}
