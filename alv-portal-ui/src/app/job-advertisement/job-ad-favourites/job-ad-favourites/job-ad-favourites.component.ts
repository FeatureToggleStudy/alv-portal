import {Component, OnInit} from '@angular/core';
import {IconKey} from '../../../shared/icons/custom-icon/custom-icon.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, takeUntil, tap} from 'rxjs/operators';
import {AbstractSubscriber} from '../../../core/abstract-subscriber';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {
  getJobAdFavouritesResults,
  getJobAdFavouritesSearchFilter,
  JobAdFavouritesState
} from '../state-management/state';
import {ApplyFilterAction, LoadNextPageAction} from '../state-management/actions';
import {JobSearchResult} from '../../shared/job-search-result/job-search-result.component';
import {
  AddJobAdFavouriteAction,
  RemoveJobAdFavouriteAction,
  UpdatedJobAdFavouriteAction
} from '../../../core/state-management/actions/core.actions';
import {I18nService} from '../../../core/i18n.service';
import {AuthenticationService} from '../../../core/auth/authentication.service';
import {User} from '../../../core/auth/user.model';

@Component({
  selector: 'alv-job-ad-favourites',
  templateUrl: './job-ad-favourites.component.html',
  styleUrls: ['./job-ad-favourites.component.scss']
})
export class JobAdFavouritesComponent extends AbstractSubscriber implements OnInit {

  IconKey = IconKey;

  form: FormGroup;

  jobAdFavouriteSearchResults$: Observable<JobSearchResult[]>;

  currentUser$: Observable<User>;

  currentLanguage$: Observable<string>;

  constructor(private fb: FormBuilder,
              private i18nService: I18nService,
              private authenticationService: AuthenticationService,
              private store: Store<JobAdFavouritesState>) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      query: ['']
    });

    this.jobAdFavouriteSearchResults$ = this.store.pipe(select(getJobAdFavouritesResults));

    this.store.pipe(select(getJobAdFavouritesSearchFilter)).pipe(
      tap(currentFilter => {
        this.form.patchValue({query: currentFilter.query}, {emitEvent: false});
      }),
      takeUntil(this.ngUnsubscribe)
    ).subscribe();

    this.form.get('query').valueChanges.pipe(
      debounceTime(300),
      takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        this.store.dispatch(new ApplyFilterAction({
          query: value
        }));
      });

    this.currentUser$ = this.authenticationService.getCurrentUser();

    this.currentLanguage$ = this.i18nService.currentLanguage$;
  }

  onScroll() {
    this.store.dispatch(new LoadNextPageAction());
  }

  addFavourite(jobSearchResult: JobSearchResult) {
    this.store.dispatch(new AddJobAdFavouriteAction({jobAdvertisementId: jobSearchResult.jobAdvertisement.id}));
  }

  removeFavourite(jobSearchResult: JobSearchResult) {
    this.store.dispatch(new RemoveJobAdFavouriteAction({favouriteItem: jobSearchResult.favouriteItem}));
  }

  updatedFavourite(jobSearchResult: JobSearchResult) {
    this.store.dispatch(new UpdatedJobAdFavouriteAction({favouriteItem: jobSearchResult.favouriteItem}));
    this.store.dispatch(new ApplyFilterAction({query: this.form.get('query').value}));
  }

}
