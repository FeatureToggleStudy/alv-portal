import { Component, Input, OnInit } from '@angular/core';
import { LanguageSkill } from '../backend-services/job-advertisement/job-advertisement.types';

@Component({
  selector: 'alv-languages',
  template: `
    <ul *ngIf="languages?.length"
        class="alv-list">
      <li class="content__item"
          *ngFor="let language of languages">
        <strong>
          {{ 'global.reference.language.' + language.languageIsoCode | lowercase | translate }}
        </strong>
        <div *ngIf="language.spokenLevel">
                        {{ 'global.reference.language.spoken' | translate }}
          : {{ 'global.reference.language.level.' + language.spokenLevel | translate}},
        </div>
        <div *ngIf="language.writtenLevel">
                        {{ 'global.reference.language.written' | translate }}
          : {{ 'global.reference.language.level.' + language.writtenLevel | translate}}
        </div>
      </li>
    </ul>
  `
})

export class LanguageComponent implements OnInit {
  @Input() languages: LanguageSkill[];

  constructor() {
  }

  private static filterLanguagesWithInvalidCodes(languages: LanguageSkill[]): LanguageSkill[] {
    return languages
      .filter((language) => language.languageIsoCode !== '98' && language.languageIsoCode !== '99');
  }

  ngOnInit(): void {
    this.languages = LanguageComponent.filterLanguagesWithInvalidCodes(this.languages);
  }
}
