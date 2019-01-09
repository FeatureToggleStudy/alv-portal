import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import {
  CEFR_Level,
  Language,
  LanguageSkill
} from '../../../shared/backend-services/shared.types';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterLanguageSkill } from '../../../shared/backend-services/candidate/candidate.types';

const EMPTY_LANGUAGE_SKILL: FilterLanguageSkill = {
  code: null,
  written: CEFR_Level.NONE,
  spoken: CEFR_Level.NONE
};

@Component({
  selector: 'alv-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  @Input()
  parentForm: FormGroup;

  languageSkillFormArray: FormArray;

  languageOptions$: Observable<SelectableOption[]> = of([
    {
      value: null,
      label: 'global.reference.language.no-selection'
    },
    ... Object.values(Language).map(language => {
      return {
        value: language,
        label: 'global.reference.language.' + language
      };
    })
  ]);

  languageLevelOptions$: Observable<SelectableOption[]> = of(
    Object.values(CEFR_Level).map(level => {
      return {
        value: level,
        label: 'global.reference.language.level.' + level
      };
    })
  );

  private readonly MAX_LANGUAGE_OPTIONS_NUM = 5;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.languageSkillFormArray = this.fb.array([
      this.createNewLanguageSkillFormGroup()
    ]);

    this.parentForm.addControl('languageSkills', this.languageSkillFormArray);
  }

  removeLanguageSkill(languageSkill: LanguageSkill) {
    this.languageSkillFormArray.removeAt(this.parentForm.value.languageSkills.indexOf(languageSkill));
  }

  addNewLanguageSkill() {
    this.languageSkillFormArray.push(this.createNewLanguageSkillFormGroup());
  }

  isAddLanguageSkillEnabled(): boolean {
    const languageSkills = this.languageSkillFormArray;
    const maxNotReached = languageSkills.length < this.MAX_LANGUAGE_OPTIONS_NUM;
    const lastValid = !!languageSkills.at(languageSkills.length - 1).get('code').value;
    return maxNotReached && lastValid;
  }

  onLanguageSkillCodeChanged(languageSkillFormGroup: FormGroup) {
    languageSkillFormGroup.patchValue({
      written: EMPTY_LANGUAGE_SKILL.written,
      spoken: EMPTY_LANGUAGE_SKILL.spoken
    }, { emitEvent: false });
  }

  private createNewLanguageSkillFormGroup(languageSkill = EMPTY_LANGUAGE_SKILL): FormGroup {
    return this.fb.group({
      code: [languageSkill.code],
      written: [languageSkill.written],
      spoken: [languageSkill.spoken]
    });
  }

}
