import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  CompetenceElement,
  ElementType
} from '../../../shared/backend-services/competence-element/competence-element.types';
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

  private _title: TranslatedString;

  get title(): TranslatedString {
    return this._title;
  }

  @Input()
  set title(value: TranslatedString) {
    this._title = value;
    this.setDescription();
  }

  @Input() superTitle: string;

  @Input() type: string;

  @Input() showActionButton: boolean;

  @Input() actionButtonIcon: IconProp;

  @Input() isItemClickable: boolean;

  @Output() itemClick = new EventEmitter<void>();

  @Output() actionClick = new EventEmitter<void>();

  translatedTitle$: Observable<string>;

  constructor(private i18nService: I18nService) {
  }

  ngOnInit() {
  }

  onItemClick() {
    this.itemClick.emit();
  }

  onActionClick() {
    this.actionClick.emit();
  }

  private setDescription() {
    this.translatedTitle$ = this.i18nService.currentLanguage$.pipe(
      map(lang => getTranslatedString(this.title, lang) || this.getNextAvailableTitle())
    );
  }

  /*
   * Get description in the next available language if current language is not available
   */
  private getNextAvailableTitle() {
    for (const lang of Object.values(Languages)) {
      const description = getTranslatedString(this.title, lang);
      if (description) {
        return description;
      }
    }
  }
}
