import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../core/auth/user.model';
import { AuthenticationService } from '../core/auth/authentication.service';
import { CompanyContactTemplateModel } from '../core/auth/company-contact-template-model';

@Component({
  selector: 'alv-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser$: Observable<User>;

  currentCompany$: Observable<CompanyContactTemplateModel>;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.currentUser$ = this.authenticationService.getCurrentUser();
    this.currentCompany$ = this.authenticationService.getCurrentCompany();
  }

}
