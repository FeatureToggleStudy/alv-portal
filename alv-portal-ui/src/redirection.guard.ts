import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectionGuard implements CanActivate {
  constructor(private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const fragment = state.root.fragment;
    if (!fragment) {
      return true;
    }
    const regExpMatchArray = fragment.match(/\/job-publication-detail\/(.*)/);
    if (regExpMatchArray) {
      return this.router.navigateByUrl('manage-job-ads/' + decodeURIComponent(regExpMatchArray[1]));
    }
    return true;
  }
}
