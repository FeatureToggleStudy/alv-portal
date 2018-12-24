import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../core/auth/user.model';
import { AuthenticationService } from '../core/auth/authentication.service';

@Component({
  selector: 'alv-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser$: Observable<User>;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.currentUser$ = this.authenticationService.getCurrentUser();
  }

}
