import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { select, Store } from '@ngrx/store';
import {
  CoreState,
  isCompetenceCatalog,
} from '../state-management/state/core.state.ts';

@Injectable({
  providedIn: 'root'
})
export class AppContextService {

  private readonly isCompetenceCatalog$: Observable<boolean>;

  constructor(private store: Store<CoreState>) {

    this.isCompetenceCatalog$ = this.store.pipe(
      select(isCompetenceCatalog)
    );
  }

  isCompetenceCatalog(): Observable<boolean> {
    return this.isCompetenceCatalog$;
  }
}
