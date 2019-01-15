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

  toolbarButtons: ToolbarButton[] = [
    {
      label: 'home.toolbar.jobSeekers',
      icon: 'binoculars',
      route: 'job-seeker'
    },
    {
      label: 'home.toolbar.companies',
      icon: 'building',
      route: 'company'
    },
    {
      label: 'home.toolbar.recruitmentAgencies',
      icon: 'eye',
      route: 'pav'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}

interface ToolbarButton {
  label: string;
  icon: string;
  route: string;
}
