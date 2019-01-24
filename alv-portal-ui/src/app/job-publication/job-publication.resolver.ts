import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { flatMap, map, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { InitialFormValueConfig } from './job-publication-form/job-publication-form-value-factory';
import { AuthenticationService } from '../core/auth/authentication.service';
import { JobAdvertisementRepository } from '../shared/backend-services/job-advertisement/job-advertisement.repository';

@Injectable()
export class JobPublicationResolver implements Resolve<Observable<InitialFormValueConfig>> {

  constructor(private authenticationService: AuthenticationService,
              private jobAdvertisementRepository: JobAdvertisementRepository) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InitialFormValueConfig> {
    const jobAdvertisementTitle = route.queryParams['job-title'];
    const duplicationJobAdvertisementId = route.queryParams['job-ad-id'];
    const jobAdvertisement$ = duplicationJobAdvertisementId ? this.jobAdvertisementRepository.findById(duplicationJobAdvertisementId) : of(null);
    const companyContactTemplate$ = this.authenticationService.getCurrentUser().pipe(
      flatMap((user) => (user ? this.authenticationService.getCurrentCompany() : of(null))),
      map((companyContactTemplateModel) => ({ companyContactTemplateModel })));

    return jobAdvertisement$.pipe(
      withLatestFrom(companyContactTemplate$),
      map(([jobAdvertisement, initialFormValueConfig]) => {
          return <InitialFormValueConfig>{
            ...initialFormValueConfig,
            jobAdvertisement,
            jobAdvertisementTitle
          };
        }
      )
    );
  }
}
