import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  dashboard: any = {};

  constructor(
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {

    this.dashboardService.getData()
      .subscribe((res:any) => {

        this.dashboard = res;

      });

  }

}