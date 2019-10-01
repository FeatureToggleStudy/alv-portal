import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  CompetenceElement,
  getTranslatedString
} from '../../../shared/backend-services/competence-element/competence-element.types';
import { Observable } from 'rxjs';
import { I18nService } from '../../../core/i18n.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'alv-competence-element',
  templateUrl: './competence-element.component.html',
  styleUrls: ['./competence-element.component.scss']
})
export class CompetenceElementComponent implements OnInit {

  @Input() isEditable: boolean;

  @Input() showUnlinkAction: boolean;

  @Output() elementClick = new EventEmitter<CompetenceElement>();

  @Output() unlinkClick = new EventEmitter<CompetenceElement>();

  description$: Observable<string>;

  constructor(private i18nService: I18nService) {
  }

  private _competenceElement: CompetenceElement;

  get competenceElement(): CompetenceElement {
    return this._competenceElement;
  }

  @Input()
  set competenceElement(value: CompetenceElement) {
    this._competenceElement = value;
    this.setDescription();
  }

  ngOnInit() {
  }

  onElementClick() {
    if (this.isEditable) {
      this.elementClick.emit(this.competenceElement);
    }
  }

  onUnlinkClick() {
    if (this.isEditable) {
      this.unlinkClick.emit(this.competenceElement);
    }
  }

  private setDescription() {
    this.description$ = this.i18nService.currentLanguage$.pipe(
      map(lang => getTranslatedString(this.competenceElement.description, lang) || `<placeholder-${lang}>`)
    );
  }
}
