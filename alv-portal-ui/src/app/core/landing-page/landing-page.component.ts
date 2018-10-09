import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../shared/components/abstract-subscriber';
import { LandingNavigationService } from '../landing-navigation.service';
import { AuthenticationService } from '../auth/authentication.service';

/**
 * the sole purpose of this component is to route the user to the respective landing page
 */
@Component({
  selector: 'alv-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent extends AbstractSubscriber implements OnInit {

  constructor(private landingNavigationService: LandingNavigationService,
              private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit() {
    this.authenticationService.getCurrentUser()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(user => this.landingNavigationService.navigateUser(user));
  }

}
