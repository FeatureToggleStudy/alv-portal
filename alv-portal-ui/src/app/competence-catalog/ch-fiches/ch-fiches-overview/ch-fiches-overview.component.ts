import { Component, OnInit } from '@angular/core';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { Observable } from 'rxjs';
import { ChFicheRepository } from '../../../shared/backend-services/ch-fiche/ch-fiche.repository';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { ChFiche } from '../../../shared/backend-services/ch-fiche/ch-fiche.types';
import { ActivatedRoute, Router } from '@angular/router';
import { OccupationTypeaheadItem } from '../../../shared/occupations/occupation-typeahead-item';
import { OccupationSuggestionService } from '../../../shared/occupations/occupation-suggestion.service';

@Component({
  selector: 'alv-ch-fiches-overview',
  templateUrl: './ch-fiches-overview.component.html',
  styleUrls: ['./ch-fiches-overview.component.scss']
})
export class ChFichesOverviewComponent extends AbstractSubscriber implements OnInit {


  searchForm: FormGroup;

  sortAsc = true;

  loadOccupationsFn = this.loadOccupations.bind(this);

  isCompetenceCatalogEditor$: Observable<boolean>;

  chFiches: ChFiche[];

  private page = 0;

  private readonly DEFAULT_PAGE_SIZE = 50;

  constructor(private chFicheRepository: ChFicheRepository,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private occupationSuggestionService: OccupationSuggestionService) {
    super();
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      query: [''],
      occupations: ['']
    });

    this.searchForm.valueChanges.pipe(
      debounceTime(300),
      takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        this.reload();
      });

    this.isCompetenceCatalogEditor$ = this.authenticationService.getCurrentUser().pipe(
      map(user => user && user.isCompetenceCatalogEditor())
    );
    this.onScroll();
  }

  onScroll() {
    this.chFicheRepository.search({
      body: {
        query: this.searchForm.get('query').value || '' //TODO here search by occupation must be added
      },
      page: this.page++,
      size: this.DEFAULT_PAGE_SIZE,
      sort: this.sortAsc ? 'date_asc' : 'date_desc'
    }).pipe(
    ).subscribe(response => {
      this.chFiches = [...(this.chFiches || []), ...response.content];
    });
  }

  editChFiche(chFiche: ChFiche) {
    this.router.navigate(['edit', chFiche.id], { relativeTo: this.route });
  }

  onSortClick() {
    this.sortAsc = !this.sortAsc;
    this.reload();
  }

  loadOccupations(query: string): Observable<OccupationTypeaheadItem[]> {
    return this.occupationSuggestionService.fetchCompetenceCatalogOccupations(query);
  }

  private reload() {
    this.page = 0;
    this.chFiches = [];
    this.onScroll();
  }
}
