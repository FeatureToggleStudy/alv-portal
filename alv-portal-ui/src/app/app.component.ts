import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './core/auth/authentication.service';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'alv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  a11yMessage: string;

  constructor(translate: TranslateService,
              private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  /**
   this.router.events
   .filter((event) => event instanceof NavigationEnd)
   .map(() => this.activatedRoute)
   .map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
   .filter((route) => route.outlet === 'primary')
   .mergeMap((route) => route.data)
   .subscribe((event) => this.titleService.setTitle(event['title']));
   */

  ngOnInit() {
    this.authenticationService.getCurrentUser(true)
        .subscribe();
    this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data),
        map((event) => event['titleKey']))
        .subscribe((titleKey: string) => {
          if (titleKey) {
            // TODO i18n
            this.a11yMessage = titleKey;
            this.titleService.setTitle(titleKey);
          }
        });
  }

}
