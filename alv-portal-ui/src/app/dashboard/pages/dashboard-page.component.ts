import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../core/auth/user.model';
import { AuthenticationService } from '../../core/auth/authentication.service';

@Component({
  selector: 'alv-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  currentUser$: Observable<User>;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.currentUser$ = this.authenticationService.getCurrentUser();
  }

}
