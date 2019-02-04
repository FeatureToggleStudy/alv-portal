import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';


interface LegacyUrlRedirection {
  pattern: RegExp;
  urlProvider: (patternResult: RegExpMatchArray) => string;
}

@Injectable({
  providedIn: 'root'
})
/**
 * The guard need to redirect the user from the legacy urls (has-based strategy) to the
 * urls we use
 */
export class LegacyUrlStrategyRedirectionGuard implements CanActivate {

  private legacyUrlRedirections: LegacyUrlRedirection[];

  constructor(private router: Router) {
    this.legacyUrlRedirections = [
      {
        pattern: /^\/job-fingerprint-redirect\?(.*)/,
        urlProvider: regExpMatchArray => {
          return 'job-search/job-fingerprint-redirect?' + decodeURIComponent(regExpMatchArray[1]);
        }
      },
      {
        pattern: /^\/job-publication-detail\/(.*)/,
        urlProvider: regExpMatchArray => {
          return 'manage-job-ads/' + decodeURIComponent(regExpMatchArray[1]);
        }
      }
    ];
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const fragment = state.root.fragment;
    if (!fragment) {
      return this.goHome();
    }
    const redirectionRule = this.legacyUrlRedirections
      .find(rule => {
        return !!fragment.match(rule.pattern);
      });

    if (!redirectionRule) {
      return this.goHome();
    }

    const patternResult = fragment.match(redirectionRule.pattern);
    const newUrl = redirectionRule.urlProvider(patternResult);
    if (!newUrl) {
      return this.goHome();
    } else {
      this.router.navigateByUrl(newUrl);
    }
    return false;
  }

  goHome() {
    this.router.navigate(['home']);
    return false;
  }
}
