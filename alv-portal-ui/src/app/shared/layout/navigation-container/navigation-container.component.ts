import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

const PATH_TO_PICTURE = {
  '/home/job-seeker': 'jobseeker-home',
  '/home/company': 'company-home',
  '/home/pav': 'pav-home',
  '/registration/finish': 'jobseeker-home',
  '/registration/access-code': 'jobseeker-home'
};
@Component({
  selector: 'alv-navigation-container',
  templateUrl: './navigation-container.component.html',
  styleUrls: ['./navigation-container.component.scss']
})
export class NavigationContainerComponent implements OnInit {

  @HostBinding('class') readonly class = 'd-block d-md-flex d-print-block';

  constructor(private router: Router,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    // the component is watching for the changes of the router path and applies respective
    // style to the body element. This is done for switching background images
    this.router.events
        .subscribe((event) => {
          if (event instanceof NavigationEnd) {
            this.document.body.classList.value =  PATH_TO_PICTURE[event.urlAfterRedirects];
          }
        });
  }

}
