import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { Observable, of } from 'rxjs/index';
import { Degree, Experience } from '../../../shared/backend-services/shared.types';
import { OccupationSuggestionService } from '../../../shared/occupations/occupation-suggestion.service';
import { OccupationMultiTypeaheadItem } from '../../../shared/occupations/occupation-multi-typeahead-item';
import { OccupationFormValue } from './occupation-form-value.types';
import { I18nService } from '../../../core/i18n.service';
import { distinctUntilChanged, filter, flatMap, takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';

@Component({
  selector: 'alv-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.scss']
})
export class OccupationComponent extends AbstractSubscriber implements OnInit {

  @Input()
  parentForm: FormGroup;

  @Input()
  set occupationFormValue(value: OccupationFormValue) {
    this.occupation.patchValue({ ...value }, { emitEvent: false });
  }

  occupation: FormGroup;

  degreeOptions$: Observable<SelectableOption[]> = of([
    {
      value: null,
      label: 'home.tools.job-publication.no-selection'
    },
    ...Object.keys(Degree).map(degree => {
      return {
        value: degree,
        label: 'global.degree.' + degree
      };
    })
  ]);

  //todo: Do we need the "no experience" option?
  experienceOptions$: Observable<SelectableOption[]> = of([
    {
      value: null,
      label: 'home.tools.job-publication.no-selection'
    },
    ...Object.keys(Experience).map(experience => {
      return {
        value: experience,
        label: 'global.experience.' + experience
      };
    })
  ]);

  loadOccupationsFn = this.loadOccupations.bind(this);

  constructor(private occupationSuggestionService: OccupationSuggestionService,
              private fb: FormBuilder,
              private i18nService: I18nService) {
    super();

    this.occupation = this.fb.group({
      occupationSuggestion: [null, [
        Validators.required
      ]],
      degree: [],
      experience: []
    });
  }

  ngOnInit(): void {
    this.parentForm.addControl('occupation', this.occupation);

    this.i18nService.currentLanguage$.pipe(
      distinctUntilChanged(),
      filter(() => !!this.occupation.value.occupationSuggestion),
      flatMap(lang => this.occupationSuggestionService.translate(this.occupation.value.occupationSuggestion, lang)),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(translatedOccupation => {
      this.occupation.get('occupationSuggestion').setValue(translatedOccupation);
    });
  }

  private loadOccupations(query: string): Observable<OccupationMultiTypeaheadItem[]> {
    return this.occupationSuggestionService.fetchJobPublicationOccupations(query);
  }
}
