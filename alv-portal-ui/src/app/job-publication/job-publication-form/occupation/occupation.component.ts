import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { Observable, of } from 'rxjs/index';
import { Degree, Experience } from '../../../shared/backend-services/shared.types';
import { OccupationSuggestionService } from '../../../shared/occupations/occupation-suggestion.service';
import { OccupationMultiTypeaheadItem } from '../../../shared/occupations/occupation-multi-typeahead-item';
import { OccupationFormValue } from './occupation-form-value.types';

@Component({
  selector: 'alv-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.scss']
})
export class OccupationComponent implements OnInit {

  @Input()
  parentForm: FormGroup;

  @Input()
  occupationFormValue: OccupationFormValue;

  degreeOptions$: Observable<SelectableOption[]> = of([
    {
      value: null,
      label: 'home.tools.job-publication.no-selection'
    },
    ... Object.keys(Degree).map(degree => {
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

  constructor(private fb: FormBuilder,
              private occupationSuggestionService: OccupationSuggestionService) {
  }

  ngOnInit(): void {
    this.parentForm.addControl('occupation', this.buildOccupationGroup(this.occupationFormValue));
  }

  private buildOccupationGroup(value: OccupationFormValue): FormGroup {
    const { occupationSuggestion, degree, experience } = value;

    return this.fb.group({
      occupationSuggestion: [occupationSuggestion, [
        Validators.required
      ]],
      degree: [degree],
      experience: [experience]
    });
  }

  private loadOccupations(query: string): Observable<OccupationMultiTypeaheadItem[]> {
    return this.occupationSuggestionService.fetchJobPublicationOccupations(query);
  }

  get occupationGroup(): FormGroup {
    return <FormGroup>this.parentForm.get('occupation');
  }
}
