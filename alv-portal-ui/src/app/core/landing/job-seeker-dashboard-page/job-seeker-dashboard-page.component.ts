import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Observable } from 'rxjs';
import { User } from '../../authentication/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'alv-job-seeker-dashboard-page',
  templateUrl: './job-seeker-dashboard-page.component.html',
  styleUrls: ['./job-seeker-dashboard-page.component.scss']
})
export class JobSeekerDashboardPageComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService,
              private fb: FormBuilder) { }
  currentUser$: Observable<User>;
  findWorkerForm: FormGroup;

  ngOnInit() {
    this.findWorkerForm = this.fb.group({
      profession: this.fb.control('Designer'),
      city: this.fb.control('Zurich')
    });
    this.currentUser$  =  this.authenticationService.getCurrentUser();
  }

}
