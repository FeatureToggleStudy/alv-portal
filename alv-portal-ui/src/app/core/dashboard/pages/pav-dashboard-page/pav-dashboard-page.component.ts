import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../auth/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../../auth/user.model';

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
