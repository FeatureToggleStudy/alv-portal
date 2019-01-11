import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import {
  CEFR_Level,
  Language,
  LanguageSkill
} from '../../../shared/backend-services/shared.types';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

const EMPTY_LANGUAGE_SKILL: LanguageSkill = {
  languageIsoCode: null,
  writtenLevel: CEFR_Level.NONE,
  spokenLevel: CEFR_Level.NONE
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
    const maxNotReached = this.languageSkillFormArray.length < this.MAX_LANGUAGE_OPTIONS_NUM;
    const lastValid = !!this.languageSkillFormArray.at(this.languageSkillFormArray.length - 1).get('languageIsoCode').value;
    return maxNotReached && lastValid;
  }

  onLanguageSkillCodeChanged(languageSkillFormGroup: FormGroup) {
    languageSkillFormGroup.patchValue({
      writtenLevel: EMPTY_LANGUAGE_SKILL.writtenLevel,
      spokenLevel: EMPTY_LANGUAGE_SKILL.spokenLevel
    }, { emitEvent: false });
  }

  private createNewLanguageSkillFormGroup(languageSkill = EMPTY_LANGUAGE_SKILL): FormGroup {
    return this.fb.group({
      languageIsoCode: [languageSkill.languageIsoCode],
      writtenLevel: [languageSkill.writtenLevel],
      spokenLevel: [languageSkill.spokenLevel]
    });
  }

}
