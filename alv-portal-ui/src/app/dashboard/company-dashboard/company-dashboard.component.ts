import { Component, OnInit } from '@angular/core';
import { UserRole } from '../../core/auth/user.model';

@Component({
  selector: 'alv-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {

  public userRole = UserRole;

  constructor() {
  }

  ngOnInit() {
  }

}
