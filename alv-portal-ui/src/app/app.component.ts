import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './core/authentication/authentication.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'os-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(translate: TranslateService,
              private authenticationService: AuthenticationService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  ngOnInit() {
    this.authenticationService.getCurrentUser(true)
        .subscribe();
  }

}
