import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { SelectableOption } from '../../../../shared/forms/input/selectable-option.model';
import {
  CEFR_Level,
  LanguageSkill
} from '../../../../shared/backend-services/shared.types';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { defaultLanguageSkill } from './languages-form-value.types';
import { JobPublicationFormValueKeys } from '../job-publication-form-value.types';
import { map, startWith } from 'rxjs/operators';
import { LanguagesService } from '../../../../shared/languages/languages.service';


const DEFAULT_LANGUAGE_SKILL = defaultLanguageSkill();

@Component({
  selector: 'alv-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  @Input()
  parentForm: FormGroup;

  @Input()
  languagesFormValue: LanguageSkill[];

  languageSkillFormArray: FormArray;

  languageOptionsArray$: Observable<SelectableOption[]>[] = [];

  languageLevelOptions$: Observable<SelectableOption[]> = of(
    Object.values(CEFR_Level).map(level => {
      return {
        value: level,
        label: 'global.reference.language.level.' + level
      };
    })
  );

  private readonly MAX_LANGUAGE_OPTIONS_NUM = 5;

  constructor(private fb: FormBuilder,
              private languagesService: LanguagesService) {
  }

  ngOnInit() {
    const languageSkillGroups = (this.languagesFormValue.length > 0)
      ? this.languagesFormValue.map((languageSkill) => this.createNewLanguageSkillFormGroup(languageSkill))
      : [this.createNewLanguageSkillFormGroup()];
    this.languageSkillFormArray = this.fb.array(languageSkillGroups);
    this.parentForm.addControl(JobPublicationFormValueKeys.LANGUAGE_SKILLS, this.languageSkillFormArray);

    languageSkillGroups.forEach(group => this.languageOptionsArray$.push(this.getLanguageOptions(group)));
  }

  removeLanguageSkill(languageSkill: LanguageSkill) {
    const indexToRemove = this.parentForm.value.languageSkills.indexOf(languageSkill);
    this.languageSkillFormArray.removeAt(indexToRemove);
    this.languageOptionsArray$.splice(indexToRemove, 1);
  }

  addNewLanguageSkill() {
    const languageSkillFormGroup = this.createNewLanguageSkillFormGroup();
    this.languageSkillFormArray.push(languageSkillFormGroup);
    this.languageOptionsArray$.push(this.getLanguageOptions(languageSkillFormGroup));
    // focusing on added language for nice tabbing experience
    setTimeout(() => {
      const s: HTMLElement = document.querySelector('.language-skill:last-child [alvformcontrolname=languageIsoCode] select');
      s.focus();
    });
  }

  isAddLanguageSkillEnabled(): boolean {
    const maxNotReached = this.languageSkillFormArray.length < this.MAX_LANGUAGE_OPTIONS_NUM;
    const lastValid = !!this.languageSkillFormArray.at(this.languageSkillFormArray.length - 1).get('languageIsoCode').value;
    return maxNotReached && lastValid;
  }

  onLanguageSkillCodeChanged(languageSkillFormGroup: AbstractControl) {
    languageSkillFormGroup.patchValue({
      writtenLevel: DEFAULT_LANGUAGE_SKILL.writtenLevel,
      spokenLevel: DEFAULT_LANGUAGE_SKILL.spokenLevel
    }, { emitEvent: false });
  }

  getLanguageOptions(languageSkillFormGroup: FormGroup): Observable<SelectableOption[]> {
    return combineLatest(
      this.languagesService.getLanguages(true),
      this.languageSkillFormArray.valueChanges.pipe(startWith(this.languageSkillFormArray.value))
    )
      .pipe(
        map(([languages, selectedLanguages]) => {
          return this.filterLanguages(languages,
            selectedLanguages.map(selectedLanguage => selectedLanguage.languageIsoCode),
            languageSkillFormGroup.value.languageIsoCode);
        })
      );
  }

  private filterLanguages(availableLanguageOptions: SelectableOption[], filteredLanguages: string[], allowedLanguage: string) {
    return availableLanguageOptions.filter(languageOption => languageOption.value && languageOption.value === allowedLanguage ||
      !filteredLanguages.find(selectedLanguage => selectedLanguage === languageOption.value)
    );
  }

  private createNewLanguageSkillFormGroup(languageSkill = DEFAULT_LANGUAGE_SKILL): FormGroup {
    return this.fb.group({
      languageIsoCode: [languageSkill.languageIsoCode],
      writtenLevel: [languageSkill.writtenLevel],
      spokenLevel: [languageSkill.spokenLevel]
    });
  }
}
