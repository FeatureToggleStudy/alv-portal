import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { flatMap, map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { InitialFormValueConfig } from './job-publication-form/job-publication-form-value-factory';
import { AuthenticationService } from '../core/auth/authentication.service';
import { JobAdvertisementRepository } from '../shared/backend-services/job-advertisement/job-advertisement.repository';
import {
  JOB_ADVERTISEMENT_QUERY_PARAM_NAME,
  TITLE_QUERY_PARAM_NAME,
  TOKEN_QUERY_PARAM_NAME
} from './job-publication-query-params';
import { JobAdvertisement } from '../shared/backend-services/job-advertisement/job-advertisement.types';

@Injectable()
export class JobPublicationResolver implements Resolve<Observable<InitialFormValueConfig>> {

  constructor(private authenticationService: AuthenticationService,
              private jobAdvertisementRepository: JobAdvertisementRepository) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InitialFormValueConfig> {
    const jobAdvertisementTitle = route.queryParams[TITLE_QUERY_PARAM_NAME];
    const duplicationJobAdvertisementId = route.queryParams[JOB_ADVERTISEMENT_QUERY_PARAM_NAME];
    const token = route.queryParams[TOKEN_QUERY_PARAM_NAME];

    const companyContactTemplate$ = this.authenticationService.getCurrentUser().pipe(
      flatMap((user) => (user ? this.authenticationService.getCurrentCompany() : of(null))),
      take(1)
    );

    const jobAdvertisement$ = this.getJobAdvertisement(token, duplicationJobAdvertisementId);

    return companyContactTemplate$.pipe(
      map((companyContactTemplateModel) => ({ companyContactTemplateModel })),
      flatMap((initialFormValueConfig) => jobAdvertisement$.pipe(
        map((jobAdvertisement) => ({ ...initialFormValueConfig, jobAdvertisement}))
      )),
      map((initialFormValueConfig) => ({...initialFormValueConfig, jobAdvertisementTitle}))
    );
  }

  private getJobAdvertisement(token: string, id: string): Observable<JobAdvertisement> {
    if (token) {
      return this.jobAdvertisementRepository.findByToken(token);
    }
    if (id) {
      return this.jobAdvertisementRepository.findById(id);
    }

    return of(null);
  }
}
