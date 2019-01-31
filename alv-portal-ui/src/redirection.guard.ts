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
    const afterHashFragment: string = state.url.match(/\/#\/job-publication-detail\/(.*)/);
    debugger;
    const queryParamString = afterHashFragment.split('?');
    const suffix = afterHashFragment[1];
    if (afterHashFragment && suffix) {
      return this.router.navigate(['manage-job-ads', suffix]);
    }
    return false;
  }
}
