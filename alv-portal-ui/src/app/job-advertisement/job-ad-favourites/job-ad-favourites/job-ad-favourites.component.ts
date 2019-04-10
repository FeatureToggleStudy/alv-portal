import { Component, OnInit } from '@angular/core';
import { IconKey } from '../../../shared/icons/custom-icon/custom-icon.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getJobAdFavouritesResults,
  getJobAdFavouritesSearchFilter,
  JobAdFavouritesState
} from '../state-management/state';
import { ApplyFilterAction, LoadNextPageAction } from '../state-management/actions';
import { JobSearchResult } from '../../shared/job-search-result/job-search-result.component';
import {
  AddJobAdFavouriteAction,
  RemoveJobAdFavouriteAction,
  UpdatedJobAdFavouriteAction
} from '../../../core/state-management/actions/core.actions';
import { I18nService } from '../../../core/i18n.service';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { User } from '../../../core/auth/user.model';
import { ScrollService } from '../../../core/scroll.service';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import {
  CONFIRM_DELETE_FAVOURITE_MODAL,
  CONFIRM_DELETE_FAVOURITE_NOTE_MODAL
} from './job-ad-favourites.types';

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
              private scrollService: ScrollService,
              private authenticationService: AuthenticationService,
              private store: Store<JobAdFavouritesState>,
              private modalService: ModalService) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      query: ['']
    });

    this.jobAdFavouriteSearchResults$ = this.store.pipe(select(getJobAdFavouritesResults));

    this.store.pipe(select(getJobAdFavouritesSearchFilter)).pipe(
      tap(currentFilter => {
        this.form.patchValue({ query: currentFilter.query }, { emitEvent: false });
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
    this.store.dispatch(new AddJobAdFavouriteAction({ jobAdvertisementId: jobSearchResult.jobAdvertisement.id }));
  }

  removeFavourite(jobSearchResult: JobSearchResult) {
    this.modalService.openConfirm(
      jobSearchResult.favouriteItem.note ? CONFIRM_DELETE_FAVOURITE_NOTE_MODAL : CONFIRM_DELETE_FAVOURITE_MODAL
    ).result.then(
      () => this.store.dispatch(new RemoveJobAdFavouriteAction({ favouriteItem: jobSearchResult.favouriteItem })),
      () => {
      }
    );
  }

  updatedFavourite(jobSearchResult: JobSearchResult) {
    this.store.dispatch(new UpdatedJobAdFavouriteAction({ favouriteItem: jobSearchResult.favouriteItem }));
    // If we change a Favourite Item's Note then we must rely on the backend search since it might be, that the updated note does not match the current query anymore
    if (this.form.get('query').value) {
      this.store.dispatch(new ApplyFilterAction({ query: this.form.get('query').value }));
      this.scrollService.scrollToTop();
    }
  }

}
