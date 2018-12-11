import { Component, OnInit } from '@angular/core';
import { UserRole } from '../../../core/auth/user.model';


@Component({
  selector: 'alv-company-dashboard-page',
  templateUrl: './company-dashboard-page.component.html',
  styleUrls: ['./company-dashboard-page.component.scss']
})
export class CompanyDashboardPageComponent implements OnInit {

  public userRole = UserRole;

  constructor() { }

  ngOnInit() {
  }

}
