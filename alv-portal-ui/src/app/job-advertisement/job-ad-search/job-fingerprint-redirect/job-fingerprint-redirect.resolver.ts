import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { JobAdvertisementRepository } from '../../../shared/backend-services/job-advertisement/job-advertisement.repository';

@Injectable()
export class JobFingerprintRedirectResolver implements Resolve<void> {

  constructor(private router: Router,
              private jobAdvertisementRepository: JobAdvertisementRepository ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {

    console.log('resolver works');
    this.jobAdvertisementRepository.findByFingerprint(route.queryParams['externalId'])
        .subscribe((job) => {
            if (job !== null) {
                this.router.navigate(['/job-search/', job.id]);
            }
        });
  }
}
