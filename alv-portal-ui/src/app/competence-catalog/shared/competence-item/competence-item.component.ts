import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  getTranslatedString,
  TranslatedString, TranslatedStringToCurrentLanguage
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

  translatedTitle$: Observable<TranslatedStringToCurrentLanguage>;

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
      map(lang => getTranslatedString(this.multiLanguageTitle, lang))
    );
  }

}
