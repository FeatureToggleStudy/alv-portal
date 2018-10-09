import { Component, HostBinding, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

const PATH_TO_PICTURE = {
  '/home/job-seeker': 'jobseeker-home',
  '/home/company': 'company-home',
  '/home/pav': 'pav-home'
};
@Component({
  selector: 'alv-navigation-container',
  templateUrl: './navigation-container.component.html',
  styleUrls: ['./navigation-container.component.scss']
})
export class NavigationContainerComponent implements OnInit {

  @HostBinding('class') readonly class = 'd-block d-md-flex';
  public currentMainStyle: string;

  constructor(private router: Router) { }

  ngOnInit() {
    // the component is watching for the changes of the router path and applies respective
    // style to the main component. This is done for switching background images
    this.router.events
        .subscribe((event) => {
          if (event instanceof NavigationEnd) {
            this.currentMainStyle = PATH_TO_PICTURE[event.urlAfterRedirects];
          }
        });
  }

}
