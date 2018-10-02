import { Component, Input, OnInit } from '@angular/core';
import { RegistrationStatus, User } from '../authentication/user.model';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'alv-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  @Input() user: User;

  @Input() noEiam: boolean;

  hasCompletedRegistration: boolean;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.hasCompletedRegistration = this.user.registrationStatus === RegistrationStatus.REGISTERED;
  }

  logout() {
    this.authenticationService.logout();
    if (!this.noEiam) {
      document.location.href = '/api/redirect/logout';
    } else {
      this.router.navigate(['']);
    }
  }

  goToEiamProfile() {
    document.location.href = 'api/redirect/profile';
  }

  completeRegistration() {
    /*
    switch (this.user.registrationStatus) {
      case RegistrationStatus.REGISTERED:
        // TODO: to be adapted to the real URLs
        this.router.navigate(['/registration/initial']);
        break;
      case RegistrationStatus.VALIDATION_EMP:
      case RegistrationStatus.VALIDATION_PAV:
        // TODO: to be adapted to the real URLs
        this.router.navigate(['/registration/access-code']);
        break;
    }
    */
  }
}
