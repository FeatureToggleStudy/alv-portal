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
    const match = state.url.match(/\/#\/job-publication-detail\/(.*)/);
    const suffix = match[1];
    if (match && suffix) {
      return this.router.navigate(['manage-job-ads', suffix]);
    }
    return false;
  }
}
