import {Component, OnInit} from '@angular/core';
import {IconKey} from '../../../shared/icons/custom-icon/custom-icon.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, map, startWith, take, takeUntil, tap} from 'rxjs/operators';
import {AbstractSubscriber} from '../../../core/abstract-subscriber';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {
  getJobAdFavouritesResults,
  getJobAdFavouritesSearchFilter,
  JobAdFavouritesState
} from '../state-management/state';
import {JobAdFavouritesSearchFilter} from './job-ad-favourites.types';
import {ApplyFilterAction, LoadNextPageAction} from '../state-management/actions';
import {JobSearchResult} from '../../shared/job-search-result/job-search-result.component';
import {
  getJobSearchFilter,
  getJobSearchResults,
  getTotalCount
} from '../../job-ad-search/state-management/state';

@Component({
  selector: 'alv-job-ad-favourites',
  templateUrl: './job-ad-favourites.component.html',
  styleUrls: ['./job-ad-favourites.component.scss']
})
export class JobAdFavouritesComponent extends AbstractSubscriber implements OnInit {

  IconKey = IconKey;

  jobAdFavouriteSearchFilter$: Observable<JobAdFavouritesSearchFilter>;

  form: FormGroup;

  jobAdFavouriteSearchResults$: Observable<JobSearchResult[]>;

  constructor(private fb: FormBuilder,
              private store: Store<JobAdFavouritesState>) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      query: ['']
    });

    this.jobAdFavouriteSearchResults$ = this.store.pipe(select(getJobAdFavouritesResults));

    this.jobAdFavouriteSearchFilter$ = this.store.pipe(select(getJobAdFavouritesSearchFilter)).pipe(
      tap(currentFilter => {
        this.form.patchValue({query: currentFilter.query}, {emitEvent: false});
      })
    );

    this.form.get('query').valueChanges.pipe(
      debounceTime(300),
      takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        this.store.dispatch(new ApplyFilterAction({
          query: value
        }));
      });
  }

  onScroll() {
    this.store.dispatch(new LoadNextPageAction());
  }

}
