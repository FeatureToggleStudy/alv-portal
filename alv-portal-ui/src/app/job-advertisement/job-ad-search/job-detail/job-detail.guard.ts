import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { EMPTY, forkJoin, Observable, of } from 'rxjs';
import {
  FavouriteItemLoadedAction,
  JobAdSearchState,
  JobAdvertisementDetailLoadedAction,
  JobAdvertisementDetailUnloadedAction
} from '../state-management';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { JobAdvertisementRepository } from '../../../shared/backend-services/job-advertisement/job-advertisement.repository';
import { Injectable } from '@angular/core';
import { isAuthenticatedUser } from '../../../core/auth/user.model';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { JobAdFavouritesRepository } from '../../../shared/backend-services/favourites/job-ad-favourites.repository';
import { JobDetailComponent } from './job-detail.component';
import { NotificationsService } from '../../../core/notifications.service';
import { LandingNavigationService } from '../../../core/landing-navigation.service';

@Injectable()
export class JobDetailGuard implements CanActivate, CanDeactivate<JobDetailComponent> {

  constructor(
    private store: Store<JobAdSearchState>,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationsService,
    private jobAdFavouritesRepository: JobAdFavouritesRepository,
    private jobAdvertisementRepository: JobAdvertisementRepository) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = route.params['id'];
    const jobAdvertisement$ = this.jobAdvertisementRepository.findById(id).pipe(
      catchError(err => {
        // Handle job ad restricted error (meldepflichtige Stelle)
        if (err.status === 403) {
          this.notificationService.error('job-detail.notification.restricted', true);
          this.router.navigate(['/home']);
          return EMPTY;
        }
        throw err;
      })
    );
    const favouriteItem$ = this.authenticationService.getCurrentUser().pipe(
      take(1),
      switchMap(currentUser => {
        if (isAuthenticatedUser(currentUser)) {
          return this.jobAdFavouritesRepository.getFavourite(id, currentUser.id);
        } else {
          return of(undefined);
        }
      })
    );
    return forkJoin(jobAdvertisement$, favouriteItem$).pipe(
      tap(results => {
        const jobAdvertisement = results[0];
        const favouriteItem = results[1];
        this.store.dispatch(new JobAdvertisementDetailLoadedAction({ jobAdvertisement: jobAdvertisement }));
        if (favouriteItem !== undefined) {
          this.store.dispatch(new FavouriteItemLoadedAction({ favouriteItem: favouriteItem }));
        }
      }),
      map(() => {
        return true;
      })
    );
  }

  canDeactivate(component: JobDetailComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean {
    this.store.dispatch(new JobAdvertisementDetailUnloadedAction({}));
    return true;
  }

}
