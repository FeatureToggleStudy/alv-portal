import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  getTranslatedString,
  TranslatedString
} from '../../../shared/backend-services/shared.types';
import { map } from 'rxjs/operators';
import { Languages } from '../../../core/languages.constants';
import { Observable } from 'rxjs';
import { I18nService } from '../../../core/i18n.service';

@Component({
  selector: 'alv-competence-item',
  templateUrl: './competence-item.component.html',
  styleUrls: ['./competence-item.component.scss']
})
export class CompetenceItemComponent implements OnInit {

  @Input() superTitle: string;
  @Input() type: string;
  @Input() showActionButton: boolean;
  @Input() actionButtonIcon: IconProp;
  @Input() isItemClickable: boolean;
  @Output() itemClick = new EventEmitter<void>();
  @Output() actionClick = new EventEmitter<void>();
  translatedTitle$: Observable<{isWrongLanguage: boolean, value: string}>;

  constructor(private i18nService: I18nService) {
  }

  private _multiLanguageTitle: TranslatedString;

  get multiLanguageTitle(): TranslatedString {
    return this._multiLanguageTitle;
  }

  @Input()
  set multiLanguageTitle(value: TranslatedString) {
    this._multiLanguageTitle = value;
    this.setMultiLanguageTitle();
  }

  ngOnInit() {
  }

  onItemClick() {
    this.itemClick.emit();
  }

  onActionClick() {
    this.actionClick.emit();
  }

  private setMultiLanguageTitle() {
    this.translatedTitle$ = this.i18nService.currentLanguage$.pipe(
      map(lang => {
        const translatedString = getTranslatedString(this.multiLanguageTitle, lang);
        if (!translatedString) {
          return {
            isWrongLanguage: true,
            value: this.getNextAvailableTitle()
          };
        }
        return {
          isWrongLanguage: false,
          value: translatedString
        };
      })
    );
  }

  /*
   * Get description in the next available language if current language is not available
   */
  private getNextAvailableTitle() {
    for (const lang of Object.values(Languages)) {
      const description = getTranslatedString(this.multiLanguageTitle, lang);
      if (description) {
        return description;
      }
    }
  }
}
