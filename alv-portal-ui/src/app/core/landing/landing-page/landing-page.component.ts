import { Component, OnInit } from '@angular/core';
import { LandingNavigationService } from '../../landing-navigation.service';

@Component({
  selector: 'os-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private landingNavigationService: LandingNavigationService) { }

  ngOnInit() {
    this.landingNavigationService.navigate();
  }

}
