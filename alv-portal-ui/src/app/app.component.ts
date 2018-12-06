import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './core/auth/authentication.service';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { I18nService } from './core/i18n.service';

@Component({
  selector: 'alv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  a11yMessage: string;

  constructor(private i18nService: I18nService,
              private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService) {

  }

  ngOnInit() {

    this.i18nService.init();

    this.authenticationService.init();

    // Based on the idea: https://toddmotto.com/dynamic-page-titles-angular-2-router-events
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
      mergeMap((route) => route.data)
    )
      .subscribe((data: { titleKey: string, collapsed?: boolean }) => {
        if (data.titleKey) {
          // TODO i18n
          this.a11yMessage = data.titleKey;
          this.titleService.setTitle(data.titleKey);
        }
      });
  }

}
