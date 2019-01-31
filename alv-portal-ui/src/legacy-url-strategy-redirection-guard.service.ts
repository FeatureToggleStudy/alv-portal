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
  constructor(private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> | boolean {
    const fragment = state.root.fragment;
    if (!fragment) {
      return this.goHome();
    }
    const regExpMatchArray = fragment.match(/\/job-publication-detail\/(.*)/);
    if (regExpMatchArray) {
      return this.router.navigateByUrl('manage-job-ads/' + decodeURIComponent(regExpMatchArray[1]));
    }
    return this.goHome();
  }
  goHome() {
    this.router.navigate(['home']);
    return false;
  }
}
