import { Component, Input, OnInit } from '@angular/core';
import { User } from '../authentication/user.model';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'os-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {

  @Input() user: User;

  @Input() noEiam: boolean;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  logout() {
    this.authenticationService.logout();
    if (!this.noEiam) {
      document.location.href = '/api/redirect/logout';
    } else {
      this.router.navigate(['']);
    }
  }
}
