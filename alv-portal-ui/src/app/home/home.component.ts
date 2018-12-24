import { Component, OnInit } from '@angular/core';

/**
 * The home page component is a default component for the user that comes to the portal
 * it provides the ability to quickly start the work with the portal.
 */
@Component({
  selector: 'alv-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    // the component automatically activates one of the child routes
  }

}
