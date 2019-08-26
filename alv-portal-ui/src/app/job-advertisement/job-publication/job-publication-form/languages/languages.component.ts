import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SelectableOption } from '../../../../shared/forms/input/selectable-option.model';
import {
  CEFR_Level,
  LanguageSkill
} from '../../../../shared/backend-services/shared.types';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { defaultLanguageSkill } from './languages-form-value.types';
import { JobPublicationFormValueKeys } from '../job-publication-form-value.types';
import { map, startWith, takeUntil, withLatestFrom } from 'rxjs/operators';
import { LanguagesService } from '../../../../shared/languages/languages.service';
import { AbstractSubscriber } from '../../../../core/abstract-subscriber';


const DEFAULT_LANGUAGE_SKILL = defaultLanguageSkill();

@Component({
  selector: 'alv-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent extends AbstractSubscriber implements OnInit {

  @Input()
  parentForm: FormGroup;

  @Input()
  languagesFormValue: LanguageSkill[];

  languageSkillFormArray: FormArray;

  languageOptions$: Observable<SelectableOption[]>;

  languageLevelOptions$: Observable<SelectableOption[]> = of(
    Object.values(CEFR_Level).map(level => {
      return {
        value: level,
        label: 'global.reference.language.level.' + level
      };
    })
  );

  private languageSkillFormArrayChanges$;

  private readonly MAX_LANGUAGE_OPTIONS_NUM = 5;

  constructor(private fb: FormBuilder,
              private languagesService: LanguagesService) {
    super();
  }

  ngOnInit() {
    const languageSkillGroups = (this.languagesFormValue.length > 0)
      ? this.languagesFormValue.map((languageSkill) => this.createNewLanguageSkillFormGroup(languageSkill))
      : [this.createNewLanguageSkillFormGroup()];
    this.languageSkillFormArray = this.fb.array(languageSkillGroups);
    this.parentForm.addControl(JobPublicationFormValueKeys.LANGUAGE_SKILLS, this.languageSkillFormArray);

    this.languageSkillFormArrayChanges$ = this.languageSkillFormArray.valueChanges.pipe(startWith(this.languageSkillFormArray.value));

  }

  removeLanguageSkill(languageSkill: LanguageSkill) {
    this.languageSkillFormArray.removeAt(this.parentForm.value.languageSkills.indexOf(languageSkill));
  }

  addNewLanguageSkill() {
    this.languageSkillFormArray.push(this.createNewLanguageSkillFormGroup());
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

  onLanguageSkillCodeChanged(languageSkillFormGroup: FormGroup) {
    languageSkillFormGroup.patchValue({
      writtenLevel: DEFAULT_LANGUAGE_SKILL.writtenLevel,
      spokenLevel: DEFAULT_LANGUAGE_SKILL.spokenLevel
    }, { emitEvent: false });
  }

  getLanguageOptions(languageSkillFormGroup: FormGroup): Observable<SelectableOption[]> {
    return this.languageSkillFormArrayChanges$.pipe(
      withLatestFrom(this.languagesService.getLanguages(true)),
      takeUntil(this.ngUnsubscribe),
      map(([selectedLanguages, languages]) => {
        console.log('log: ' + languageSkillFormGroup.value.languageIsoCode + '  ' + languages.filter(language => {
            return (language.value && language.value === languageSkillFormGroup.value.languageIsoCode) || !selectedLanguages.find(selectedLanguage => selectedLanguage.languageIsoCode && selectedLanguage.languageIsoCode === language.value);
          }
        ).length);
        
        return languages.filter(language => {
            return (language.value && language.value === languageSkillFormGroup.value.languageIsoCode) ||
              !selectedLanguages.find(selectedLanguage => {
                return selectedLanguage.languageIsoCode && selectedLanguage.languageIsoCode === language.value;
              });
          }
        );
      })
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
