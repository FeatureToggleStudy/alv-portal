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
    const afterHashFragment: RegExpMatchArray = state.url.match(/\/#\/job-publication-detail\/(.*)/);
    const pageNameAndParams = afterHashFragment[1];
    const pageNameAndParamsArr = pageNameAndParams.split('?');
    const parsedParams = pageNameAndParamsArr[1];
    debugger;
    if (pageNameAndParamsArr.length > 2) {
      // means that something went wrong
      return this.router.navigate(['manage-job-ads']);
    } else if (pageNameAndParamsArr.length === 1) {
      //no query params
      return this.router.navigate(['manage-job-ads', pageNameAndParams]);
    } else {
      // one or more correctly formatter query params
      const queryParamsStr: string[] = parsedParams.split('&');
      const queryParams = queryParamsStr.reduce((acc, paramString) => {
        const keyValue = paramString.split('=');
        const paramKey = keyValue[0];
        const paramValue = keyValue[1];
        const newPair = {};
        newPair[paramKey] = paramValue;
        return Object.assign(acc, newPair);
        debugger;
      }, {});
      return this.router.navigate(['manage-job-ads', pageNameAndParamsArr[0]], { queryParams: queryParams});
    }
  }
}
