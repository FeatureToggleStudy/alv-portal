import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../auth/user.model';

@Component({
  selector: 'alv-pav-dashboard-page',
  templateUrl: './pav-dashboard-page.component.html',
  styleUrls: ['./pav-dashboard-page.component.scss']
})
export class PavDashboardPageComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService,
              private fb: FormBuilder) { }
  currentUser$: Observable<User>;
  findCandidateForm: FormGroup;

  ngOnInit() {
    this.findCandidateForm = this.fb.group({
      profession: this.fb.control('Designer'),
      skills: this.fb.control(''),
      city: this.fb.control('Zurich')
    });
    this.currentUser$  =  this.authenticationService.getCurrentUser();
  }

}
