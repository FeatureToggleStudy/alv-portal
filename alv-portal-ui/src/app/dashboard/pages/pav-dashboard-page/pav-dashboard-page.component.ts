import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { User } from '../../../core/auth/user.model';

@Component({
  selector: 'alv-pav-dashboard-page',
  templateUrl: './pav-dashboard-page.component.html',
  styleUrls: ['./pav-dashboard-page.component.scss']
})
export class PavDashboardPageComponent implements OnInit {

  currentUser$: Observable<User>;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.currentUser$  =  this.authenticationService.getCurrentUser();
  }

}
