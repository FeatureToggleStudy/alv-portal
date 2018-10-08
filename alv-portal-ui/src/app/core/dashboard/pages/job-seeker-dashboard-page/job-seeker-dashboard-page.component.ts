import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../../auth/authentication.service';
import { User } from '../../../auth/user.model';

@Component({
  selector: 'alv-job-seeker-dashboard-page',
  templateUrl: './job-seeker-dashboard-page.component.html',
  styleUrls: ['./job-seeker-dashboard-page.component.scss']
})
export class JobSeekerDashboardPageComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService) { }
  currentUser$: Observable<User>;


  ngOnInit() {

    this.currentUser$  =  this.authenticationService.getCurrentUser();
  }

}
