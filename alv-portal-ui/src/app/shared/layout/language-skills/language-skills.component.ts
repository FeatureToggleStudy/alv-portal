import { Component, Input, OnInit } from '@angular/core';
import { LanguageSkill } from '../../backend-services/shared.types';


@Component({
  selector: 'alv-language-skills',
  templateUrl: './language-skills.component.html'
})
export class LanguageSkillsComponent implements OnInit {

  @Input() languages: LanguageSkill[];

  constructor() {
  }

  private static filterLanguagesWithInvalidCodes(languages: LanguageSkill[]): LanguageSkill[] {
    return languages
      .filter((language) => language.languageIsoCode !== '98' && language.languageIsoCode !== '99');
  }

  ngOnInit(): void {
    this.languages = LanguageSkillsComponent.filterLanguagesWithInvalidCodes(this.languages);
  }
}
