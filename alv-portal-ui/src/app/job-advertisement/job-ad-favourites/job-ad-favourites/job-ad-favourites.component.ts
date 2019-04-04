import { Component, OnInit } from '@angular/core';
import { IconKey } from '../../../shared/icons/custom-icon/custom-icon.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, take, takeUntil, tap } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getJobAdFavouritesSearchFilter,
  JobAdFavouritesState
} from '../state-management/state';
import { JobAdFavouritesSearchFilter } from './job-ad-favourites.types';
import { ApplyFilterAction } from '../state-management/actions';
import { JobSearchResult } from '../../shared/job-search-result/job-search-result.component';

@Component({
  selector: 'alv-job-ad-favourites',
  templateUrl: './job-ad-favourites.component.html',
  styleUrls: ['./job-ad-favourites.component.scss']
})
export class JobAdFavouritesComponent extends AbstractSubscriber implements OnInit {

  IconKey = IconKey;

  currentFilter$: Observable<JobAdFavouritesSearchFilter>;

  form: FormGroup;

  jobs$: Observable<JobSearchResult[]>;

  constructor(private fb: FormBuilder,
              private store: Store<JobAdFavouritesState>) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      query: [null]
    });

    this.currentFilter$ = this.store.pipe(select(getJobAdFavouritesSearchFilter)).pipe(
      tap(currentFilter => {
        this.form.patchValue({ query: currentFilter.query }, { emitEvent: false });
      })
    );

    this.form.get('query').valueChanges.pipe(
      debounceTime(300),
      takeUntil(this.ngUnsubscribe))
      .subscribe(value => this.applyQuery(value));
  }


  private applyQuery(newQuery: string) {
    this.currentFilter$.pipe(
      take(1))
      .subscribe(value => {
        this.store.dispatch(new ApplyFilterAction({
          ...value,
          query: newQuery
        }));
      });
  }

}
