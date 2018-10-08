import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../auth/authentication.service';
import { Observable } from 'rxjs';
import { User } from '../../../auth/user.model';

@Component({
  selector: 'alv-company-dashboard-page',
  templateUrl: './company-dashboard-page.component.html',
  styleUrls: ['./company-dashboard-page.component.scss']
})
export class CompanyDashboardPageComponent implements OnInit {

  currentUser$: Observable<User>;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {

    this.currentUser$  =  this.authenticationService.getCurrentUser();
  }

}
