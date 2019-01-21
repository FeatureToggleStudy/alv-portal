import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { flatMap, map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { InitialFormValueConfig } from './job-publication-form-value-factory';
import { AuthenticationService } from '../../core/auth/authentication.service';

@Injectable()
export class JobPublicationFormResolver implements Resolve<Observable<InitialFormValueConfig>> {

  constructor(private authenticationService: AuthenticationService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InitialFormValueConfig> {
    const jobAdvertisementTitle = route.queryParams['job-title'];

    //todo: load the job-advertisement that we want to copy
    return this.authenticationService.getCurrentUser().pipe(
      flatMap((user) => (user ? this.authenticationService.getCurrentCompany() : of(null))),
      map((companyContactTemplateModel) => ({ companyContactTemplateModel })),
      map((initialFormValueConfig) => ({
        ...initialFormValueConfig,
        jobAdvertisementTitle
      })),
      take(1)
    );
  }
}
