import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
/**
 * The guard need to redirect the user from the legacy urls (has-based strategy) to the
 * urls we use
 */
export class LegacyUrlStrategyRedirectionGuard implements CanActivate {
  private legacyUrlRedirections = [{
    pattern: /\/job-publication-detail\/(.*)/,
    action: this.jobPublicationDetailRedirect
  }];

  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    const fragment = state.root.fragment;
    if (!fragment) {
      return this.goHome();
    }
    for (const redirectionRule of this.legacyUrlRedirections) {
      const regExpMatchArray = fragment.match(redirectionRule.pattern);
      if (regExpMatchArray) {
        return redirectionRule.action.call(this, next, state, fragment);
      }
    }
    return this.goHome();
  }

  jobPublicationDetailRedirect(next, state, fragment) {
    const regExpMatchArray = fragment.match(/\/job-publication-detail\/(.*)/);
    if (regExpMatchArray) {
      this.router.navigateByUrl('manage-job-ads/' + decodeURIComponent(regExpMatchArray[1]));
      return false;
    }
  }

  goHome() {
    this.router.navigate(['home']);
    return false;
  }
}
