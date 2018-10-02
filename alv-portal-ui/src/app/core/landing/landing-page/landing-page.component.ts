import { Component, OnInit } from '@angular/core';
import { LandingNavigationService } from '../../landing-navigation.service';

/**
 * the sole purpose of this component is to route the user to the respective landing page
 */
@Component({
  selector: 'alv-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private landingNavigationService: LandingNavigationService) { }

  ngOnInit() {
    this.landingNavigationService.navigate();
  }

}
