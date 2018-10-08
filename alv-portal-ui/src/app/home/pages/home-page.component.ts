import { Component, OnInit } from '@angular/core';

/**
 * The home page component is a default component for the user that comes to the portal
 * it provides the ability to quickly start the work with the portal.
 */
@Component({
  selector: 'alv-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // the component automatically activates one of the child routes
  }

}
