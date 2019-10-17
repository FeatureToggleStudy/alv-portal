import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { I18nService } from '../../../../core/i18n.service';
import {
  getTranslatedString,
  TranslatedString,
  TranslatedStringToCurrentLanguage
} from '../../../shared/shared-competence-catalog.types';

@Component({
  selector: 'alv-ch-fiche-title',
  templateUrl: './ch-fiche-title.component.html',
  styleUrls: ['./ch-fiche-title.component.scss', '../alv-bar.scss']
})
export class ChFicheTitleComponent implements OnInit {

  @Output()
  editTitle = new EventEmitter();
  translatedTitle$: Observable<TranslatedStringToCurrentLanguage>;

  constructor(private i18nService: I18nService) {
  }

  private _ficheTitle: TranslatedString;

  @Input()
  set ficheTitle(value: TranslatedString) {
    this._ficheTitle = value;
    this.setMultiLanguageTitle();
  }

  get ficheTitle() {
    return this._ficheTitle;
  }

  ngOnInit() {
  }

  onEditTitle() {
    this.editTitle.emit();
  }

  private setMultiLanguageTitle() {
    if (!this.ficheTitle) {
      return;
    }
    this.translatedTitle$ = this.i18nService.currentLanguage$.pipe(
      map(lang => {
        return getTranslatedString(this.ficheTitle, lang);
      })
    );
  }
}
