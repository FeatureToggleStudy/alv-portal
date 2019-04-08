import {Injectable} from '@angular/core';
import {JobAdvertisement} from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import {combineLatest, Observable, of} from 'rxjs';
import {flatMap, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {JobAdvertisementUtils} from '../../shared/backend-services/job-advertisement/job-advertisement.utils';
import {I18nService} from '../../core/i18n.service';
import {JobCenterRepository} from '../../shared/backend-services/reference-service/job-center.repository';
import {JobDetailModel} from './job-detail-model';
import {JobAdFavouritesRepository} from '../../shared/backend-services/favourites/job-ad-favourites.repository';
import {JobCenter} from '../../shared/backend-services/reference-service/job-center.types';
import {AuthenticationService} from '../../core/auth/authentication.service';
import {User} from '../../core/auth/user.model';


@Injectable()
export class JobDetailModelFactory {

  constructor(private i18nService: I18nService,
              private referenceServiceRepository: JobCenterRepository,
              private jobAdFavouritesRepository: JobAdFavouritesRepository,
              private authenticationService: AuthenticationService) {
  }

  public create(job: JobAdvertisement): Observable<JobDetailModel> {

    const jobCenter$: Observable<JobCenter> = this.i18nService.currentLanguage$.pipe(
      flatMap((currentLanguage) => {
        if (job.jobCenterCode) {
          return this.referenceServiceRepository.resolveJobCenter(job.jobCenterCode, currentLanguage);
        }
        return of(null);
      })
    );

    // TODO if there is no user there is also no need to fetch the favourite
    const favouriteDescriptor$ = this.authenticationService.getCurrentUser().pipe(
      switchMap((currentUser: User) => {
        return this.jobAdFavouritesRepository.getFavouritesForJobAd(job.id, currentUser.id);
      })
    );


    return combineLatest(jobCenter$, favouriteDescriptor$)
      .pipe(
        withLatestFrom(this.i18nService.currentLanguage$),
        map(([[jobCenter, favouritesDescriptor], currentLanguage]) => {
          const jobDescription = JobAdvertisementUtils.getJobDescription(job, currentLanguage);
          return new JobDetailModel(jobDescription, jobCenter, job, favouritesDescriptor);
        })
      );
  }

}

